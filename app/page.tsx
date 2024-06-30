"use client";

import React, { useState } from "react";

// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsivePie = ({ data /* see data tab */ }: any) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
      from: "color",
      modifiers: [["darker", 2]],
    }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "ruby",
        },
        id: "dots",
      },
      {
        match: {
          id: "c",
        },
        id: "dots",
      },
      {
        match: {
          id: "go",
        },
        id: "dots",
      },
      {
        match: {
          id: "python",
        },
        id: "dots",
      },
      {
        match: {
          id: "scala",
        },
        id: "lines",
      },
      {
        match: {
          id: "lisp",
        },
        id: "lines",
      },
      {
        match: {
          id: "elixir",
        },
        id: "lines",
      },
      {
        match: {
          id: "javascript",
        },
        id: "lines",
      },
    ]}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 56,
        itemsSpacing: 0,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      },
    ]}
  />
);

const data = [
  {
    id: "javascript",
    label: "javascript",
    value: 199,
    color: "hsl(182, 70%, 50%)",
  },
  {
    id: "erlang",
    label: "erlang",
    value: 285,
    color: "hsl(141, 70%, 50%)",
  },
  {
    id: "c",
    label: "c",
    value: 139,
    color: "hsl(253, 70%, 50%)",
  },
  {
    id: "elixir",
    label: "elixir",
    value: 45,
    color: "hsl(108, 70%, 50%)",
  },
  {
    id: "php",
    label: "php",
    value: 252,
    color: "hsl(169, 70%, 50%)",
  },
];

const Controls = () => {
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

export default function Home() {
  return (
    <main>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <br></br>
        <Controls></Controls>
        <div id="chart" style={{ height: 500 }}>
          <MyResponsivePie data={data}></MyResponsivePie>
        </div>
      </div>
    </main>
  );
}

//
