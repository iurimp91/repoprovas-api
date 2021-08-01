import "../../src/setup";

import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";

beforeAll(async () => {
  await init();
});

afterAll(async () => {
  await getConnection().close();
});

describe("GET /teachers/:id", () => {
  it("should answer with status 404 for inexistent subject", async () => {
    const response = await supertest(app).get("/teachers/999999");

    expect(response.status).toBe(404);
  });
  
  it("should answer with status 200 and send an array of objects for valid params", async () => { 
    const response = await supertest(app).get("/teachers/8");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
          expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              subjects: expect.any(Object),
          })
      ])
    );
  });
});

describe("GET /teachers", () => {
  it("should answer with status 200 and send an array of objects for valid params", async () => { 
    const response = await supertest(app).get("/teachers");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
          expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              exams: expect.any(Object),
          })
      ])
    );
  });
});