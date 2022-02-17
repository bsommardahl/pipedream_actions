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
    fieldKey: {
      type: "string",
      options: [
        {
          label: "Order ID",
          value: "id",
        },
        { label: "Dropbox URL", value: "dropBoxUrl" },

        { label: "AssemblyAI Transcript ID", value: "transcriptId" },

        { label: "Media Filename", value: "filename" },

        { label: "Dropbox File ID", value: "dropBoxId" },

        { label: "Order Drive Folder ID", value: "orderDriveFolderId" },

        { label: "Order Drive Media File ID", value: "orderDriveVideoId" },

        { label: "Trello Card URL", value: "trelloCardUrl" },
      ],
    },
    fieldValue: {
      type: "string",
      label: "Field Value to Search",
    },
    noResults: {
      type: "string",
      label: "No Results Behavior",
      options: ["Return", "Fail"],
      default: "Return",
    },
  },
  async run() {
    return await work(this.postgresql.$auth, async (db) => {
      const res = await findOrder(
        db,
        this.fieldKey,
        this.fieldValue        
      );
      if (this.noResults === "Fail" && res.length === 0) {
        console.log(this);
        throw new Error("No results returned");
      }
      return res;
    });
  },
};
