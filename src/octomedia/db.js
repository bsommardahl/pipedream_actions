async function init(auth) {
  const pg = require("pg");
  const knex = await require("knex")({
    client: "postgres",
    connection: auth,
  });
  return knex;
}

async function work(auth) {
  const db = await init(auth);
  return async (fun) => {
    const res = await fun(db);
    await db.destroy();
    return res;
  };
}

module.exports = { work };
