"use client";

import React, { useEffect, useState } from "react";
import { Controls } from "./controls";
import { BudgetPie } from "./budget-pie";

export default function Home() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(1000.0);
  const [expenses, setExpenses] = useState<
    [{ id: String; value: number; label: String }] | []
  >([]);

  useEffect(() => {
    console.log(expenses);
    console.log("Remainder " + monthlyIncome);
  });
  return (
    <main>
      <div
        id="primary-view"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <br></br>
        <Controls
          setMonthlyIncome={setMonthlyIncome}
          expenses={expenses}
          setExpenses={setExpenses}
        ></Controls>
        <br></br>
        <br></br>
        <BudgetPie
          data={[
            ...expenses,
            {
              id: "Remainder",
              label: "Remainder",
              value:
                expenses.length > 0
                  ? monthlyIncome -
                    expenses.map((e: any) => e.value).reduce((e, c) => e + c)
                  : monthlyIncome,
            },
          ]}
        ></BudgetPie>
        <div style={{ marginTop: "20px", alignSelf: "center" }}>
          Expense List:{" "}
          {expenses.map((e: any) => (
            <div id={e.id} key={e.id}>{`${e.id} ${e.value}`}</div>
          ))}
        </div>
      </div>
    </main>
  );
}

//
