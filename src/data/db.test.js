const { work } = require("./db");

test("Getting the db", async () => {
  const auth = { test: "test" };
  const res = await work(auth, async (db) => {
    expect(db).toBeDefined();
    return "working";
  });
  expect(res).toBe("working");
});
