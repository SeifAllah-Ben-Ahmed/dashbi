import Dashboard from "./dashboard";
import { sqlQuery } from "@/utils/executeQueriesInBatches";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    fournisseur: string | undefined;
    year: string | undefined;
  }>;
}) {
  const search = await searchParams;
  const fournisseur = (search.fournisseur ?? "").trim();

  const year = (search.year ?? "").trim();
  const yearNumber = year ? Number(year) : "";

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
    area_prix_budget,
    card_Return_total,
    card_Returned_Amount,
    card_Returned_Qty,
  } = await sqlQuery(fournisseur, yearNumber);

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
        area_prix_budget={area_prix_budget}
        card_Return_total={card_Return_total}
        card_Returned_Amount={card_Returned_Amount}
        card_Returned_Qty={card_Returned_Qty}
      />
    </div>
  );
}
