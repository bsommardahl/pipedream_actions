module.exports = {
  name: "Find Client",
  description: "Finds an OctoMedia client by name.",
  key: "find_client",
  version: "0.0.10",
  type: "action",
  props: {
    postgresql: {
      type: "app",
      app: "postgresql",
    },
    clientName: {
      type: "string",
      label: "Client Name",
    },
  },
  async run() {
    return await step({ postgresql: this.postgresql.$auth }, this);
  },
};

async function step(auths, params) {
  const table_name = "clients";
  const pg = require("pg");
  const knex = await require("knex")({
    client: "postgres",
    connection: auths.postgresql,
  });

  const clients = await knex(table_name)
    .where({ name: params.clientName })
    .select("*");

  await knex.destroy();

  return clients.length > 0 ? clients[0] : {};
}
