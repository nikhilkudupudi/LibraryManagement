const { connectToDB, disconnectFromDB } = require('../../database');
const supertest = require("supertest");
const app = require("../../app");
const jasmine=require("jasmine");
const {sequelize}=require("../../database");

describe(" tests for loan",  () => {
    beforeAll(async ()=>{
        await connectToDB();
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
        })
        afterAll(async ()=>{
        await disconnectFromDB();
        })

  const req = supertest(app);
  it("should create a loan", async () => {
    const loan = {
      username: "johndoe",
      bookid: 123,
      title: "The Great Gatsby",
      date: "2023-02-21",
      period: 2,
      isActive: false,
    };
    const { status: poststatus, body: postbody } = await req.post("/loans").send(loan);
    const { id, updatedAt,createdAt,...remaining } = postbody;
    expect(poststatus).toBe(201);
    expect(postbody).toBeDefined();
    expect(id).toBeDefined();
    expect(remaining).toEqual(loan);
  });

  it("test for getting all loans", async () => {
    const loan = {
      username: "janedoe",
      bookid: 456,
      title: "To Kill a Mockingbird",
      date: "2023-02-22",
      period: 1,
      isActive: true,
    };
    const { status: poststatus, body: postbody } = await req
      .post("/loans")
      .send(loan);

      const { id, updatedAt,createdAt,...remaining } = postbody;
    expect(poststatus).toBe(201);
    expect(postbody).toBeDefined();
    expect(id).toBeDefined();
    expect(remaining).toEqual(loan);

    const {status: getstatus,body: getbody} =await req.get("/loans");
    
    expect(getstatus).toBe(200);
    expect(getbody).toBeDefined();
    expect(getbody.length).toBeGreaterThan(0);
  });

  it("test for  update loan by id", async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;
    const loan = {
      username: "bobsmith"+Math.floor(Math.random() *100000),
      bookid: Math.floor(Math.random() *100000),
      title: "1984",
      date: "2023-02-23",
      period: 3,
      isActive: false,
    };

    const { status: poststatus, body: postbody } = await req
      .post("/loans")
      .send(loan);

      const { id, updatedAt,createdAt,...remaining } = postbody;
    expect(poststatus).toBe(201);
    expect(postbody).toBeDefined();
    expect(id).toBeDefined();
    expect(remaining).toEqual(loan);
    const updated_loan = {
      username: "maryjane"+Math.floor(Math.random() *100000),
      bookid: Math.floor(Math.random() *100000+1),
      title: "Pride and Prejudice",
      date: "2023-02-24",
      period: 2,
      isActive: true,
    };
    const response = await req.put(`/loans/${id}`).send(updated_loan);
    
    expect(response.status).toBe(200);
    expect(response.text).toBe("updated successfully");
    
  });

  it("test for delete loan by id", async () => {
    const loan = {
      username: "jimmyjohn",
      bookid: Math.floor(Math.random() *100000),
      title: "The Catcher in the Rye",
      date: "2023-02-25",
      period: 1,
      isActive: false,
    };

    const { status: poststatus, body: postbody } = await req
      .post("/loans")
      .send(loan);

      const { id, updatedAt,createdAt,...remaining } = postbody;
    expect(poststatus).toBe(201);
    expect(postbody).toBeDefined();
    expect(id).toBeDefined();
    expect(remaining).toEqual(loan);

    const  response=await req.delete(`/loans/delete/${id}`);
    expect(response.status).toBe(200);
    expect(response.text).toEqual("deleted successfully");
  });
});
