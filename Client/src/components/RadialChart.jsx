import {ResponsiveContainer, RadialBarChart, RadialBar, Cell, PolarAngleAxis} from "recharts";
import {
  Card,
  cn,
} from "@nextui-org/react";
import React from "react";

const formatTotal = (value) => {
  return value?.toLocaleString() ?? "0";
};

export const CircleChartCard = React.forwardRef(
  ({className, title, color, chartData, total, midText, ...props}, ref) => {
    return (
      <Card
      ref={ref}
      className={cn("h-[240px] border border-transparent dark:border-default-100", className)}
      {...props}
      >
      <div className="flex flex-col gap-y-2 p-4 pb-0">
        <div className="flex items-center justify-between gap-x-2">
        <dt>
          <h3 className="text-small font-medium text-default-500">{title}</h3>
        </dt>
        </div>
      </div>
      <div className="flex h-full gap-x-3">
        <ResponsiveContainer
        className="[&_.recharts-surface]:outline-none"
        height="100%"
        width="100%"
        >
        <RadialBarChart
          barSize={10}
          cx="50%"
          cy="50%"
          data={chartData}
          endAngle={-270}
          innerRadius={90}
          outerRadius={70}
          startAngle={90}
        >
          <PolarAngleAxis angleAxisId={0} domain={[0, total]} tick={false} type="number" />
          <RadialBar
          angleAxisId={0}
          animationDuration={1000}
          animationEasing="ease"
          background={{
            fill: "hsl(var(--nextui-default-100))",
          }}
          cornerRadius={12}
          dataKey="value"
          >
          {chartData.map((_, index) => (
            <Cell
            key={`cell-${index}`}
            fill={`hsl(var(--nextui-${color === "default" ? "foreground" : color}))`}
            />
          ))}
          </RadialBar>
          <g>
          <text textAnchor="middle" x="50%" y="50%">
            {midText ? (
            <tspan className="fill-foreground text-medium" x="50%">
              {midText}
            </tspan>
            ) : chartData?.[0].name ? (
            <>
              <tspan className="fill-default-500 text-tiny" dy="-0.5em" x="50%">
              {chartData[0].name}
              </tspan>
              <tspan className="fill-foreground text-medium font-semibold" dy="1.5em" x="50%">
              {formatTotal(chartData[0].toNext ? chartData[0].toNext : chartData?.[0].value)}
              </tspan>
            </>
            ) : (
            <tspan className="fill-foreground text-medium" x="50%">
              {formatTotal(chartData[0].toNext ? chartData[0].toNext : chartData?.[0].value)}
            </tspan>
            )}
          </text>
          </g>
        </RadialBarChart>
        </ResponsiveContainer>
      </div>
      </Card>
    );
  },
);

CircleChartCard.displayName = "CircleChartCard";