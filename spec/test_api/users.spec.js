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
            username: "theUser",
            firstName: "John",
            lastName: "James",
            email: "john@email.com",
            role: "student",
            address: "string",
            password: "12345",
            phone: "12345"
          }
        const {status,body}=await (await req.post('/users').send(data));
        expect(status).toBe(201);
        expect(body).toBeDefined();
        const {id}=body;
        expect(body).toEqual(data);
        expect(id).not.toBeNull();
    })
// get /users
    it("test for user by username",async ()=>
    {
        const data={
            username: "batman",
            firstName: "bat",
            lastName: "man",
            email: "test@email.com",
            role: "student",
            address: "home",
            password: "1212",
            phone: "123412121"
          }
        const {status,body}=await (await req.post('/users').send(data));
        expect(status).toBe(201);
        expect(body).toBeDefined();
        const {id}=body;
        expect(body).toEqual(data);
        expect(id).toBeDefined();

        const  {status: getuser,body: getbody}= await req.get("/users");
        expect(getuser).toBe(201);
        expect(getbody).toBeDefined();
        expect(getbody.length).toBeGreaterThan(0);
    })
// get /user/{username}

it("test for user by username",async ()=>{
    const data={
        username: "newuser",
        firstName: "new",
        lastName: "user",
        email: "usertest@email.com",
        role: "staff",
        address: "amp",
        password: "1321",
        phone: "12341223421"
    }

    const {status,body}=await (await req.post('/users').send(data));
    expect(status).toBe(201);
    expect(body).toBeDefined();
    const {id}=body;
    expect(body).toEqual(data);
    expect(id).toBeDefined();
    const  {status: getuser,body: getbody}= await req.get(`/users/${body.username}`);
    const {userid,userbody}=getbody;
    expect(getuser).toBe(200);
    expect(getbody).toBeDefined();
    expect(getbody.username).toBe(body.username);
    expect(userbody).toEqual(body);
})
// post /user/{username}
it("test for user to update by username",async ()=>{
    const data={
        username: "random user",
        firstName: "austin",
        lastName: "martin",
        email: "usetest@email.com",
        role: "staff",
        address: "amq",
        password: "13e#1",
        phone: "123412232421"
    }

    const {status,body}=await (await req.post('/users').send(data));
    expect(status).toBe(201);
    expect(body).toBeDefined();
    const {id}=body;
    expect(body).toEqual(data);
    expect(id).toBeDefined();

    const {status: updateuser,body: updatebody}= await (await req.put(`/users/${body.username}`).send({
        username: "random_user",
        firstName: "raj",
        lastName: "mars",
        email: "usetest@email.com",
        role: "staff",
        address: "amq",
        password: "13e12",
        phone: "123412232421"
    }));
    expect(updateuser).toBe(201);
    expect(updatebody).toBeDefined();
    expect(updatebody.firstName).toBe('raj');
    expect(updatebody.lastName).toBe('mars');
    expect(updatebody.address).toBe('amq');
    expect(updatebody.phone).toBe('123412232421');
    expect(updatebody.password).toBe('13e12');
    
})
// /users/{id}/delete
it("test for user to delete by id", async () => {
    const data={
        username: "user12",
        firstName: "aus",
        lastName: "tin",
        email: "uset@email.com",
        role: "student",
        address: "amp",
        password: "1312#1",
        phone: "123432421"
    }

    const {status,body}=await (await req.post('/users').send(data));
    expect(status).toBe(201);
    expect(body).toBeDefined();
    const {id}=body;
    expect(body).toEqual(data);
    expect(id).toBeDefined();
    const {status: deletestatus,body:deletebody}=await req.delete(`/users/${body.id}/delete`).send();
    expect(deletestatus).toBe(200);
    expect(deletebody).toBeUnDefined();
    expect(deletebody).not().toEqual(body);

});


})