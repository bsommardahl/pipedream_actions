const { updateClient } = require("../../domain/clients");
const { work } = require("../../data/db");

module.exports = {
  name: "Update Client",
  description: "Updates an OctoMedia client in the database.",
  key: "update_client",
  version: process.env.npm_package_version,
  type: "action",
  props: {
    postgresql: {
      type: "app",
      app: "postgresql",
    },
    id: {
      type: "string",
      label: "Client ID",
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
      return await updateClient(db, this.id, this);
    });
  },
};
