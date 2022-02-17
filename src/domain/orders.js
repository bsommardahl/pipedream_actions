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
  return removeEmpty(res);
}

function removeEmpty(obj) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}

async function createOrder(knex, toCreate) {
  const cleaned = cleanObj(toCreate);
  cleaned.created = new Date();
  const res = await knex(table_name).insert(cleaned).returning("*");
  return res[0];
}

async function updateOrder(knex, id, toUpdate) {
  const res = await knex(table_name)
    .where("id", "=", id)
    .update(cleanObj(toUpdate))
    .returning("*");
  return res[0];
}

async function findOrder(knex, params) {
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

  return results.length > 0 ? results[0] : {};
}

async function getOrder(knex, orderId) {
  const res = await knex(tables.orders).where({ id: orderId }).select("*");
  return res.length > 0 ? res[0] : {};
}

module.exports = {
  updateOrder,
  createOrder,
  findOrder,
  getOrder,
};