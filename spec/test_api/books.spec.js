const supertest = require('supertest');
const app = require('../../app');
const {startDBServer,stopDBServer}= require('../utils/server.js');
//const Books = require('../../models/models');

describe("Books api", () => {

    beforeAll(()=>{
   console.error("testing");     
    startDBServer();
    
    })
    afterAll(()=>{
        //stopDBServer();
    })
    const req = supertest(app);
    // post /books
    it("it is a test for add a book", async () => {
        const data = {
            title: "A book",
            authorname: "test author",
            description: "it is a book on testing",
            isbn: 1342567,
            edition: "1st",
            genre: "music",
            num_of_pages: 123,
            
        }
        const { status, body } = (await req.post("/books").send(data));
        const response = { ...body };
        const { id, ...remaining } = response;
        console.log(body,response,remaining);
        expect(status).toBe(201);
        expect(body).toBeDefined();
        expect(id).not.toBeNull();
        expect(remaining).toEqual(data);

    });
    // get /books
    it("test for getting all books", async () => {
        const data = {
            title: "A book",
            authorname: "test author",
            description: "it is a book on writing",
            isbn: 13427,
            edition: "2",
            genre: "coding",
            num_of_pages: 112,
            date: "09-04-2011"
        }
        const { status, body } = (await req.post("/books").send(data));
        expect(status).toBe(201);
        const {id,...remaining}=body;
        
        expect(body).toBeDefined();
        expect(remaining).toEqual(data);

        const { status: getstatus, body: getbooks } = (await req.get("/books"));
        expect(getstatus).toBe(200);
        expect(getbooks).toBeDefined();
        expect(getbooks.length).toBeGreaterThan(0);

    });
    // get  /books/{id}
    it("test for get book by id", async () => {
        const data = {

            title: "My Book",
            authorname: "Random Author",
            description: "This book is about science fiction",
            isbn: Math.floor(Math.random() * 100000),
            edition: "1st",
            genre: "fantasy",
            num_of_pages: 4,
            date: "01-01-2022"
        }
        const { status, body } = (await req.post("/books").send(data));
        expect(status).toBe(201);
        const {id,...remaining}=body;
        expect(body).toBeDefined();
        expect(remaining).toEqual(data);

        const { status: booksstatus, body: getbooks } = await (req.get(`/books/${body.id}`));
        expect(booksstatus).toBe(201);
       expect(getbooks).toEqual(body);
    })

    // get  /books/{genre}
    it("test for get book by genre", async () => {
        const data = {

            title: "My new book",
            authorname: "Random Author 1",
            description: "This is about science fiction",
            isbn: 3214567,
            edition: "1st",
            genre: "fantasy",
            num_of_pages: 124,
            date: "01-01-1922"
        }
        const { status, body } = await req.post("/books").send(data);
        const {id,...remaining}=body;
        expect(status).toBe(201);
        expect(body).toBeDefined();
        expect(remaining).toEqual(data);
        expect(body.genre.length).toBeGreaterThan(0);
        const genres = body.genre
        const { status: booksstatus, body: getbooks } = await (req.get(`/books/${genres[0]}`));
        expect(booksstatus).toBe(201);
        expect(getbooks).toBeDefined();
        expect([getbooks].length).toBeGreaterThan(0);
    })

    // delete /books/delete/{id}
    it("test for delete book by id", async () => {
        const data = {

            title: "My new book",
            authorname: "Random Author 1",
            description: "This is about science fiction",
            isbn: 3214567,
            edition: "1st",
            genre: ["fantasy", "thriller"],
            num_of_pages: 124,
            
        }
        const { status, body } = (await req.post("/books").send(data));
        const {id,...remaining}=body;
        expect(status).toBe(201);
        expect(body).toBeDefined();
        expect(remaining).toEqual(data);
        console.log(body.id);
        const { status: rescode, body: deletedbook } = (await req.delete(`/books/delete/${body.id}`))
        expect(rescode).toBe(201);
        expect(deletedbook).toBeUnDefined();
        expect(deletedbook).toEqual({});
    })



})