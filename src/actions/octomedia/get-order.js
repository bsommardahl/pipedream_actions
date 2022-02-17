const { getOrder } = require("../../domain/orders");
const { work } = require("../../data/db");

module.exports = {
  name: "Get Order",
  description: "Gets an OctoMedia order by ID.",
  key: "get_order",
  version: process.env.npm_package_version,
  type: "action",
  props: {
    postgresql: {
      type: "app",
      app: "postgresql",
    },
    id: {
      type: "integer",
      label: "Order ID",
    },
  },
  async run() {
    return await work(this.postgresql.$auth, async (db) => {
      return await getOrder(db, this.id);
    });
  },
};
