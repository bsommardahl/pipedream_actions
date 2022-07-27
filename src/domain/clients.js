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
  const attributePrefix = "attribute_";
  const attributes = {};
  Object.keys(obj)
    .filter((x) => x.indexOf(attributePrefix) > -1)
    .forEach((key) => {
      const newKey = key.replace(attributePrefix, "");
      attributes[newKey] = obj[key];
    });

  const res = {
    name: obj.name,
    contactFirstName: obj.contactFirstName,
    contactLastName: obj.contactLastName,
    contactEmail: obj.contactEmail,
    attributes,
  };

  return removeEmpty(res);
}

async function updateClient(knex, id, obj) {
  const res = await knex(tables.clients)
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

async function findClient(knex, fieldKey, fieldValue, createIfNotExist) {
  const searchClient = { [fieldKey]: fieldValue };
  let clients = await knex(tables.clients).where(searchClient).select("*");

  if (createIfNotExist & (clients.length === 0)) {
    clients = [await insertClient(knex, searchClient)];
  }

  return clients.length > 0 ? clients[0] : {};
}

module.exports = {
  insertClient,
  updateClient,
  getClient,
  findClient,
};
