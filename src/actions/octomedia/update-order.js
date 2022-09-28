const { updateOrder } = require("../../domain/orders");
const { work } = require("../../data/db");

module.exports = {
  name: "Update Order",
  description: "Updates an OctoMedia order in the database.",
  key: "update_order",
  version: "9.9.9",
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
    transcriptId: {
      type: "string",
      label: "AssemblyAI Transcript ID",
      optional: true,
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
      return await updateOrder(db, this.id, this);
    });
  },
};
