export default async function createUsers(db) {
  await db.insert(
    [{ email: "alice@x.com", is_online: false },
     { email: "bob@x.com", is_online: false },
     { email: "carl@x.com", is_online: false }]).into("users");
}
