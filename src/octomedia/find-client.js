const { findClient } = require("./clients");
const { work } = require("./db");

module.exports = {
  name: "Find Client",
  description: "Finds an OctoMedia client by name.",
  key: "find_client",
  version: "0.0.13",
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
    create: {
      type: "boolean",
      label: "Create If Not Found",
      optional: true,
      default: false,
    },
  },
  async run() {
    return await work(this.postgresql.$auth)(async (db) => {
      return await findClient(db, this.clientName, this.create);
    });
  },
};
