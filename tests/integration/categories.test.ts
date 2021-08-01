import "../../src/setup";

import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";

import createBody from "../factories/createBody";

import clearAndRestartIdExamsTable from "../utils/clearAndRestartIdExamsTable";

beforeAll(async () => {
  await init();
  clearAndRestartIdExamsTable();
});

beforeEach(async () => {
  clearAndRestartIdExamsTable();
});

afterAll(async () => {
  clearAndRestartIdExamsTable();
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

describe("GET /categories/teacher/:id", () => {
  it("should answer with status 404 for inexistent teacher", async () => {
    const response = await supertest(app).get("/categories/teacher/999999");

    expect(response.status).toBe(404);
  });
  
  it("should answer with status 200 and empty array for teacher with no exams", async () => { 
    const response = await supertest(app).get("/categories/teacher/1");

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

    const response = await supertest(app).get("/categories/teacher/1");

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

describe("GET /categories/subject/:id", () => {
  it("should answer with status 404 for inexistent subject", async () => {
    const response = await supertest(app).get("/categories/subject/999999");

    expect(response.status).toBe(404);
  });
  
  it("should answer with status 200 and empty array for subject with no exams", async () => { 
    const response = await supertest(app).get("/categories/subject/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        subjectName: expect.any(String),
        examsByCategory: expect.any(Array),
      })
    );
    
    expect(response.body.examsByCategory.length).toBe(0);
  });

  it("should answer with status 200 and an array with exams filteres by category for valid params", async () => { 
    const body = createBody(2020, 1, 1, 1, 1, "https://infoprovas.dcc.ufrj.br/provas/50.pdf");
    
    const insertExam = await supertest(app).post("/exam").send(body);

    expect(insertExam.status).toBe(201);

    const response = await supertest(app).get("/categories/subject/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        subjectName: expect.any(String),
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

