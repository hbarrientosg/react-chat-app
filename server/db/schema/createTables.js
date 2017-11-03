
async function createUsersTable(db) {
  await db.schema.createTable("users", table => {
    table.increments("id").primary();
    table.string("email").unique();
    table.boolean("is_online");
  });
}

async function createConversationTable(db) {
  await db.schema.createTable("conversations", table => {
    table.increments("id").primary();
    table.bigInteger("user_1").notNullable();
    table.bigInteger("user_2").notNullable();
    table.foreign("user_1").references("users.id");
    table.foreign("user_2").references("users.id");
  });
}

async function createMessagesTable(db) {
  await db.schema.createTable("messages", table => {
    table.increments("id").primary();
    table.bigInteger("conversation_id").notNullable();
    table.bigInteger("user").notNullable();
    table.timestamp("created_at");
    table.boolean("is_read");
    table.text("message");

    table.foreign("conversation_id").references("conversations.id");
    table.foreign("user").references("users.id");
  });
}

export default async function createTables(db) {
  try {
    await createUsersTable(db);
    await createConversationTable(db);
    await createMessagesTable(db);
  } catch (ex) {
    console.log(`Database is already created!`, ex);
  }
}
