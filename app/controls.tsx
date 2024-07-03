import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const Controls = (props: any) => {
  const [monthlyIncomeInput, setMonthlyIncomeInput] = useState(1000);
  const [expenseInput, setExpenseInput] = useState(0);
  const [expenseNameInput, setExpenseNameInput] = useState("unknown");

  function handleClick() {
    props.setMonthlyIncome(monthlyIncomeInput);
    props.setExpenses([
      ...props.expenses,
      { id: expenseNameInput, label: expenseNameInput, value: expenseInput },
    ]);
  }

  return (
    <div
      style={{
        height: 200,
        width: 200,
        justifyContent: "center",
        alignSelf: "center",
        justifyItems: "center",
      }}
    >
      <div id="monthly-income">
        <label style={{ width: "100%" }}>
          Monthly Income
          <br></br>
          <input
            style={{
              width: 200,
              color: "black",
              borderColor: "black",
              borderRadius: 2,
              borderWidth: 2,
              backgroundColor: "white",
            }}
            defaultValue={10000}
            name="Input"
            onChange={(event) => {
              setMonthlyIncomeInput(parseFloat(event.target.value));
            }}
          ></input>
        </label>
      </div>

      <div id="expense-name">
        <label style={{ width: "100%" }}>
          Expense Name
          <input
            style={{
              width: 200,
              color: "black",
              borderColor: "black",
              borderRadius: 2,
              borderWidth: 2,
              backgroundColor: "white",
            }}
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
          <input
            style={{
              width: 200,
              color: "black",
              borderColor: "black",
              borderRadius: 2,
              borderWidth: 2,
              backgroundColor: "white",
            }}
            name="expense-input"
            onChange={(event) => {
              setExpenseInput(parseFloat(event.target.value));
            }}
          ></input>
        </label>
      </div>

      <div id="submit-button">
        <button
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "black",
            borderColor: "grey",
            borderRadius: 2,
            borderWidth: 1,
            backgroundColor: "white",
          }}
          onClick={handleClick}
        >
          Update
        </button>
      </div>
    </div>
  );
};
