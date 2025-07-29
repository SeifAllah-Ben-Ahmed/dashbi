// scripts/seed.ts
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";
import { Client } from "pg";

// PostgreSQL client config
const client = new Client({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:password@localhost:5432/mydatabase",
});

interface RowData {
  id: number;
  name: string;
  age: number;
}

async function seed() {
  await client.connect();

  const dataDir = path.join(process.cwd(), "data");
  const files = fs
    .readdirSync(dataDir)
    .filter((file) => file.endsWith(".xlsx"));

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows: RowData[] = XLSX.utils.sheet_to_json<RowData>(sheet);

    console.log(`📄 Seeding ${file} with ${rows.length} rows...`);

    for (const row of rows) {
      try {
        await client.query(
          "INSERT INTO users (id, name, age) VALUES ($1, $2, $3)",
          [row.id, row.name, row.age]
        );
      } catch (error) {
        console.error(`❌ Failed to insert row: ${JSON.stringify(row)}`, error);
      }
    }
  }

  await client.end();
  console.log("✅ Seeding completed.");
}

seed().catch((err) => {
  console.error("❌ Error seeding database:", err);
  client.end();
});
