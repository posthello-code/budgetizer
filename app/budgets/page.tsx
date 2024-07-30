"use client";
import React, { useEffect, useState } from "react";
import { Controls } from "./components/controls";
import { BudgetPie } from "./components/budget-pie";
import Link from "next/link";
import axios from "axios";
import useBudget from "./[id]/swr";

export default function BudgetPage(options: any) {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [loadedOnce, setLoadedOnce] = useState<boolean>(false);
  const { data, isLoading, isError } = useBudget(options.searchParams.id);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(1000.0);
  const [expenses, setExpenses] = useState<
    [{ id: String; value: number; label: String }] | []
  >([]);
  let [isSmallScreen, setIsSmallScreen] = useState<boolean>(true);

  const onResize = () => {
    setIsSmallScreen(window.innerWidth < 1024);
  };

  useEffect(() => {
    // only load the data once to avoid race condition
    if (!loadedOnce && data && data?.data.monthlyIncome !== monthlyIncome) {
      setMonthlyIncome(data.data.monthlyIncome);
    }
    if (!loadedOnce && data && data?.data.expenses !== expenses) {
      setExpenses(data.data.expenses);
      setLoadedOnce(true);
    }

    window.addEventListener("resize", onResize);
    onResize();
  });

  if (options.searchParams.id) {
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error...</div>;
  }

  return (
    <main style={{ height: "100vh" }}>
      <div id="budget-top-buttons" className="p-1">
        {isSaving && (
          <div>
            Processing... If server was been offline, this may take up to 50
            seconds
          </div>
        )}
        <button className="btn-primary">
          <Link href="/">Back</Link>
        </button>
        <button
          className="btn-primary"
          onClick={async () => {
            const budgetData = {
              data: { monthlyIncome: monthlyIncome, expenses: expenses },
            };
            const req = axios.post(
              "https://budgetizer.onrender.com/budgets",
              budgetData,
              { headers: { "Content-Type": "application/json" } }
            );
            setIsSaving(true);
            const results = await Promise.resolve(req);
            alert(
              `To load your data in the future, enter the following ID on the home page ${results.data._id} `
            );
            setIsSaving(false);
          }}
        >
          Save
        </button>
      </div>

      <div
        id="primary-view"
        style={{
          display: "flex",
          flex: 1,
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div
          style={{
            padding: 20,
            alignContent: "center",
            justifySelf: "center",
          }}
        >
          <Controls
            isSmallScreen={isSmallScreen}
            setMonthlyIncome={setMonthlyIncome}
            expenses={expenses}
            setExpenses={setExpenses}
          ></Controls>
        </div>

        <BudgetPie
          isSmallScreen={isSmallScreen}
          data={[
            {
              id: "Remainder",
              label: "Remainder",
              value:
                expenses.length > 0
                  ? monthlyIncome -
                    expenses.map((e: any) => e.value).reduce((e, c) => e + c, 0)
                  : monthlyIncome,
            },
            ...expenses,
          ]}
        ></BudgetPie>
      </div>
    </main>
  );
}

//
