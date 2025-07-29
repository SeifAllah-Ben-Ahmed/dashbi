"use client";
import { ChartPieDonutText } from "@/components/charts/pie-donut-chart";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";

import RGridLayout, { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const layout = [
  { i: "a", x: 0, y: 0, w: 2, h: 2, minW: 2, minH: 2 },
  { i: "b", x: 0, y: 2, w: 3, h: 2, minW: 2, minH: 2 },
  { i: "c", x: 0, y: 3, w: 2, h: 2, minW: 2, minH: 2 },
];

export default function GridLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentLayout, setCurrentLayout] = useState(layout);

  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="bg-muted relative min-h-screen p-4 mx-auto">
      <button
        onClick={() =>
          setCurrentLayout((prev) => [
            ...prev,
            {
              i: `item-${prev.length}`,
              x: 0,
              y: 4,
              w: 6,
              h: 6,
              minW: 2,
              minH: 2,
            },
          ])
        }
      >
        add
      </button>
      <RGridLayout
        className="layout mx-auto"
        style={{
          width: 1048,
          backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'1047.9970703125'%20height%3D'46'%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'0'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'43.916544596354164'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'87.83308919270833'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'131.7496337890625'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'175.66617838541666'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'219.58272298177081'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'263.499267578125'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'307.41581217447913'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'351.3323567708333'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'395.2489013671875'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'439.16544596354163'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'483.0819905598958'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'526.99853515625'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'570.9150797526041'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'614.8316243489583'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'658.7481689453125'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'702.6647135416666'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'746.5812581380208'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'790.497802734375'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'834.4143473307291'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'878.3308919270833'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'922.2474365234375'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'966.1639811197916'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'1010.0805257161458'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3C%2Fsvg%3E")`,
        }}
        layout={currentLayout}
        margin={[5, 5]}
        cols={24}
        rowHeight={40}
        width={1048}
      >
        {currentLayout.map((item, i) => (
          <div
            key={item.i}
            data-grid={JSON.stringify(item)}
            className="overflow-hidden"
          >
            <ChartPieDonutText />
          </div>
        ))}
      </RGridLayout>
    </div>
  );
}
