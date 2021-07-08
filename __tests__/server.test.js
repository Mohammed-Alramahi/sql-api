"use strict";
const supertest = require("supertest");
const { app } = require("../src/server");
const request = supertest(app);

describe("CLOTHES AND FOOD ROUTES TESTS", () => {
  let id;

  it("Handles bad route", async () => {
    const response = await request.get("/blah");
    expect(response.status).toEqual(404);
  });

  it("Handles bad method", async () => {
    const response = await request.post("/anything?age=5");
    expect(response.status).toEqual(404);
  });

  it("Creates new food properly", async () => {
    let foodObj = { name: "test", description: "ooh", price: 50 };

    const response = await request.post("/api/v1/food").send(foodObj);
    console.log(response.body);
    id = response.body.id;

    expect(response.body.name).toBe(foodObj.name);
    expect(response.body.price).toBe(foodObj.price);
    expect(response.status).toEqual(200);
  });

  it("Reads from food properly", async () => {
    const response = await request.get("/api/v1/food/" + id);

    expect(response.body[0].name).toBeTruthy();
    expect(response.body[0].price).toBeTruthy();
    expect(response.status).toEqual(200);
  });

  it("Updates records properly", async () => {
    const newObj = {
      name: "bannana",
      price: 5,
      description: "description",
    };

    const response = await request.put("/api/v1/food/" + id).send(newObj);
    expect(response.status).toEqual(200);
    expect(response.body.name).toBe("bannana");
  });

  it("Removes a record properly", async () => {
    const response = await request.delete("/api/v1/food/" + id);
    expect(response.status).toEqual(200);
    expect(response.body.name).toBe("bannana");
  });

  it("Creates new clothes properly", async () => {
    let clothesObj = { name: "test", description: "ooh", price: 50 };

    const response = await request.post("/api/v1/clothes").send(clothesObj);
    id = response.body.id;
    expect(response.body.name).toBe(clothesObj.name);
    expect(response.body.price).toBe(clothesObj.price);
    expect(response.status).toEqual(200);
  });

  it("Reads from clothes properly", async () => {
    const response = await request.get("/api/v1/clothes/" + id);

    expect(response.body[0].name).toBeTruthy();
    expect(response.body[0].price).toBeTruthy();
    expect(response.status).toEqual(200);
  });
});
