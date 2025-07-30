import { Client, PoolClient } from "pg";

interface QueryResult {
  query: string;
  success: boolean;
  error?: any;
  result?: any;
}

interface ExecuteRawSqlOptions {
  batchSize?: number;
}

/**
 * Executes raw SQL queries in batches and returns results/errors for each query.
 * @param client pg client instance
 * @param queries array of raw SQL query strings
 * @param options batchSize controls concurrency, default 50
 */
export async function executeRawSqlQueries(
  client: PoolClient,
  queries: string[],
  options: ExecuteRawSqlOptions = {}
): Promise<QueryResult[]> {
  const batchSize = options.batchSize ?? 50;
  const results: QueryResult[] = [];

  for (let i = 0; i < queries.length; i += batchSize) {
    const batch = queries.slice(i, i + batchSize);

    // Run all queries in the batch concurrently and wait for all to settle
    const settled = await Promise.allSettled(
      batch.map((query) => client.query(query))
    );

    settled.forEach((res, idx) => {
      if (res.status === "fulfilled") {
        results.push({
          query: batch[idx],
          success: true,
          result: res.value,
        });
      } else {
        results.push({
          query: batch[idx],
          success: false,
          error: res.reason,
        });
      }
    });
  }

  return results;
}

let data;
export const sqlQuery = async (fournisseur?:string, year?:string) => {
  if (data) return data;
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();

  //FILTRE
  //Fournisseur
   const filtre_fournisseur = fournisseur?`AND f.raison_social = '${fournisseur}'`:''

  //Fiscal Year
   const filtre_fiscal_year = year?`AND fiscal_year = 'FY ${year}'`:''
  
  
  //Year
  const filtre_year = year?`AND year = ${year}`:''


  console.log( `SELECT 'Total Spent' AS com, SUM(total_spent) AS TOTAL_SPENT  FROM spending_stats  WHERE (1=1) ${filtre_year} ${filtre_fiscal_year}`);
  //PAGE1
  //  Cards (Ligne 1)
  // Spending STATS
  const card_total_spent = await client.query(
    `SELECT 'Total Spent' AS com, SUM(total_spent) AS TOTAL_SPENT  FROM spending_stats  WHERE 1 = 1 ${filtre_year} ${filtre_fiscal_year}`
  );
  const card_back_order = await client.query(
    `SELECT 'Back Order Amount' AS com, backorder_amnt FROM spending_stats WHERE 1 = 1 ${filtre_fiscal_year} LIMIT 1 `
  );
  const card_recieved_ninvoiced = await client.query(
    `SELECT 'Received not invoiced' AS com, received_not_invoiced FROM spending_stats LIMIT 1`
  );

// DELIVERY PERFORMANCE
  const card_full_delivery = await client.query(`select 'Full Delivery' AS com, ROUND((Sum(otif)/count(*)) *100,2) ||'%' AS OTD_Fournisseur from delivery_performance WHERE (1=1) ${filtre_year} ${filtre_fiscal_year}`)
  const card_on_time_delivery = await client.query(`select 'On-Time Delivery' AS com, ROUND((Sum(otd_fournisseur)/count(*)) *100,2) ||'%' AS OTD_Fournisseur from delivery_performance WHERE (1=1) ${filtre_year} ${filtre_fiscal_year}`)
  
//Quality
  const card_Returned_Qty = await client.query(`select 'Returned Qty' AS com, sum(returned_qty)/count(*) AS Returned_qty from quality WHERE (1=1) ${filtre_year} ${filtre_fiscal_year} `)
  const card_Returned_Amount = await client.query(`select 'Returned Amount' AS com, sum(retourned_amnt)/count(*) AS Retourned_amnt from quality WHERE (1=1) ${filtre_year} ${filtre_fiscal_year} `)
  const card_Return_total = await client.query(`select 'Return % of Total' AS com, sum(retourned_amnt)/sum(returned_qty) ||'%' AS Retourned_amnt from quality WHERE (1=1) ${filtre_year} ${filtre_fiscal_year}`)
  
  

  // chart (Ligne 2)
  const pie_top_procurement =
    await client.query(`SELECT category, SUM(total_spent) AS TOTAL_SPENT FROM top_procurement_category
      WHERE (1=1) ${filtre_year} ${filtre_fiscal_year}
GROUP BY category
ORDER BY total_spent desc`);

  const Bar_top_items =
    await client.query(`SELECT item, SUM(total_spent) AS TOTAL_SPENT FROM top_item_total_spent
      WHERE (1=1) ${filtre_year} ${filtre_fiscal_year}
GROUP BY item
ORDER BY total_spent desc
LIMIT 5`);

  const Bar_top_suppliers =
    await client.query(`SELECT supplier, SUM(total_spent) AS TOTAL_SPENT FROM top_supplier_total_spent
      WHERE (1=1) ${filtre_year} ${filtre_fiscal_year}
GROUP BY supplier
ORDER BY total_spent desc
LIMIT 3`);

//Ligne 3
//Table

const Tab_mouvement = await client.query(`select 
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
WHERE (tiers IS NOT NULL) ${filtre_fournisseur}`)

//PAGE2

  const flt_year =
    await client.query(`select distinct(year) from top_supplier_total_spent`);

  const flt_frs =
    await client.query(`select raison_social from fournisseur LIMIT 10`);
console.log({flt_year:flt_year.rows,
flt_frs:flt_frs.rows});
  const res = {
  pie_top_procurement:pie_top_procurement.rows, 
  Bar_top_items:Bar_top_items.rows, 
  Bar_top_suppliers:Bar_top_suppliers.rows,
  card_total_spent:card_total_spent.rows,
  card_back_order:card_back_order.rows,
  card_recieved_ninvoiced:card_recieved_ninvoiced.rows,
  Tab_mouvement:Tab_mouvement.rows,
  card_on_time_delivery:card_on_time_delivery.rows,
  card_full_delivery:card_full_delivery.rows,
  card_Returned_Qty:card_Returned_Qty.rows,
  card_Returned_Amount:card_Returned_Amount.rows,
  card_Return_total:card_Return_total.rows
  }
   client.end();
   return res;
} 