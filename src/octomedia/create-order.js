const { createOrder } = require("../../domain/orders");
const { work } = require("../../data/db");

module.exports = {
  name: "Create Order",
  description: "Creates an OctoMedia order in the database.",
  key: "create_order",
  version: "9.9.9",
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
    return await work(this.postgresql.$auth, async (db) => {
      return await createOrder(db, this);
    });
  },
};
