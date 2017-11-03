import knex from "knex";
import path from "path";
import fs from "fs";
import createTables from "./schema/createTables";
import createUsers from "./schema/createUsers";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "../../db.sqlite")
  }
});

async function init() {
  await createTables(db);
  await createUsers(db);
};

init();

export default db;
