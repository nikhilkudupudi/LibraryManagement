const app=require('../../app');
const supertest=require('supertest');
const { connectToDB, disconnectFromDB } = require('../../database');

describe("tests for users",()=>{
beforeAll(async ()=>{
await connectToDB();
})
afterAll(async ()=>{
await disconnectFromDB();
})

    const req=supertest(app);
// post users
    it('test for users',async ()=>{
        const data={
            username: "theUser=",
            firstName: "John",
            lastName: "James",
            email: "john@email.com",
            role: "student",
            address: "string",
            password: "12345",
            phone: "12345"
          }
        const {status,body}=await req.post('/users').send(data);
        expect(status).toBe(201);
        expect(body).toBeDefined();
        const {id}=body;
        //expect(body).toEqual(data);
        expect(id).not.toBeNull();
    })
// get /users
    it("test for getting all users",async ()=>
    {
        // const data={
        //     username: "btan",
        //     firstName: "bat",
        //     lastName: "man",
        //     email: "tes@emil.com",
        //     role: "student",
        //     address: "home",
        //     password: "1212",
        //     phone: "123412121"
        //   }
        // const {status,body}=await req.post('/users').send(data);
        // expect(status).toBe(201);
        // expect(body).toBeDefined();
        // const {id}=body;
        // //expect(body).toEqual(data);
        // expect(id).toBeDefined();

        const  {status: getuser,body: getbody}= await req.get("/users");
        expect(getuser).toBe(200);
        expect(getbody).toBeDefined();
        expect(getbody.length).toBeGreaterThan(0);
    })
// get /user/{username}

it("test for user by username",async ()=>{
    const data={
        username: "usern",
        firstName: "new",
        lastName: "user",
        email: "usert@eail.com",
        role: "staff",
        address: "amp",
        password: "1321",
        phone: "12341223421"
    }

    const {status,body}=await req.post('/users').send(data);
    expect(status).toBe(201);
    expect(body).toBeDefined();
    const {id}=body;
    //expect(body).toEqual(data);
    expect(id).toBeDefined();
    const  {status: getuser,body: getbody}= await req.get(`/user/${body.username}`);
    const {userid,userbody}=getbody;
    expect(getuser).toBe(200);
    expect(getbody).toBeDefined();
    expect(getbody.username).toBe(body.username);
    //expect(userbody).toEqual(body);
})
// post /user/{username}
it("test for user to update by username",async ()=>{
    // const data={
    //     username: "drhn",
    //     firstName: "austin",
    //     lastName: "martin",
    //     email: "usetest@email.com",
    //     role: "staff",
    //     address: "amq",
    //     password: "13e#1",
    //     phone: "123412232421"
    // }

    // const {status,body}=await req.post('/users').send(data);
    // expect(status).toBe(201);
    // expect(body).toBeDefined();
    // const {id}=body;
    // //expect(body).toEqual(data);
    // expect(id).toBeDefined();

    const response= await req.put(`/user/drhn`).send({
        id:"4dcb33d5-03a1-4ec4-920a-bf9c585f674f",
        username: "rano_user",
        firstName: "raj",
        lastName: "mars",
        email: "usetest@email.com",
        role: "staff",
        address: "amq",
        password: "13e12",
        phone: "123412232421"
    });
    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
    // expect(updatebody.firstName).toBe('raj');
    // expect(updatebody.lastName).toBe('mars');
    // expect(updatebody.address).toBe('amq');
    // expect(updatebody.phone).toBe('123412232421');
    // expect(updatebody.password).toBe('13e12');
    
})
// /users/{id}/delete
it("test for user to delete by id", async () => {
    const data={
        username: "uerh2g",
        firstName: "aus",
        lastName: "tin",
        email: "uset@email.com",
        role: "student",
        address: "amp",
        password: "1312#1",
        phone: "123432421"
    }

    const {status,body}=await req.post('/users').send(data);
    expect(status).toBe(201);
    expect(body).toBeDefined();
    const {id}=body;
   // expect(body).toEqual(data);
    expect(id).toBeDefined();
    const {status: deletestatus,body:deletebody}=await req.delete(`/user/${body.id}/delete`);
    expect(deletestatus).toBe(200);
    // expect(deletebody).toBeUnDefined();
    // expect(deletebody).not().toEqual(body);

});


})