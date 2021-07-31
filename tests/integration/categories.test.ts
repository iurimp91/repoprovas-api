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

describe("GET /categories", () => {
  it("should answer with status 200 and send an array of object for valid params", async () => { 
    const response = await supertest(app).get("/categories");
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
          expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
          })
      ])
    );
  });
});
