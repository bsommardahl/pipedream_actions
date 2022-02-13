const table_name = "clients";

module.exports = {
  name: "Upsert Client",
  description: "Upserts an OctoMedia client to the database.",
  key: "upsert_client",
  version: "0.0.11",
  type: "action",
  props: {
    postgresql: {
      type: "app",
      app: "postgresql",
    },
    clientName: {
      type: "string",
      label: "Client Name",
      optional: false,
    },
    contactFirstName: {
      type: "string",
      label: "Contact First Name",
      optional: true,
    },
    contactLastName: {
      type: "string",
      label: "Contact Last Name",
      optional: true,
    },
    contactEmail: {
      type: "string",
      label: "Contact Email Address",
      optional: true,
    },
  },
  async run() {
    const pg = require("pg");
    const knex = await require("knex")({
      client: "postgres",
      connection: this.postgresql.$auth,
    });

    const clients = await knex(table_name)
      .where({ name: this.clientName })
      .select("id");

    let result = false;
    if (clients.length > 0) {
      result = await updateClient(knex, clients[0].id, this);
    } else {
      result = await insertClient(knex, this);
    }

    await knex.destroy();

    return result;
  },
};

async function insertClient(knex, obj) {
  const res = await knex(table_name)
    .insert({
      name: obj.clientName,
      contactFirstName: obj.contactFirstName || "",
      contactLastName: obj.contactLastName || "",
      contactEmail: obj.contactEmail || "",
    })
    .returning("*");
  return res[0];
}

async function updateClient(knex, id, obj) {
  const res = await knex(table_name)
    .where("id", "=", id)
    .update({
      contactFirstName: obj.contactFirstName || "",
      contactLastName: obj.contactLastName || "",
      contactEmail: obj.contactEmail || "",
    })
    .returning("*");

  return res[0];
}
