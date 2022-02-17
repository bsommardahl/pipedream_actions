const { getClient } = require("../../domain/clients");
const { work } = require("../../data/db");

module.exports = {
  name: "Get Client",
  description: "Gets an OctoMedia client by ID.",
  key: "get_client",
  version: process.env.npm_package_version,
  type: "action",
  props: {
    postgresql: {
      type: "app",
      app: "postgresql",
    },
    id: {
      type: "integer",
      label: "Client ID",
    },
  },
  async run() {
    return await work(this.postgresql.$auth, async (db) => {
      return await getClient(db, this.id);
    });
  },
};
