const { updateOrder } = require("../../domain/orders");

const table_name = "octomedia_orders";

module.exports = {
  name: "Update Order",
  description: "Updates an OctoMedia order in the database.",
  key: "update_order",
  version: "0.0.7",
  type: "action",
  props: {
    postgresql: {
      type: "app",
      app: "postgresql",
    },
    id: {
      type: "integer",
      label: "Order ID",
      optional: false,
    },
    workStarted: {
      type: "string",
      label: "Work Started On",
      optional: true,
    },
    workEnded: {
      type: "string",
      label: "Work Ended On",
      optional: true,
    },
    paidOn: {
      type: "string",
      label: "Order Paid On",
      optional: true,
    },
    clipOrder: {
      type: "integer",
      label: "Number of Clips Ordered",
      optional: true,
    },
  },
  async run() {
    return await work(this.postgresql.$auth, async (db) => {
      return updateOrder(db, this.id, this);
    });
  },
};
