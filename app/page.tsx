"use client";

import React, { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");

  function handleClick() {
    console.log(inputText);
  }

  return (
    <main className="text-grey flex min-h-screen flex-col items-center p-24">
      <label>
        Input<br></br>
        <input
          style={{ color: "black" }}
          name="Input"
          onChange={(event) => {
            setInputText(event.target.value);
          }}
        ></input>
      </label>
      <br></br>
      <button className="border rounded-md px-5" onClick={handleClick}>
        Test!
      </button>
    </main>
  );
}
