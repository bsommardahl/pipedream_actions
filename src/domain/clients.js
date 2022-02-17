const tables = {
  clients: "clients",
};

function removeEmpty(obj) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}

function cleanClientObj(obj) {
  const res = {
    name: obj.clientName,
    contactFirstName: obj.contactFirstName,
    contactLastName: obj.contactLastName,
    contactEmail: obj.contactEmail,
  };

  return removeEmpty(res);
}

async function updateClient(knex, id, obj) {
  const res = await knex(table_name)
    .where("id", "=", id)
    .update(cleanClientObj(obj))
    .returning("*");

  return res[0];
}

async function insertClient(knex, newClient) {
  const res = await knex(tables.clients)
    .insert(cleanClientObj(newClient))
    .returning("*");
  return res[0];
}

async function getClient(knex, clientId) {
  const clients = await knex(tables.clients)
    .where({ id: clientId })
    .select("*");

  return clients.length > 0 ? clients[0] : {};
}

async function findClient(knex, clientName, createIfNotExist) {
  const searchClient = { name: clientName };
  let clients = await knex(tables.clients).where(searchClient).select("*");

  if (createIfNotExist & (clients.length === 0)) {
    clients = await insertClient(knex, searchClient);
  }

  return clients.length > 0 ? clients[0] : {};
}

module.exports = {
  insertClient,
  updateClient,
  getClient,
  findClient,
};
