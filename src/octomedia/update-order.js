const table_name = "octomedia_orders";

module.exports = {
  name: "Update Order",
  description: "Updates an OctoMedia order in the database.",
  key: "update_order",
  version: "0.0.4",
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
    const pg = require("pg");
    const knex = await require("knex")({
      client: "postgres",
      connection: this.postgresql.$auth,
    });

    let result = false;
    result = await updateOrder(knex, this.id, this);

    await knex.destroy();

    return result;
  },
};

function cleanObj(obj) {
  const res = {
    workStarted: obj.workStarted,
    workEnded: obj.workEnded,
    paidOn: obj.paidOn,
    clipOrder: obj.clipOrder,
  };
  Object.keys(res).forEach((key) => {
    if (res[key] === undefined) {
      delete res[key];
    }
  });
  return res;
}

async function updateOrder(knex, id, obj) {
  const res = await knex(table_name)
    .where("id", "=", id)
    .update(cleanObj(obj))
    .returning("*");
  return res[0];
}
