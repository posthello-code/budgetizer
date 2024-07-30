import { ResponsivePie } from "@nivo/pie";
import { useEffect } from "react";

export const BudgetPie = (props: any) => {
  useEffect(() => {});
  return (
    <div className="budget" style={{ justifyContent: "center" }}>
      <ResponsivePie
        data={props.data}
        margin={
          props.isSmallScreen
            ? { top: 50, right: 50, bottom: 50, left: 50 }
            : { top: 50, right: 125, bottom: 50, left: 125 }
        }
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
        arcLinkLabelsTextColor={"#333333"}
        arcLinkLabelsThickness={2}
        arcLinkLabelsStraightLength={3}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabel="value"
        arcLabelsRadiusOffset={props.isSmallScreen ? 0.25 : 0.5}
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
