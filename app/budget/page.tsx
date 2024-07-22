"use client";

import React, { useEffect, useState } from "react";
import { Controls } from "./controls";
import { BudgetPie } from "./budget-pie";
import Link from "next/link";

export default function Home() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(1000.0);
  const [expenses, setExpenses] = useState<
    [{ id: String; value: number; label: String }] | []
  >([]);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(true);

  const onResize = () => {
    setIsSmallScreen(window.innerWidth < 1080);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
  });

  return (
    <main style={{ height: "100vh" }}>
      {
        // TODO: uncomment once data loading can be done using budget name and passphrase
        /* <button className="p-1">
        <Link href="/">Back</Link>
      </button> */
      }
      <div
        id="primary-view"
        style={{
          display: "flex",
          flex: 1,
          flexDirection: isSmallScreen ? "column" : "row",
          paddingLeft: 50,
          paddingRight: 50,
          height: "100%",
        }}
      >
        <div
          style={{
            flex: 0.25,
            marginTop: isSmallScreen ? 50 : 0,
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

        <div style={{ flex: 0.75, alignContent: "center" }}>
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
