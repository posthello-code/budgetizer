"use client";
import React, { useEffect, useState } from "react";
import { Controls } from "./components/controls";
import { BudgetPie } from "./components/budget-pie";
import Link from "next/link";
import useBudget from "./[id]/swr";
import budgetizerApi from "../services/budgetizer-api";
import { useRouter } from "next/navigation";
import { Budget } from "./models";
import SaveConfirmation from "./components/save";
import libthemis from "../services/themis-wasm";

export default function BudgetPage(options: any) {
  const router = useRouter();
  const [firstLoadFromId, setFirstLoadFromId] = useState<boolean>(false);
  const {
    data,
    isLoading,
    isError: isErrorLoadingFromId,
  } = useBudget(options.searchParams.id);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(1000.0);
  const [expenses, setExpenses] = useState<
    [{ id: String; value: number; label: String }] | []
  >([]);
  let [isSmallScreen, setIsSmallScreen] = useState<boolean>(true);
  const [tempKey, setTempKey] = useState<string>();
  const [budgetId, setBudgetId] = useState<string>();
  const [displayConfirmation, setDisplayConfirmation] =
    useState<boolean>(false);
  const [isBackendLoading, setIsBackendLoading] = useState<boolean>(false);

  const onResize = () => {
    setIsSmallScreen(window.innerWidth < 1024);
  };

  useEffect(() => {
    // only load the data once to avoid continuously asking for the key
    if (
      !firstLoadFromId &&
      data &&
      data?.data.monthlyIncome !== monthlyIncome
    ) {
      setMonthlyIncome(data.data.monthlyIncome);
    }
    if (!firstLoadFromId && data && data?.data.expenses !== expenses) {
      setExpenses(data.data.expenses);
    }
    if (data) {
      setFirstLoadFromId(true);
    }

    window.addEventListener("resize", onResize);
    onResize();
  });

  if (options.searchParams.id) {
    // the first load of an ID will always fail because we need the key
    if (isErrorLoadingFromId && !firstLoadFromId)
      return (
        <div className="save-page flex flex-1 flex-col justify-center items-center h-screen">
          <div className="m-4">
            Please re-enter your key to reload the budget
          </div>
          <div id="id-box" className="save-page-input-box">
            <label>
              Key:
              <div className="flex flex-row">
                <input
                  readOnly={false}
                  inputMode="text"
                  className="save-page-input-box w-full"
                  type="password"
                  onChange={(event) => {
                    localStorage.setItem("tempKey", event.target.value);
                  }}
                ></input>
                <button
                  className="btn-primary"
                  onClick={async () => {
                    router.push(`/`);
                  }}
                >
                  Back
                </button>
                <button
                  className="btn-primary"
                  onClick={async () => {
                    router.push(`/budgets/${options.searchParams.id}`);
                  }}
                >
                  OK
                </button>
              </div>
            </label>
          </div>
        </div>
      );
    if (isLoading) return <div>Loading...</div>;
  }

  return (
    <main style={{ height: "100vh" }}>
      {isBackendLoading && <div>Loading...</div>}
      {displayConfirmation && (
        <SaveConfirmation
          budgetId={budgetId}
          tempKey={tempKey}
          setDisplayConfirmation={setDisplayConfirmation}
          budgetData={{
            id: options.searchParams.id,
            data: { monthlyIncome: monthlyIncome, expenses: expenses },
          }}
        ></SaveConfirmation>
      )}
      <div>
        <div id="budget-top-buttons" className="p-1">
          <button className="btn-primary">
            <Link href="/">Back</Link>
          </button>
          <button
            id="save-button"
            className="btn-primary"
            onClick={async () => {
              setIsBackendLoading(true);
              const budgetData: Budget = {
                id: options.searchParams.id,
                data: { monthlyIncome: monthlyIncome, expenses: expenses },
              };
              let results;

              if (options.searchParams.id) {
                setBudgetId(options.searchParams.id);
                setTempKey(undefined);
                setDisplayConfirmation(true);
              } else {
                const key = await libthemis.generateKey();
                const base64key = Buffer.from(key).toString("base64");
                results = await budgetizerApi.createBudget(budgetData, key);
                setTempKey(base64key.toString());
                setBudgetId(results.data._id);
                setDisplayConfirmation(true);
              }
              setIsBackendLoading(false);
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
                      expenses
                        .map((e: any) => e.value)
                        .reduce((e, c) => e + c, 0)
                    : monthlyIncome,
              },
              ...expenses,
            ]}
          ></BudgetPie>
        </div>
      </div>
    </main>
  );
}

//
