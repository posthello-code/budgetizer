"use client";

import React from "react";
import "./globals.css";
import Link from "next/link";
import Budget from "./budget/page";
export default function Home() {
  return (
    <main>
      <Budget></Budget>
      {
        // TODO: uncomment once data loading can be done using budget name and passphrase
        /* <div
        style={{
          height: "100vh",
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button className="btn-primary">
          <Link href="/budget">New Budget</Link>
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            alert("placeholder event - TODO: add a passphrase input heres");
          }}
        >
          Load Budget
        </button>
      </div> */
      }
    </main>
  );
}

//
