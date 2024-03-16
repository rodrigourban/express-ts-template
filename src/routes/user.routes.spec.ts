import app from "../app";

import request from "supertest";

describe("POST /register", () => {
  it("returns 201 when new user is created", async () => {
    const res = await request(app).post("/api/users/").send({
      username: "testusername",
      email: "testemail@gmail.com",
      password: "testpassword",
      repeat_password: "testpassword",
    });

    expect(res.statusCode).toEqual(201);
  });
});
