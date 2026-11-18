const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const { app } = require("../src/app");

test("health route responds successfully", async () => {
  const response = await request(app).get("/api/health");
  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
});

test("valid feedback returns 201", async () => {
  const response = await request(app).post("/api/feedback").send({
    name: "Aditi Sharma",
    email: "aditi@example.com",
    category: "Course",
    message: "The lessons are clear and useful."
  });
  assert.equal(response.status, 201);
  assert.equal(response.body.success, true);
});

test("invalid email and short message are rejected", async () => {
  const response = await request(app).post("/api/feedback").send({
    name: "Aditi Sharma",
    email: "not-an-email",
    category: "Course",
    message: "Bad"
  });
  assert.equal(response.status, 400);
  assert.ok(response.body.errors.email);
  assert.ok(response.body.errors.message);
});

test("missing fields are rejected", async () => {
  const response = await request(app).post("/api/feedback").send({});
  assert.equal(response.status, 400);
  assert.ok(response.body.errors.name);
  assert.ok(response.body.errors.category);
});
