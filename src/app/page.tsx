import Dashboard from "./dashboard";
import { sqlQuery } from "@/utils/executeQueriesInBatches";
import { Input } from "./searchInput";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    fournisseur: string | undefined;
    year: string | undefined;
  }>;
}) {
  const search = await searchParams;

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
  } = await sqlQuery(search.fournisseur?.trim(), search.year?.trim());
  const data = {
    year: [{ year: 2023 }, { year: 2024 }, { year: 2025 }],
    frs: [
      { raison_social: "PAF" },
      { raison_social: "CHAFRATUBE" },
      { raison_social: "SOPEM" },
      { raison_social: "ALTRAD ASIA" },
      { raison_social: "SOCIETE ELYES BOIS" },
      { raison_social: "ENTREPRISE CHAFIK LOUKIL" },
      { raison_social: "4 M K" },
      { raison_social: "ZIEGLER TUNISIE" },
      { raison_social: "ALL SEAS SHIPPING AGENCY" },
      { raison_social: "C T N" },
    ],
  };
  return (
    <div className="space-y-6">
      <Input name="fournisseur" />
      <Input name="year" />
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
