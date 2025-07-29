import { ChartPieDonutText } from "@/components/chats/pie-donut-chart";
import Dashboard from "./dashboard";
import pg, { Client } from 'pg'
import { ChartPieSimple } from "@/components/chats/chart-pie-simple";
import { sqlQuery } from "@/utils/executeQueriesInBatches";

export default async function Home() {
const {Bar_top_items, pie_top_procurement, Bar_top_suppliers} = await sqlQuery()
 console.log(pie_top_procurement);

  return (
    <div className="space-y-6">
{pie_top_procurement && <ChartPieSimple data={pie_top_procurement} /> }      
<Dashboard  barTopItems={Bar_top_items} bartopsuppliers={Bar_top_suppliers} />
    </div>
  );
}
