async function init(auth) {
  const pg = require("pg");
  const knex = await require("knex")({
    client: "postgres",
    connection: auth,
  });
  return knex;
}

async function work(auth, fun) {
  const db = await init(auth);
  const res = await fun(db);
  await db.destroy();
  return res;
}

module.exports = { work };
