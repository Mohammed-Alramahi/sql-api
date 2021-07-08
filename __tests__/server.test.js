"use strict";
require("dotenv").config();
const supertest = require("supertest");
const { app } = require("../src/server");
const request = supertest(app);

describe("Server Test Group", () => {
  let id;

  it("Handles bad route", async () => {
    const response = await request.get("/hello");
    expect(response.status).toEqual(404);
  });

  it("Handles bad method", async () => {
    const response = await request.post("/person?name=yazan");
    expect(response.status).toEqual(404);
  });

  it("Handles creating new food", async () => {
    let foodObj = { name: "test", description: "ooh", price: 50 };

    const response = await request.post("/api/v1/food").send(foodObj);
    console.log(response.body);
    id = response.body.id;

    expect(response.body.name).toBe(foodObj.name);
    expect(response.body.price).toBe(foodObj.price);
    expect(response.status).toEqual(200);
  });

  it("Handles reading foods", async () => {
    const response = await request.get("/api/v1/food/" + id);

    expect(response.body[0].name).toBeTruthy();
    expect(response.body[0].price).toBeTruthy();
    expect(response.status).toEqual(200);
  });

  it("Handles updating a record", async () => {
    const newObj = {
      name: "potato",
      price: 5,
      description: "description",
    };

    const response = await request.put("/api/v1/food/" + id).send(newObj);
    expect(response.status).toEqual(200);
    expect(response.body.name).toBe("potato");
  });

  it("Handles deleting a record", async () => {
    const response = await request.delete("/api/v1/food/" + id);
    expect(response.status).toEqual(200);
    expect(response.body.name).toBe("potato");
  });
});
