import knex from "knex";
import path from "path";
import fs from "fs";
import createTables from "./schema/createTables";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "../../db.sqlite")
  }
});

async function init() {
  await createTables(db);
  await db.insert(
    [{ email: "alice@x.com", is_online: false },
     { email: "bob@x.com", is_online: false },
     { email: "carl@x.com", is_online: false }]).into("users");
};

init();

export default db;
