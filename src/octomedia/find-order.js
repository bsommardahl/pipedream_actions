module.exports = {
  name: "Find Order",
  description: "Finds an OctoMedia order by one of many properties.",
  key: "find_order",
  version: "0.0.3",
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
      label: "Transcript ID",
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
  },
  async run() {
    return await step({ postgresql: this.postgresql.$auth }, this);
  },
};

async function step(auths, params) {
  const table_name = "clients";
  const pg = require("pg");
  const knex = await require("knex")({
    client: "postgres",
    connection: auths.postgresql,
  });

  let key = false;
  let value = false;

  if (!params.id) {
    key = "id";
    value = params.id;
  } else {
    key = Object.keys(params).find((key) => params[key]);
    value = params[key];
  }

  const where = {};
  where[key] = value;

  const results = await knex(table_name).where(where).select("*");

  await knex.destroy();

  return results.length > 0 ? results[0] : {};
}
