"use client";
import { BarChart3, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartPieDonutText } from "@/components/charts/pie-donut-chart";
import {
  ChartBarHorizontal,
  ChartBarLabelCustom,
} from "@/components/charts/bar-horizontal-chart";
import { ChartLineLinear } from "@/components/charts/chart-line-linear";
import ScatterCharts from "@/components/charts/scatter-chart";
import { ChartRadialStacked } from "@/components/charts/chart-radial-stacked";
import { ChartBarMultiple } from "@/components/charts/chart-bar-multiple";
import { ChartBar } from "@/components/charts/chart-bar";
import { SectionCards } from "@/components/section-cards";
import { ChartPieSimple } from "@/components/charts/chart-pie-simple";
import { DynamicTable } from "@/components/charts/dynamic-table";
import { ChartAreaInteractive } from "@/components/charts/chart-area-interactive";
import { SelectFilter } from "./searchInput";

interface DashProps {
  barTopItems: { item: string; total_spent: string }[];
  bartopsuppliers: { supplier: string; total_spent: string }[];
  pie_top_procurement: { category: string; total_spent: string }[];
  Tab_mouvement: Record<string, Date | string | number>[];
  card_full_delivery: { com: string; otd_fournisseur: string }[];
  card_on_time_delivery: { com: string; otd_fournisseur: string }[];
  card_back_order: { com: string; backorder_amnt: number }[];
  card_recieved_ninvoiced: { com: string; received_not_invoiced: number }[];
  card_total_spent: { com: string; total_spent: string }[];
  area_prix_budget: {
    month_start: Date;
    prix_total: string;
    prix_budget: string;
  }[];
  card_Return_total: { com: string; returned_amnt: string }[];
  card_Returned_Amount: { com: string; returned_amnt: string }[];

  card_Returned_Qty: { com: string; returned_qty: string }[];
}
const Dashboard = ({
  barTopItems,
  bartopsuppliers,
  pie_top_procurement,
  Tab_mouvement,
  card_back_order,
  card_full_delivery,
  card_on_time_delivery,
  card_recieved_ninvoiced,
  card_total_spent,
  card_Return_total,
  card_Returned_Amount,
  card_Returned_Qty,
  area_prix_budget,
}: DashProps) => {
  const data = {
    year: ["2023", "2024", "2025"],
    frs: [
      "PAF",
      "CHAFRATUBE",
      "SOPEM",
      "ALTRAD ASIA",
      "SOCIETE ELYES BOIS",
      "ENTREPRISE CHAFIK LOUKIL",
      "4 M K",
      "ZIEGLER TUNISIE",
      "ALL SEAS SHIPPING AGENCY",
      "C T N",
    ],
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Purchasing overview
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back! Here&apos;s what&apos;s happening today.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6">
            <TabsList className="h-auto p-0 bg-transparent space-x-8">
              <TabsTrigger
                value="overview"
                className="py-4 px-1 border-b-2 border-transparent font-medium text-sm flex items-center space-x-2 transition-colors data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=inactive]:text-gray-500 hover:text-gray-700 bg-transparent shadow-none"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="py-4 px-1 border-b-2 border-transparent font-medium text-sm flex items-center space-x-2 transition-colors data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=inactive]:text-gray-500 hover:text-gray-700 bg-transparent shadow-none"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Main Content */}
        <main className="px-6">
          <TabsContent value="overview">
            <div className="flex items-center gap-2.5 mb-6 bg-white p-4 rounded-md shadow-sm sticky top-0 z-10">
              <SelectFilter name="fournisseur" data={data.frs} />
              <SelectFilter name="year" data={data.year} />
            </div>
            <div className="grid items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              <SectionCards
                title="SPENDING STATS"
                data={{
                  card_total_spent,
                  card_back_order,
                  card_recieved_ninvoiced,
                }}
              />
              <SectionCards
                title="DELIVERY PERFORMANCE"
                data={{
                  card_full_delivery,
                  card_on_time_delivery,
                }}
              />
              <SectionCards
                title="Quality"
                data={{
                  card_Return_total,
                  card_Returned_Amount,
                  card_Returned_Qty,
                }}
              />
              <ChartBarLabelCustom barTopItems={barTopItems} />
              {pie_top_procurement && (
                <ChartPieSimple data={pie_top_procurement} />
              )}
              {bartopsuppliers && (
                <ChartBarHorizontal
                  bartopsuppliers={bartopsuppliers?.map((item) => ({
                    supplier: item.supplier,
                    total_spent: Number(item.total_spent),
                  }))}
                />
              )}
              <div className="col-span-full">
                <ChartAreaInteractive area_prix_budget={area_prix_budget} />
              </div>

              <div className="col-span-full">
                <DynamicTable data={Tab_mouvement} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <div className="grid items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              <ChartPieDonutText />
              <ChartLineLinear />
              <ChartRadialStacked />
              <ChartBarMultiple />
              <ChartBar />
              <ScatterCharts />
            </div>
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
};

export default Dashboard;
