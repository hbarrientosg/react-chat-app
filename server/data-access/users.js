import db from "../db";

function createUser() {
  throw Error();
}
function updateUser() {
  throw Error();
}

async function getUsersOfEmail(email) {
  return await db.select().from("users").whereNot({ email: email });
}

async function getUsers() {
  return await db.select().from("users");
}

export default {
  createUser,
  updateUser,
  getUsersOfEmail,
  getUsers
};
