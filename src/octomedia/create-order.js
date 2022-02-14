const table_name = "octomedia_orders";

module.exports = {
  name: "Create Order",
  description: "Creates an OctoMedia order in the database.",
  key: "create_order",
  version: "0.0.1",
  type: "action",
  props: {
    postgresql: {
      type: "app",
      app: "postgresql",
    },
    clientId: {
      type: "integer",
      label: "Client ID",
      optional: false,
    },
    dropBoxUrl: {
      type: "string",
      label: "Dropbox URL",
      optional: false,
    },
    transcriptId: {
      type: "string",
      label: "Transcript ID",
      optional: false,
    },
    filename: {
      type: "string",
      label: "Media Filename",
      optional: false,
    },
    aspect: {
      type: "string",
      label: "Aspect Ratio (ex 16:9)",
      optional: false,
    },
    dropBoxId: {
      type: "string",
      label: "Dropbox File ID",
      optional: false,
    },
    orderDriveFolderId: {
      type: "string",
      label: "Order Drive Folder ID",
      optional: false,
    },
    orderDriveVideoId: {
      type: "string",
      label: "Order Drive Media File ID",
      optional: false,
    },
    trelloCardUrl: {
      type: "string",
      label: "Trello Card URL",
      optional: false,
    },
    duration: {
      type: "integer",
      label: "Duration",
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

    // if (this.orderId) {
    //   result = await updateOrder(knex, this.orderId, this);
    // } else {
    result = await createOrder(knex, this);
    // }

    await knex.destroy();

    return result;
  },
};

function cleanObj(obj) {
  const res = {
    id: obj.id,
    duration: obj.duration,
    clientId: obj.clientId,
    dropBoxUrl: obj.dropBoxUrl,
    transcriptId: obj.transcriptId,
    filename: obj.filename,
    aspect: obj.aspect,
    dropBoxId: obj.dropBoxId,
    orderDriveFolderId: obj.orderDriveFolderId,
    orderDriveVideoId: obj.orderDriveVideoId,
    trelloCardUrl: obj.trelloCardUrl,
    workStarted: obj.workStarted,
    workEnded: obj.workEnded,
    paidOn: obj.paidOn,
    clipOrder: obj.clipOrder,
  };
  return res;
}
async function createOrder(knex, obj) {
  const cleaned = cleanObj(obj);
  cleaned.created = new Date();
  const res = await knex(table_name).insert(cleaned).returning("*");
  return res[0];
}

// async function updateOrder(knex, id, obj) {
//   const res = await knex(table_name)
//     .where("id", "=", id)
//     .update(cleanObj(obj))
//     .returning("*");
//   return res[0];
// }
