const express=require('express');
const router=express.Router();
const {sequelize,disconnectFromDB}=require('../database')
const {createBook}=require('../modules/bookmodule');
// post /books
router.post('/books',async  function(req, res){
    const body=req.body;
   const data= await createBook(body);
   
    console.log(data,"routes");
    //disconnectFromDB();
    res.status(201).send(body);
});
// get /books

router.get('/books',(req,res)=>{
    try{
       const  books=[
        {
            title: 'Book',
            authorname: 'Author',
            genre: 'Genre',
            id: 12,
            description: 'Description',
            isbn: 1235,
            edition:"2nd",
            genre: 'Production',
            num_of_pages:12
        }
       ]

       const data= sequelize.models.books.findAll();

       res.status(200).send(data);
    }
    catch (err){
        console.log("there is some errore");
    res.status(400).send({message: err.message});
    }
});
// get /books/:id

router.get('/books/:id',(req,res)=>{
    try{
       const id = req.params.id;
    //    const data={
    //     title: 'Book',
    //     authorname: 'Author',
    //     genre: 'Genre',
    //     id: id,
    //     description: 'Description',
    //     isbn: 1235,
    //     edition:"2nd",
    //     genre: 'Production',
    //     num_of_pages:12
    //    }
    const data= sequelize.models.books.findOne({where:{id:id}});
       res.status(201).send(data);
    }
    catch (err){
    res.status(400).send({message: err.message});
    }
})

//get /books/:genre
router.get('/books/:genre',(req,res)=>{
    try{
        const genre = req.params.genre;
        // const data={
        //     title: 'Book title',
        //     authorname: 'Austin',
        //     genre: genre,
        //     id: 12,
        //     description: 'Description',
        //     isbn: 1225,
        //     edition:"2nd",
            
        //     num_of_pages:112
        //    }
        const data=sequelize.models.books.findOne({genre:genre});
        res.send(201).json(data);
        
    }
    catch (err){
    res.status(400).send({message: err.message});
    }
})
//get /books/:author
router.get('/books/:author', (req,res)=>{
    try{
        const author = req.params.author;
        const data={
            title: ' tide',
            authorname: author,
            genre: 'code',
            id: 1,
            description: 'Description',
            isbn: 12235,
            edition:"3d",
            num_of_pages:123
        }
        res.status(200).send(data);
    }
    catch (err){
    res.status(400).send({message: err.message});
    }
});
//delete /books/delete/:id

router.delete("/books/delete/:id",(req,res)=>{
    try{
    const id = req.params.id;
    // const data= {

    //     title: "My new book",
    //     authorname: "Random Author 1",
    //     description: "This is about science fiction",
    //     isbn: 3214567,
    //     edition: "1st",
    //     genre: ["fantasy", "thriller"],
    //     num_of_pages: 124,
        
    // }
    const data= sequelize.models.books.destroy({where:{id:id}});
    res.status(201).send(data);
    }
    catch (err){
    res.status(400).send({message: err.message});
    }
})

module.exports=router;