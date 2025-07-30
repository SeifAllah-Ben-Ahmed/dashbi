import { ChartPieDonutText } from "@/components/charts/pie-donut-chart";
import Dashboard from "./dashboard";
import pg, { Client } from "pg";
import { ChartPieSimple } from "@/components/charts/chart-pie-simple";
import { sqlQuery } from "@/utils/executeQueriesInBatches";

export default async function Home() {
  const {
    Bar_top_items,
    pie_top_procurement,
    Bar_top_suppliers,
    Tab_mouvement,
    card_back_order,
    card_full_delivery,
    card_on_time_delivery,
    card_recieved_ninvoiced,
    card_total_spent,
  } = await sqlQuery();

  return (
    <div className="space-y-6">
      <Dashboard
        barTopItems={Bar_top_items}
        bartopsuppliers={Bar_top_suppliers}
        pie_top_procurement={pie_top_procurement}
        Tab_mouvement={Tab_mouvement}
        card_back_order={card_back_order}
        card_full_delivery={card_full_delivery}
        card_on_time_delivery={card_on_time_delivery}
        card_recieved_ninvoiced={card_recieved_ninvoiced}
        card_total_spent={card_total_spent}
      />
    </div>
  );
}
