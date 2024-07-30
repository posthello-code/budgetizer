import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const Controls = (props: any) => {
  const [monthlyIncomeInput, setMonthlyIncomeInput] = useState(1000);
  const [expenseInput, setExpenseInput] = useState(100);
  const [expenseNameInput, setExpenseNameInput] = useState("unknown");

  function updateMonthlyIncome() {
    props.setMonthlyIncome(monthlyIncomeInput);
  }

  function updateExpenses() {
    // add a truncated UUID when names are duplicate
    if (
      new Set(props.expenses.map((e: any) => e.label)).has(expenseNameInput)
    ) {
      props.setExpenses([
        ...props.expenses,
        {
          id: `${expenseNameInput} (id: ${uuidv4().slice(0, 5)})`,
          label: `${expenseNameInput} (id: ${uuidv4().slice(0, 5)})`,
          value: expenseInput,
        },
      ]);
    } else {
      props.setExpenses([
        ...props.expenses,
        {
          id: `${expenseNameInput} `,
          label: `${expenseNameInput}`,
          value: expenseInput,
        },
      ]);
    }
  }

  useEffect(() => {});

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: props.isSmallScreen ? "center" : "left",
      }}
    >
      <div id="monthly-income">
        <label>
          Monthly Income
          <br></br>
          <input
            className="input-box"
            defaultValue={1000}
            name="Input"
            onChange={(event) => {
              setMonthlyIncomeInput(parseFloat(event.target.value));
            }}
          ></input>
        </label>
      </div>
      <div id="submit-income-button">
        <button
          className="btn-primary"
          style={{
            marginTop: "20px",
            marginBottom: "20px",
          }}
          onClick={updateMonthlyIncome}
        >
          Set Income
        </button>
      </div>
      <div id="expense-name">
        <label style={{ width: "100%" }}>
          Expense Name
          <br></br>
          <input
            className="input-box"
            name="Expense Name"
            onChange={(event) => {
              setExpenseNameInput(event.target.value);
            }}
          ></input>
        </label>
      </div>
      <div id="expense">
        <label style={{ width: "100%" }}>
          Expense
          <br></br>
          <input
            className="input-box"
            defaultValue={100}
            name="expense-input"
            onChange={(event) => {
              setExpenseInput(parseFloat(event.target.value));
            }}
          ></input>
        </label>
      </div>
      <div id="submit-expense-button">
        <button
          className="btn-primary"
          style={{
            marginTop: "20px",
          }}
          onClick={updateExpenses}
        >
          Add
        </button>
      </div>
    </div>
  );
};
