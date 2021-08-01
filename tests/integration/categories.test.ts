import "../../src/setup";

import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";

import createBody from "../factories/createBody";

import Exams from "../../src/entities/Exams";

beforeAll(async () => {
  await init();
  await getConnection().getRepository(Exams).clear();
});

afterAll(async () => {
  await getConnection().getRepository(Exams).clear();
  await getConnection().close();
});

describe("GET /categories", () => {
  it("should answer with status 200 and send an array of objects for valid params", async () => { 
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

describe("GET /categories/:teacherId", () => {
  it("should answer with status 404 for inexistent teacher", async () => {
    const response = await supertest(app).get("/categories/999999");

    expect(response.status).toBe(404);
  });
  
  it("should answer with status 200 and empty array for teacher with no exams", async () => { 
    const response = await supertest(app).get("/categories/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        teacherName: expect.any(String),
        examsByCategory: expect.any(Array),
      })
    );
    
    expect(response.body.examsByCategory.length).toBe(0);
  });

  it("should answer with status 200 and an array with exams filteres by category for valid params", async () => { 
    const body = createBody(2020, 1, 1, 1, 1, "https://infoprovas.dcc.ufrj.br/provas/50.pdf");
    
    const insertExam = await supertest(app).post("/exam").send(body);

    expect(insertExam.status).toBe(201);

    const response = await supertest(app).get("/categories/1");

    console.log(response.body.examsByCategory[0].exams)

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        teacherName: expect.any(String),
        examsByCategory: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            exams: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                year: expect.any(Number),
                semester: expect.any(Number),
                link: expect.any(String),
                subject: expect.any(Object),
                teacher: expect.any(Object),
              })
            ]),
          })
        ])
      })
    );
  });
});
