"use client";
import React, { useState } from "react";
import "./globals.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import budgetizerApi from "./services/budgetizer-api";
import { useRecoilState } from "recoil";
import { budgetId as budgetIdState } from "./services/recoil";
export default function Home() {
  const router = useRouter();
  const [loaderInput, setLoaderInput] = useState<boolean>(false);
  const [budgetId, setBudgetId] = useRecoilState<string>(budgetIdState);

  // ping render to wake up the backend
  budgetizerApi.ping();
  return (
    <main>
      <div className="home-page">
        {!loaderInput ? (
          <HomePageButtons setLoaderInput={setLoaderInput}></HomePageButtons>
        ) : (
          <BudgetLoaderControls
            router={router}
            setBudgetId={setBudgetId}
            budgetId={budgetId}
            setLoaderInput={setLoaderInput}
          ></BudgetLoaderControls>
        )}
      </div>
    </main>
  );
}

function HomePageButtons(
  props: Readonly<{ setLoaderInput: (arg0: boolean) => void }>
) {
  return (
    <div className="home-page-buttons">
      <button className="btn-primary">
        <Link href="/budgets">New Budget</Link>
      </button>
      <button
        className="btn-primary"
        onClick={() => {
          props.setLoaderInput(true);
        }}
      >
        Load Budget
      </button>
    </div>
  );
}

function BudgetLoaderControls(props: any) {
  const { router, setLoaderInput } = props;
  const [budgetId, setBudgetId] = useRecoilState<string>(budgetIdState);

  return (
    <div className="budget-loader-controls">
      <div className="input-box">
        <label>
          Enter the budget id to load
          <br></br>
          <input
            className="input-box p-1 m-1"
            type="text"
            onChange={(event) => {
              setBudgetId(event.target.value);
            }}
          />
        </label>
      </div>
      <div id="home-key-input" className="input-box">
        <label>
          Enter your key
          <br></br>
          <input
            className="input-box p-1 m-1"
            type="text"
            onChange={(event) => {
              localStorage.setItem("tempKey", event.target.value);
            }}
          />
        </label>
      </div>
      <div className="home-page">
        <button
          className="btn-primary"
          onClick={() => {
            setLoaderInput(false);
          }}
        >
          Go Back
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            router.push(`/budgets?id=` + budgetId);
          }}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
