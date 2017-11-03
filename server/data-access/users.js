import db from "../db";

function createUser() {
  throw Error();
}
function updateUser() {
  throw Error();
}

async function getUsersNotThis(id) {
  return await db.select().from("users").whereNot({ id: id });
}

async function getUsersByEmail(email) {
  return await db.select().from("users").where({ email: email });
}

async function getUsers() {
  return await db.select().from("users");
}

export default {
  createUser,
  updateUser,
  getUsersNotThis,
  getUsersByEmail,
  getUsers
};
