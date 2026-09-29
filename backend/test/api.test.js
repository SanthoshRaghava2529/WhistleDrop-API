const request = require("supertest");
const app = require("../server");

describe("WhistleDrop API", () => {

  test("GET / should return API running message", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("WhistleDrop API is running");
  });

  test("POST /api/reports should reject missing description", async () => {
    const response = await request(app)
      .post("/api/reports")
      .send({
        category: "Technical"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("Unknown route should return 404", async () => {
    const response = await request(app)
      .get("/this-route-does-not-exist");

    expect(response.statusCode).toBe(404);
  });

  test("Moderator reports should require authentication", async () => {
    const response = await request(app)
      .get("/api/moderator/reports");

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  test("Moderator status update should require authentication", async () => {
    const response = await request(app)
      .patch("/api/moderator/reports/FAKE-123456/status")
      .send({
        status: "HELLO"
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

});