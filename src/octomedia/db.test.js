const { work } = require("./db");

test("Getting the db", async () => {
  const auth = { test: "test" };
  const worker = await work(auth);
  const res = worker((db) => {
    expect(db).toBe("working");
  });
  expect(res).toBe("it's working");
});
