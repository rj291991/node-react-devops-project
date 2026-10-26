
const request = require("supertest");
const app = require("./server");

describe("DevOps Demo Backend", () => {
  test("GET /health returns a healthy status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("healthy");
    expect(response.body.service).toBe("devops-demo-backend");
    expect(response.body.version).toBe("1.0.0");
  });

  test("GET /api/message returns the welcome message", async () => {
    const response = await request(app).get("/api/message");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Hello from the DevOps Demo Backend!"
    );
  });
});
