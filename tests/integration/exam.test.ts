import supertest from "supertest";
import { getConnection } from "typeorm";
import app, { init } from "../../src/app";

import createBody from "../factories/createBody";

import Exam from "../../src/entities/Exam";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await getConnection().getRepository(Exam).clear();
});

afterAll(async () => {
  await getConnection().getRepository(Exam).clear();
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
    
    const beforeInsert = await getConnection().getRepository(Exam).find();

    expect(beforeInsert.length).toBe(0);

    const response = await supertest(app).post("/exam").send(body);

    const afterInsert = await getConnection().getRepository(Exam).find();
  
    expect(response.status).toBe(201);
    expect(afterInsert.length).toBe(1);
  });
});
