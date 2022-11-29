// describe("Space test suite", () => {
//   it("My Space Test", () => {
//     expect(true).toEqual(true);
//   });
// });

const { getAllIssues, getIssue, newIssue } = require("../controllers/issues");
describe("FUNCTION TEST", () => {
  test("La respuesta deberia ser un objeto", async () => {
    let result = await getAllIssues();
    expect(result).toEqual(expect.any(Object));
  });

  test("La respuesta deberia dar error al no pasarle informacion", async () => {
    let result = await getIssue();
    // console.log(result);
    expect(result).toEqual("404");
  });

  test("La respuesta deberia ser un array que contiene un objeto", async () => {
    let result = await getIssue(1);
    expect(result).toEqual(expect.any(Object));
    expect(result.issues).toEqual(expect.arrayContaining([expect.any(Object)]));
    // expect(result).toEqual(expect.objectContaining("issues"));
  });
});

// const request = require("supertest");
// const server = require("../index");

// describe("API TEST", () => {
// test("GET /issues", (done) => {
//   request(server)
//     .get("/issues")
//     .expect("Content-Type", /json/)
//     .expect(200)
//     .end((err, res) => {
//       if (err) return done(err);
//       return done();
//     });
// });

// test("GET /issues/:id", (done) => {
//   request(server)
//     .get("/issues/1")
//     .expect("Content-Type", /json/)
//     .expect(200)
//     .end((err, res) => {
//       if (err) return done(err);
//       return done();
//     });
// });

// test("POST /issues", async () => {
//   const service = {
//     summary: "Hola que tal",
//     description: "David",
//     category: { name: "General" },
//     project: { name: "MyProject" },
//   };
//   try {
//     // const count = await Service.count();
//     await request(server).post("/issues").send(service).expect(201);
//     // const newCount = await Service.count();
//     // expect(newCount).toBe(count + 1);
//   } catch (err) {
//     // write test for failure here
//     console.log(`Error ${err}`);
//   }
// });
// });
