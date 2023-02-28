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
            username: "theUser="+Math.floor(Math.random()*100+1),
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
        expect(id).not.toBeNull();
    })
// get /users
    it("test for getting all users",async ()=>
    {
        const data={
             username: "btan"+Math.floor(Math.random()*100+1),
             firstName: "bat",
             lastName: "man",
             email: "tes@emil.com",
             role: "student",
             address: "home",
             password: "1212",
             phone: "123412121",
             loans:12
           }
         const {status,body}=await req.post('/users').send(data);
         expect(status).toBe(201);
         expect(body).toBeDefined();
         const {id,createdAt,updatedAt,...remaining}=body;
        expect(remaining).toEqual(data);
         expect(id).toBeDefined();

        const  {status: getuser,body: getbody}= await req.get("/users");
        expect(getuser).toBe(200);
        expect(getbody).toBeDefined();
        expect(getbody.length).toBeGreaterThan(0);
    })
// get /user/{username}

it("test for user by username",async ()=>{
    const data={
        username: "usern"+Math.floor(Math.random()*100+1),
        firstName: "new",
        lastName: "user",
        email: "usert@eail.com",
        role: "staff",
        address: "amp",
        password: "1321",
        phone: "12341223421",
        loans:null
    }

    const {status,body}=await req.post('/users').send(data);
    expect(status).toBe(201);
    expect(body).toBeDefined();
    const {id,username}=body;
    
    expect(id).toBeDefined();
    const  {status: getuser,body: getbody}= await req.get(`/users/${username}`);
    const {userid,userbody}=getbody;
    expect(getuser).toBe(200);
    expect(getbody).toBeDefined();
    expect(getbody.username).toBe(body.username);
    
})
// post /user/{username}
it("test for user to update by username",async ()=>{
    const data={
        username: "drhn5113"+Math.floor(Math.random()*10),
        firstName: "austin",
        lastName: "martin",
        email: "usetest@email.com",
        role: "staff",
        address: "amq",
        password: "13e#1",
        phone: "123412232421",
        loans:null,
    }

    const {status,body}=await req.post('/users').send(data);
    expect(status).toBe(201);
    expect(body).toBeDefined();
    const {id,username}=body;
    expect(id).toBeDefined();

    const response= await req.put(`/users/${username}`).send({
        id,
        username: "rano_user",
        firstName: "raj",
        lastName: "mars",
        email: "usetest@email.com",
        role: "staff",
        address: "amq",
        password: "13e12",
        phone: "123412232421",
        loans:null
    });
    expect(response.status).toBe(200);
    expect(response.text).toBe("user updated");
  
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
    expect(id).toBeDefined();
    const response=await req.delete(`/users/${body.id}/delete`);
    expect(response.status).toBe(200);
    expect(response.text).toBe("user deleted");

});


})