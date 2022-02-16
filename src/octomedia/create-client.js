const { insertClient } = require("./clients");
const { work } = require("./db");

module.exports = {
  name: "Create Client",
  description: "Create an OctoMedia client in the database.",
  key: "create_client",
  version: "0.0.4",
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
    return await work(this.postgresql.$auth)(async (db) => {
      return await insertClient(db, this);
    });
  },
};
