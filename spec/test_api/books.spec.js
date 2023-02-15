const supertest = require('supertest');
const app=require('../../app');
const books = require('../../models/books');
const Books=require('../../models/books');
describe("Books api",()=>{
    const req=supertest(app);
// post /books
    it("test for  adding book",async ()=>{
        const data={
            title: "A book",
            authorname: "test author",
            description: "it is a book on testing",
            isbn: 1342567,
            edition: "1st",
            genre: ["fantasy","coding","music"],
            num_of_pages: 123,
            date: "09-07-2001"
    }
        const {status,body}=(await req.post("/books").send(data));
        const response={...body};
        const {id,...remaining}=response;
        expect(status).toBe(201);
        expect(body).toBeDefined();
        expect(body.id).toEqual(1);
        expect(remaining).toEqual(data);

    });
// get /books
    it("test for getting all books",async ()=>{
        const data={
            
            title: "A book",
            authorname: "test author",
            description: "it is a book on writing",
            isbn: 13427,
            edition: "2",
            genre: ["coding","music"],
            num_of_pages: 112,
            date: "09-04-2011"
    }
        const {status,body}=(await req.post("/books").send(data));
        expect(status).toBe(201);
        expect(body).toBeDefined();
        expect(body).toEqual(data);

        const {status:getstatus,body: getbooks}=await (await req.get("/books"));
        data.id=2;
        expect(getstatus).toBe(201);
        expect(getbooks).toBeUndefined();
        expect(getbooks.length).toBeGreaterThan(0);
    });
// get  /books/{id}
    it("test for get book by id",async ()=>{
        const data={
            
            title: "My Book",
            authorname: "Random Author",
            description: "This book is about science fiction",
            isbn: Math.floor(Math.random() * 100000),
            edition: "1st",
            genre: ["fantasy","thriller"],
            num_of_pages: 4,
            date: "01-01-2022"
    }
    const {status,body}=(await req.post("/books").send(data));
    expect(status).toBe(201);
    expect(body).toBeDefined();
    expect(body).toEqual(data);
    
    const {status: booksstatus,body: getbooks}=await (req.get(`/books/${body.id}`));
    expect(booksstatus).toBe(201);
    expect(getbooks).toEqual(data);
    })

    // get  /books/{genre}
    it("test for get book by genre",async ()=>{
        const data={
            
            title: "My new book",
            authorname: "Random Author 1",
            description: "This is about science fiction",
            isbn: 3214567,
            edition: "1st",
            genre: ["fantasy","thriller"],
            num_of_pages: 124,
            date: "01-01-1922"
    }
    const {status,body}=(await req.post("/books").send(data));
    expect(status).toBe(201);
    expect(body).toBeDefined();
    expect(body).toEqual(data);
    expect(body.genre.length).toBeGreaterThan(0);
    const genres=body.genre 
    const {status: booksstatus,body: getbooks}=await (req.get(`/books/${genres[0]}`));
    expect(booksstatus).toBe(201);
    expect(getbooks).toBeDefined();
    expect(getbooks).toBeGreaterThan(0);
    })

// delete /books/delete/{id}
    it("test for delete book by id",async ()=>{
        const data={
            
            title: "My new book",
            authorname: "Random Author 1",
            description: "This is about science fiction",
            isbn: 3214567,
            edition: "1st",
            genre: ["fantasy","thriller"],
            num_of_pages: 124,
            date: "01-01-1922"
    }
    const {status,body}=(await req.post("/books").send(data));
    expect(status).toBe(201);
    expect(body).toBeDefined();
    expect(body).toEqual(data);
    const {status: rescode,body:deletedbook}=await req.delete(`/books/delete/${body.id}`)
    expect(rescode).toBe(201);
    expect(deletedbook).toBeDefined();
    expect(deletedbook).toEqual(body);
    })



})