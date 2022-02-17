const { findClient } = require("../../domain/clients");
const { work } = require("../../data/db");

module.exports = {
  name: "Find Client",
  description: "Finds an OctoMedia client by name.",
  key: "find_client",
  version: "9.9.9",
  type: "action",
  props: {
    postgresql: {
      type: "app",
      app: "postgresql",
    },
    fieldKey: {
      type: "string",
      options: [
        {
          label: "Client ID",
          value: "id",
        },
        { label: "Client Name", value: "name" },

        { label: "Contact Email", value: "contactEmail" },
      ],
    },
    fieldValue: {
      type: "string",
      label: "Field Value to Search",
    },
    noResults: {
      type: "string",
      label: "No Results Behavior",
      options: ["Return", "Fail", "Create"],
      default: "Return",
    },
  },
  async run() {
    return await work(this.postgresql.$auth, async (db) => {
      const res = await findClient(
        db,
        this.fieldKey,
        this.fieldValue,
        this.noResults === "Create"
      );
      if (this.noResults === "Fail" && res.length === 0) {
        console.log(this);
        throw new Error("No results returned");
      }
      return res;
    });
  },
};
