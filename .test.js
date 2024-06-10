const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const app = require("./index");

// Konfigurasi middleware dan routes spesifik untuk auth service
app.use(express.json());

describe("Auth Service Unit Test", () => {
  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://ahmadsiddiqp:cIEiu8ExZFm3fatk@cluster0.pzfilcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should return a JWT token on login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "testcoba@gmail.com", password: "testcoba" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).not.toBeNull();
  });

  it("should return a JWT token on register", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "user2", email: "user@gmail.com", password: "password" });

    console.log(res);

    expect(res.statusCode).toEqual(200);
    expect(res.body.token).not.toBeNull();
  })
});

// describe("Scoring Service Integration Test", () => {
//   beforeAll(async () => {
//     await mongoose.connect("mongodb+srv://ahmadsiddiqp:cIEiu8ExZFm3fatk@cluster0.pzfilcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   it("should return a score for a given quiz attempt", async () => {
//     const res = await request(app)
//       .post("/api/scoring/grade")
//       .send({ userId: "6667213ac2417c44558128a7", quizId: "66672136254671237c22cdba", answerId: "6667217fb5db7f17b97d31bc"}); 

//     expect(res.statusCode).toEqual(200);

//     expect(res.body.score).toBeGreaterThan(0);
//   });
// });

// describe("Quiz Service Integration Test", () => {
//   beforeAll(async () => {
//     await mongoose.connect("mongodb+srv://ahmadsiddiqp:cIEiu8ExZFm3fatk@cluster0.pzfilcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   it("should return a quiz with questions", async () => {
//     const res = await request(app).get("http://localhost:8001/api/quiz/quiz-questions/6658ab14288c86850d40a135");

//     expect(res.statusCode).toEqual(200);

//     expect(res.body.questions).toHaveLength(5); 
//   });
// });
