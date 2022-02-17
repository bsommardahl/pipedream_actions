const { findOrder } = require("../../domain/orders");
const { work } = require("../../data/db");

module.exports = {
  name: "Find Order",
  description: "Finds an OctoMedia order by one of many properties.",
  key: "find_order",
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
      optional: true,
    },
    dropBoxUrl: {
      type: "string",
      label: "Dropbox URL",
      optional: true,
    },
    transcriptId: {
      type: "string",
      label: "AssemblyAI Transcript ID",
      optional: true,
    },
    filename: {
      type: "string",
      label: "Media Filename",
      optional: true,
    },
    dropBoxId: {
      type: "string",
      label: "Dropbox File ID",
      optional: true,
    },
    orderDriveFolderId: {
      type: "string",
      label: "Order Drive Folder ID",
      optional: true,
    },
    orderDriveVideoId: {
      type: "string",
      label: "Order Drive Media File ID",
      optional: true,
    },
    trelloCardUrl: {
      type: "string",
      label: "Trello Card URL",
      optional: true,
    },
    failIfNoneFound: {
      type: "boolean",
      label: "Fail if none found?",
      optional: true,
    },
  },
  async run() {
    return await work(this.postgresql.$auth, async (db) => {
      return await findOrder(db, this);
    });
  },
};
