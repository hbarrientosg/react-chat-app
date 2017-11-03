import db from "../db";

function createUser() {
  throw Error();
}
function updateUser() {
  throw Error();
}

async function getUsersOfId(id) {
  return await db.select().from("users").whereNot({ id: id });
}

async function getUsers() {
  return await db.select().from("users");
}

export default {
  createUser,
  updateUser,
  getUsersOfId,
  getUsers
};
