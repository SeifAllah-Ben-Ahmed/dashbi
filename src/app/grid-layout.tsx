"use client";
import React from "react";
import {
  ChartBarHorizontal,
  ChartBarLabelCustom,
} from "@/components/charts/bar-horizontal-chart";
import { ChartPieSimple } from "@/components/charts/chart-pie-simple";
import { DynamicTable } from "@/components/charts/dynamic-table";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import RGridLayout, { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const layout = [
  {
    w: 8,
    h: 3,
    x: 7,
    y: 0,
    i: "section-cards-1",
    minW: 1,
    minH: 2,
    moved: false,
    static: false,
  },
  {
    w: 9,
    h: 3,
    x: 15,
    y: 0,
    i: "section-cards-2",
    minW: 3,
    minH: 2,
    moved: false,
    static: false,
  },
  {
    w: 7,
    h: 3,
    x: 0,
    y: 0,
    i: "section-cards-3",
    moved: false,
    static: false,
  },
  {
    w: 8,
    h: 10,
    x: 7,
    y: 3,
    i: "bar-label-custom",
    minW: 1,
    minH: 2,
    moved: false,
    static: false,
  },
  {
    w: 7,
    h: 10,
    x: 0,
    y: 3,
    i: "pie-simple",
    minW: 1,
    minH: 2,
    moved: false,
    static: false,
  },
  {
    w: 9,
    h: 10,
    x: 15,
    y: 3,
    i: "bar-horizontal",
    minW: 1,
    minH: 2,
    moved: false,
    static: false,
  },
  {
    w: 15,
    h: 15,
    x: 0,
    y: 13,
    i: "dynamic-table",
    minW: 2,
    minH: 2,
    moved: false,
    static: false,
  },
  {
    w: 9,
    h: 3,
    x: 15,
    y: 13,
    i: "section-cards-4",
    moved: false,
    static: false,
  },
  {
    w: 9,
    h: 3,
    x: 15,
    y: 16,
    i: "section-cards-5",
    moved: false,
    static: false,
  },
];

interface GridLayoutProps {
  barTopItems: { item: string; total_spent: string }[];
  bartopsuppliers: { supplier: string; total_spent: string }[];
  pie_top_procurement: { category: string; total_spent: string }[];
  Tab_mouvement: Record<string, Date | string | number>[];
  card_full_delivery: { com: string; otd_fournisseur: string }[];
  card_on_time_delivery: { com: string; otd_fournisseur: string }[];
  card_back_order: { com: string; backorder_amnt: number }[];
  card_recieved_ninvoiced: { com: string; received_not_invoiced: number }[];
  card_total_spent: { com: string; total_spent: string }[];
}

export default function GridLayout({
  Tab_mouvement,
  barTopItems,
  bartopsuppliers,
  pie_top_procurement,
  card_full_delivery,
  card_on_time_delivery,
  card_back_order,
  card_recieved_ninvoiced,
  card_total_spent,
}: GridLayoutProps) {
  // const [currentLayout, setCurrentLayout] = useState(() => {
  //   // Try to load from localStorage
  //   if (typeof window !== "undefined") {
  //     const saved = localStorage.getItem("dashboardGridLayout");
  //     if (saved) {
  //       try {
  //         return JSON.parse(saved);
  //       } catch {
  //         // fallback to default
  //       }
  //     }
  //   }
  //   return layout;
  // });

  // // Save layout to localStorage when it changes
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem(
  //       "dashboardGridLayout",
  //       JSON.stringify(currentLayout)
  //     );
  //   }
  // }, [currentLayout]);

  return (
    <div className="bg-muted relative min-h-screen p-4 mx-auto">
      {/* <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          if (typeof window !== "undefined") {
            localStorage.setItem(
              "dashboardGridLayout",
              JSON.stringify(currentLayout)
            );
            alert("Layout saved!");
          }
        }}
      >
        Save Layout
      </button> */}
      <RGridLayout
        className="layout mx-auto"
        style={{
          // width: 1048,
          height: 2800,
          width: 1400,
          backgroundImage: `url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'1047.9970703125'%20height%3D'46'%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'0'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'43.916544596354164'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'87.83308919270833'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'131.7496337890625'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'175.66617838541666'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'219.58272298177081'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'263.499267578125'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'307.41581217447913'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'351.3323567708333'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'395.2489013671875'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'439.16544596354163'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'483.0819905598958'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'526.99853515625'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'570.9150797526041'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'614.8316243489583'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'658.7481689453125'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'702.6647135416666'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'746.5812581380208'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'790.497802734375'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'834.4143473307291'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'878.3308919270833'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'922.2474365234375'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'966.1639811197916'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3Crect%20stroke%3D'%23EEECEC'%20stroke-width%3D'1'%20fill%3D'none'%20x%3D'1010.0805257161458'%20y%3D'0'%20width%3D'37.916544596354164'%20height%3D'40'%2F%3E%3C%2Fsvg%3E")`,
        }}
        layout={layout}
        margin={[5, 5]}
        cols={24}
        rowHeight={40}
        // width={1048}
        width={1400}
        // onLayoutChange={setCurrentLayout}
      >
        {/* Replace with real props/data */}
        <Card className="overflow-hidden" key="section-cards-1">
          <CardHeader>
            <CardDescription>{card_total_spent[0].com}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card_total_spent[0].total_spent}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="overflow-hidden" key="section-cards-2">
          <CardHeader>
            <CardDescription>{card_back_order[0].com}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card_back_order[0].backorder_amnt}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="overflow-hidden" key="section-cards-3">
          <CardHeader>
            <CardDescription>{card_recieved_ninvoiced[0].com}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card_recieved_ninvoiced[0].received_not_invoiced}
            </CardTitle>
          </CardHeader>
        </Card>
        <div className="overflow-hidden" key="bar-label-custom">
          <ChartBarLabelCustom barTopItems={barTopItems} />
        </div>
        <div className="overflow-hidden bg-white" key="pie-simple">
          {pie_top_procurement && <ChartPieSimple data={pie_top_procurement} />}
        </div>
        <div className="overflow-hidden bg-white" key="bar-horizontal">
          {bartopsuppliers && (
            <ChartBarHorizontal
              bartopsuppliers={bartopsuppliers?.map((item) => ({
                supplier: item.supplier,
                total_spent: Number(item.total_spent),
              }))}
            />
          )}
        </div>
        <div className="overflow-hidden" key="dynamic-table">
          <DynamicTable data={Tab_mouvement} isGrid />
        </div>
        <Card className="overflow-hidden h-full w-full" key="section-cards-4">
          <CardHeader>
            <CardDescription>{card_full_delivery[0].com}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card_full_delivery[0].otd_fournisseur}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="overflow-hidden h-full w-full" key="section-cards-5">
          <CardHeader>
            <CardDescription>{card_on_time_delivery[0].com}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card_on_time_delivery[0].otd_fournisseur}
            </CardTitle>
          </CardHeader>
        </Card>
      </RGridLayout>
    </div>
  );
}
