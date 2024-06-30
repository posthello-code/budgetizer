import { useState } from "react";

export const Controls = () => {
  const [inputText, setInputText] = useState("");
  function handleClick() {
    console.log(inputText);
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
      <div>
        <label style={{ width: "100%" }}>
          Input<br></br>
          <input
            style={{
              width: 200,
              color: "black",
              borderColor: "black",
              borderRadius: 2,
              borderWidth: 2,
              backgroundColor: "white",
            }}
            name="Input"
            onChange={(event) => {
              setInputText(event.target.value);
            }}
          ></input>
        </label>
      </div>
      <div>
        <br></br>
        <button
          style={{
            textAlign: "center",
            color: "black",
            borderColor: "grey",
            borderRadius: 2,
            borderWidth: 1,
            backgroundColor: "white",
          }}
          onClick={handleClick}
        >
          Test!
        </button>
      </div>
    </div>
  );
};
