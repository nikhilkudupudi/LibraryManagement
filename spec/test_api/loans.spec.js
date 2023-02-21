const { connectToDB, disconnectFromDB } = require('../../database');
const supertest = require("supertest");
const app = require("../../app");


describe(" tests for loan",  () => {
    beforeAll(async ()=>{
        await connectToDB();
        })
        // afterAll(async ()=>{
        // await disconnectFromDB();
        // })

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
    console.log("hello",postbody);
    const { id, updatedAt,createdAt,...remaining } = postbody;
    console.log(remaining);
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
    const loan = {
      username: "bobsmith",
      bookid: 789,
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
      id: id,
      username: "maryjane",
      bookid: 234,
      title: "Pride and Prejudice",
      date: "2023-02-24",
      period: 2,
      isActive: true,
    };
    const {status: updateStatus,body: updatedbody} =req.put(`/loan/${remaining.id}`)
      const {updatedAt:updatedAt1,createdAt:createdAt1,...rem } = updatedbody;
    expect(updateStatus).toBe(201);
    expect(updatedbody).toBeDefined();
    expect(rem).toEqual(updated_loan);
  });

  it("test for delete loan by id", async () => {
    const loan = {
      username: "jimmyjohn",
      bookid: 567,
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

    const {status: deletestatus, body:deletebody}=await req.delete(`/loan/delete/${postbody.id}`);
    expect(deletestatus).toBe(200);
    expect(deletebody).toBeUnDefined();
    expect(deletebody).toEqual(postbody);
  });
});
