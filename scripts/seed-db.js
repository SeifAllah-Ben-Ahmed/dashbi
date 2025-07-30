import { spawn } from "child_process";
import { parse } from "pg-connection-string";

// 🧾 Accept local and remote connection strings from env or args
const localConnStr = process.env.LOCAL_DB_URL || process.argv[2];
const remoteConnStr = process.env.REMOTE_DB_URL || process.argv[3];

if (!localConnStr || !remoteConnStr) {
  console.error(
    "❌ Usage: node seed-db.js <LOCAL_CONN_STRING> <REMOTE_CONN_STRING>"
  );
  process.exit(1);
}

const local = parse(localConnStr);
const remote = parse(remoteConnStr);

// 🔐 Optional: set passwords via env
process.env.PGPASSWORD = local.password || "";
process.env.PGPASSWORD_REMOTE = remote.password || "";

// 📦 Start pg_dump process
const dump = spawn(
  "pg_dump",
  [
    "-h",
    local.host || "localhost",
    "-U",
    local.user,
    "-d",
    local.database,
    "-Fc", // custom format for piping
  ],
  { env: { ...process.env, PGPASSWORD: local.password || "" } }
);

// 📥 Pipe to pg_restore targeting remote DB
const restore = spawn(
  "pg_restore",
  [
    "-h",
    remote.host,
    "-U",
    remote.user,
    "-d",
    remote.database,
    "--no-owner",
    "--clean", // drops existing objects
  ],
  { env: { ...process.env, PGPASSWORD: remote.password || "" } }
);

// Pipe output of dump into restore
dump.stdout.pipe(restore.stdin);

// 📋 Logging
dump.stderr.on("data", (data) => process.stderr.write(`pg_dump: ${data}`));
restore.stderr.on("data", (data) =>
  process.stderr.write(`pg_restore: ${data}`)
);

dump.on("close", (code) => {
  if (code !== 0) {
    console.error(`❌ pg_dump exited with code ${code}`);
  }
});

restore.on("close", (code) => {
  if (code !== 0) {
    console.error(`❌ pg_restore exited with code ${code}`);
  } else {
    console.log("✅ Seeding completed successfully!");
  }
});
