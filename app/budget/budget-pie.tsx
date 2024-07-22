import { ResponsivePie } from "@nivo/pie";
import { useEffect } from "react";

export const BudgetPie = (props: any) => {
  useEffect(() => {});
  return (
    <div
      id="chart"
      style={{
        display: "grid",
        gridAutoColumns: "minmax(0, 1fr)",
        height: props.isSmallScreen ? "20rem" : "40rem",
        paddingBottom: 50,
      }}
    >
      <ResponsivePie
        data={props.data}
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
        colors={{ scheme: "paired" }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsOffset={props.isSmallScreen ? -30 : 0}
        arcLinkLabelsTextOffset={props.isSmallScreen ? -30 : 0}
        arcLinkLabelsStraightLength={5}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabel="value"
        arcLinkLabel="label"
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
      />
    </div>
  );
};
