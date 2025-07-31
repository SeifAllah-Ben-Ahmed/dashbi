import { Pool } from "pg";

// -----------------------------------------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // optional: max number of clients in the pool
});
// -----------------------------------------------

const cache = new Map<string, any>();

export const sqlQuery = async (
  fournisseur?: string,
  year?: number | string
) => {
  const cacheKey = JSON.stringify({ fournisseur, year });
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  //FILTRE
  //Fournisseur
  const filtre_fournisseur = fournisseur
    ? `AND f.raison_social = '${fournisseur}'`
    : "";

  //Fiscal Year
  const filtre_fiscal_year = year ? `AND fiscal_year = 'FY ${year}'` : "";

  //Year
  const filtre_year = year ? `AND year = ${year}` : "";

  //PAGE1
  //  Cards (Ligne 1)
  // Spending STATS
  const card_total_spent = pool.query(
    `SELECT 'Total Spent' AS com, SUM(total_spent) AS TOTAL_SPENT  FROM spending_stats  WHERE 1 = 1 ${filtre_year} ${filtre_fiscal_year}`
  );
  const card_back_order = pool.query(
    `SELECT 'Back Order Amount' AS com, backorder_amnt FROM spending_stats WHERE 1 = 1 ${filtre_fiscal_year} LIMIT 1 `
  );
  const card_recieved_ninvoiced = pool.query(
    `SELECT 'Received not invoiced' AS com, received_not_invoiced FROM spending_stats LIMIT 1`
  );

  // DELIVERY PERFORMANCE
  const card_full_delivery = pool.query(
    `select 'Full Delivery' AS com, ROUND((Sum(otif)/count(*)) *100,2) ||'%' AS OTD_Fournisseur from delivery_performance WHERE (1=1) ${filtre_year} ${filtre_fiscal_year}`
  );
  const card_on_time_delivery = pool.query(
    `select 'On-Time Delivery' AS com, ROUND((Sum(otd_fournisseur)/count(*)) *100,2) ||'%' AS OTD_Fournisseur from delivery_performance WHERE (1=1) ${filtre_year} ${filtre_fiscal_year}`
  );

  //Quality
  const card_Returned_Qty = pool.query(
    `select 'Returned Qty' AS com, sum(returned_qty)/count(*) AS Returned_qty from quality WHERE (1=1) ${filtre_year} ${filtre_fiscal_year} `
  );
  const card_Returned_Amount = pool.query(
    `select 'Returned Amount' AS com, sum(retourned_amnt)/count(*) AS Retourned_amnt from quality WHERE (1=1) ${filtre_year} ${filtre_fiscal_year} `
  );
  const card_Return_total = pool.query(
    `select 'Return % of Total' AS com, sum(retourned_amnt)/sum(returned_qty) ||'%' AS Retourned_amnt from quality WHERE (1=1) ${filtre_year} ${filtre_fiscal_year}`
  );

  // chart (Ligne 2)
  const pie_top_procurement =
    pool.query(`SELECT category, SUM(total_spent) AS TOTAL_SPENT FROM top_procurement_category
      WHERE (1=1) ${filtre_year} ${filtre_fiscal_year}
GROUP BY category
ORDER BY total_spent desc`);

  const Bar_top_items =
    pool.query(`SELECT item, SUM(total_spent) AS TOTAL_SPENT FROM top_item_total_spent
      WHERE (1=1) ${filtre_year} ${filtre_fiscal_year}
GROUP BY item
ORDER BY total_spent desc
LIMIT 5`);

  const Bar_top_suppliers =
    pool.query(`SELECT supplier, SUM(total_spent) AS TOTAL_SPENT FROM top_supplier_total_spent
      WHERE (1=1) ${filtre_year} ${filtre_fiscal_year}
GROUP BY supplier
ORDER BY total_spent desc
LIMIT 3`);

  //Ligne 3
  //Table
  const Tab_mouvement = pool.query(`select 
	date_imputation,
	categorie,
	article,
	designation, 
	f.raison_social,
	CASE WHEN quantite_active > 0 AND operateur_creation != 'AHLEM' then
		(quantite_us * prix_ordre) 
	else 0 END AS Prix_Total,
	montant_ordre
from mouvement m
JOIN fournisseur f ON f.Id_Fournisseur = m.Tiers
WHERE (tiers IS NOT NULL) ${filtre_fournisseur}`);

  //Prix budget vs prix unitaire
  const area_prix_budget = pool.query(`SELECT 
    DATE_TRUNC('month', m.date_imputation) AS month_start,
    SUM(
        CASE 
            WHEN m.quantite_active > 0 AND m.operateur_creation != 'AHLEM' 
            THEN m.quantite_us * m.prix_ordre
            ELSE 0 
        END
    ) AS Prix_Total,
    SUM(
        CASE 
            WHEN m.quantite_active > 0 AND m.operateur_creation != 'AHLEM' 
            THEN m.quantite_us * b.prix_calcule
            ELSE 0 
        END
    ) AS Prix_budget
FROM mouvement m
JOIN fournisseur f ON f.Id_Fournisseur = m.Tiers
JOIN budget_article b ON b.id_article = m.article
WHERE m.tiers IS NOT NULL
GROUP BY DATE_TRUNC('month', m.date_imputation) `);

  const [
    Response_pie_top_procurement,
    Response_Bar_top_items,
    Response_Bar_top_suppliers,
    Response_card_total_spent,
    Response_card_back_order,
    Response_card_recieved_ninvoiced,
    Response_Tab_mouvement,
    Response_card_on_time_delivery,
    Response_card_full_delivery,
    Response_card_Returned_Qty,
    Response_card_Returned_Amount,
    Response_card_Return_total,
    Response_area_prix_budget,
  ] = await Promise.all([
    pie_top_procurement,
    Bar_top_items,
    Bar_top_suppliers,
    card_total_spent,
    card_back_order,
    card_recieved_ninvoiced,
    Tab_mouvement,
    card_on_time_delivery,
    card_full_delivery,
    card_Returned_Qty,
    card_Returned_Amount,
    card_Return_total,
    area_prix_budget,
  ]);

  const res = {
    pie_top_procurement: Response_pie_top_procurement.rows,
    Bar_top_items: Response_Bar_top_items.rows,
    Bar_top_suppliers: Response_Bar_top_suppliers.rows,
    card_total_spent: Response_card_total_spent.rows,
    card_back_order: Response_card_back_order.rows,
    card_recieved_ninvoiced: Response_card_recieved_ninvoiced.rows,
    Tab_mouvement: Response_Tab_mouvement.rows,
    card_on_time_delivery: Response_card_on_time_delivery.rows,
    card_full_delivery: Response_card_full_delivery.rows,
    card_Returned_Qty: Response_card_Returned_Qty.rows,
    card_Returned_Amount: Response_card_Returned_Amount.rows,
    card_Return_total: Response_card_Return_total.rows,
    area_prix_budget: Response_area_prix_budget.rows,
  };

  cache.set(cacheKey, res);

  return res;
};
