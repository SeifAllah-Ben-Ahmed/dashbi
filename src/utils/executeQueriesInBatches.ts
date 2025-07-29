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



export const sqlQuery = async()=>{
  const client = new Client({
 connectionString:process.env.DATABASE_URL
})
await client.connect()
//  Cards (Ligne 1)
// Spending STATS
  const card_total_spent = await client.query(`SELECT 'Total Spent' AS com, SUM(total_spent) AS TOTAL_SPENT FROM spending_stats`)
  const card_back_order = await client.query(`SELECT 'Back Order Amount' AS com, backorder_amnt FROM spending_stats LIMIT 1`)
  const card_recieved_ninvoiced = await client.query(`SELECT 'Received not invoiced' AS com, received_not_invoiced FROM spending_stats LIMIT 1`)

// chart (Ligne 2)
  const pie_top_procurement = await client.query(`SELECT category, SUM(total_spent) AS TOTAL_SPENT FROM top_procurement_category
GROUP BY category
ORDER BY total_spent desc`)

const Bar_top_items = await client.query(`SELECT item, SUM(total_spent) AS TOTAL_SPENT FROM top_item_total_spent
GROUP BY item
ORDER BY total_spent desc
LIMIT 5`)

const Bar_top_suppliers = await client.query(`SELECT supplier, SUM(total_spent) AS TOTAL_SPENT FROM top_supplier_total_spent
GROUP BY supplier
ORDER BY total_spent desc
LIMIT 3`)

//Table
const Tab_mouvement = await client.query(`select 
	date_imputation,
	categorie,
	article,
	designation, 
	Tiers,
	CASE WHEN quantite_active > 0 AND operateur_creation != 'AHLEM' then
		(quantite_us * prix_ordre) 
	else 0 END AS Prix_Total,
	montant_ordre
from mouvement
where tiers IS NOT NULL`)




  return {
  pie_top_procurement:pie_top_procurement.rows, 
  Bar_top_items:Bar_top_items.rows, 
  Bar_top_suppliers:Bar_top_suppliers.rows,
  card_total_spent:card_total_spent.rows,
  card_back_order:card_back_order.rows,
  card_recieved_ninvoiced:card_recieved_ninvoiced.rows,
  Tab_mouvement:Tab_mouvement.rows

  }
   
} 