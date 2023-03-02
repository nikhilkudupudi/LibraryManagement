const express=require('express');
const router=express.Router();
const {createBook,getBookByAuthor,getBookByGenre,getBookById, deleteBook}=require('./module');
const {Books}=require("../../models/models");
router.use(express.json())
router.post('/',async  function(req, res){
    const body=req.body;
    
   const data= await createBook(body);
    res.status(201).send(data);
});
//get books
router.get('/',async (req,res)=>{
    try{
      

       const data= await Books.findAll({
        order:[
            ['id','ASC'],
            ['isbn',"DESC"]
        ]
       });
       const orderbook=data.sort((a,b)=>(a.isbn-b.isbn));
       console.log(orderbook);
       if(data){
       res.status(200).send(data);
    }
        else{
            res.status(404).send("books not found");
        }
    }
    catch (err){
    res.status(400).send({message: err.message});
    }
});
// get /books/:id

router.get('/:id',async (req,res)=>{
    try{
       const id = req.params.id;
   
    const data= await getBookById(id);
       res.status(200).send(data);
    }
    catch (err){
    res.status(400).send({message: err.message});
    }
})

//get /books/:genre
router.get('/:genre',async (req,res)=>{
    try{
        const genre = req.params.genre;
       
        const data= await getBookByGenre(genre);
        res.send(200).json(data);
        
    }
    catch (err){
    res.status(400).send({message: err.message});
    }
})
//get /books/:author
router.get('/:author', async (req,res)=>{
    try{
        const author = req.params.author;
        const books=await getBookByAuthor(author);
        res.status(200).send(data);
    }
    catch (err){
    res.status(400).send({message: err.message});
    }
});
//delete /books/delete/:id

router.delete("/delete/:id",async (req,res)=>{
    try{
    const id = req.params.id;
    
    const data= await deleteBook(id);
    res.status(201).send(data);
    }
    catch (err){
    res.status(400).send({message: err.message});
    }
})


module.exports=
    router
