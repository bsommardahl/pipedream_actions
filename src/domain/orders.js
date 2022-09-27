const tables = {
  orders: "octomedia_orders",
};

function cleanObj(obj) {
  const res = {
    // id: obj.id,
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
    workStarted: obj.workStarted ? new Date(obj.workStarted) : undefined,
    workEnded: obj.workEnded ? new Date(obj.workEnded) : undefined,
    paidOn: obj.paidOn ? new Date(obj.paidOn) : undefined,
    clipOrder: obj.clipOrder,
  };
  const clean = removeEmpty(res);
  console.log("cleaned update", clean);
  return clean;
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
  const res = await knex(tables.orders).insert(cleaned).returning("*");
  return res[0];
}

async function updateOrder(knex, id, toUpdate) {
  const res = await knex(tables.orders)
    .where("id", "=", id)
    .update(cleanObj(toUpdate))
    .returning("*");
  return res[0];
}

async function findOrder(knex, key, value) {
  const where = { [key]: value };
  const results = await knex(tables.orders).where(where).select("*");
  return results;
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
