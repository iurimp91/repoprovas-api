import "../../src/setup";

import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";

import createBody from "../factories/createBody";

import Exams from "../../src/entities/Exams";

import clearAndRestartIdExamsTable from "../utils/clearAndRestartIdExamsTable";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  clearAndRestartIdExamsTable();
});

afterAll(async () => {
  clearAndRestartIdExamsTable();
  await getConnection().close();
});

describe("POST /exam", () => {
  it("should answer with status 400 for invalid body", async () => {
    const body: object = {};
    
    const response = await supertest(app).post("/exam").send(body);
    
    expect(response.status).toBe(400);
  });

  it("should answer with status 400 for invalid year", async () => {
    const body = createBody(-2020, 1, 1, 1, 1, "https://infoprovas.dcc.ufrj.br/provas/50.pdf");
    
    const response = await supertest(app).post("/exam").send(body);
    
    expect(response.status).toBe(400);
  });

  it("should answer with status 400 for semester different from 1 or 2", async () => {
    const body = createBody(2020, 3, 1, 1, 1, "https://infoprovas.dcc.ufrj.br/provas/50.pdf");
    
    const response = await supertest(app).post("/exam").send(body);
    
    expect(response.status).toBe(400);
  });

  it("should answer with status 400 for inexistent teacher, subject or category", async () => {
    const body = createBody(2020, 1, 100, 1, 1, "https://infoprovas.dcc.ufrj.br/provas/50.pdf");
    
    const response = await supertest(app).post("/exam").send(body);
    
    expect(response.status).toBe(400);
  });

  it("should answer with status 400 for invalid pdf link", async () => {
    const body = createBody(2020, 1, 1, 1, 1, "https://infoprovas.dcc.ufrj.br/provas/50");
    
    const response = await supertest(app).post("/exam").send(body);
    
    expect(response.status).toBe(400);
  });

  it("should answer with status 409 for duplicate exam", async () => {
    const body = createBody(2020, 1, 1, 1, 1, "https://infoprovas.dcc.ufrj.br/provas/50.pdf");
    
    const firstInsert = await supertest(app).post("/exam").send(body);
    
    expect(firstInsert.status).toBe(201);

    const secondInsert = await supertest(app).post("/exam").send(body);
  
    expect(secondInsert.status).toBe(409);

  });

  it("should answer with status 201 and save exam for valid body", async () => {
    const body = createBody(2020, 1, 1, 1, 1, "https://infoprovas.dcc.ufrj.br/provas/50.pdf");
    
    const beforeInsert = await getConnection().getRepository(Exams).find();

    expect(beforeInsert.length).toBe(0);

    const response = await supertest(app).post("/exam").send(body);

    const afterInsert = await getConnection().getRepository(Exams).find();
  
    expect(response.status).toBe(201);
    expect(afterInsert.length).toBe(1);
  });
});

describe("GET /exam/:id", () => {
  it("should answer with status 404 for inexistent exam", async () => {
    const response = await supertest(app).get("/exam/999999");

    expect(response.status).toBe(404);
  });

  it("should answer with status 200 and an exam object for valid params", async () => { 
    const body = createBody(2020, 1, 1, 1, 1, "https://infoprovas.dcc.ufrj.br/provas/50.pdf");
    
    const insertExam = await supertest(app).post("/exam").send(body);

    expect(insertExam.status).toBe(201);

    const response = await supertest(app).get("/exam/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        year: expect.any(Number),
        semester: expect.any(Number),
        link: expect.any(String),
        category: expect.any(Object),
        subject: expect.any(Object),
        teacher: expect.any(Object),
      }));
  });
});