"use client";

import React from "react";
import "./globals.css";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: "50%",
          top: "50%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button className="btn-primary">
          <Link href="/budget">Start</Link>
        </button>
      </div>
    </main>
  );
}

//
