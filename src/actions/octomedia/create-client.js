const { insertClient } = require("../../domain/clients");
const { work } = require("../../data/db");

module.exports = {
  name: "Create Client",
  description: "Create an OctoMedia client in the database.",
  key: "create_client",
  version: "9.9.9",
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
    return await work(this.postgresql.$auth, async (db) => {
      return await insertClient(db, this);
    });
  },
};
