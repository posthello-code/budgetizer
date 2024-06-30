"use client";

import React from "react";
import { Controls } from "./controls";
import { BudgetPie } from "./budget-pie";

export default function Home() {
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
        <Controls></Controls>
        <BudgetPie></BudgetPie>
      </div>
    </main>
  );
}

//
