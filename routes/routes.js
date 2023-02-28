const express=require('express');
const router=express.Router();
const {sequelize}=require('../database')
const {createBook,createUser,createLoan}=require('../modules/modules');
const {Books,Loans,Users}=require("../models/models")
// post /books
router.post('/books',async  function(req, res){
    const body=req.body;
    console.log(sequelize.models);
   const data= await createBook(body);
    res.status(201).send(data);
});
// get /books

router.get('/books',async (req,res)=>{
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

       const data= await Books.findAll();
       if(data){
       res.status(200).send(data);}
       else{
        res.status(400).send({message: err.message});
       }
    }
    catch (err){
        console.log("there is some errore");
    res.status(400).send({message: err.message});
    }
});
// get /books/:id

router.get('/books/:id',async (req,res)=>{
    try{
       const id = req.params.id;
   
    const data= await Books.findOne({where:{id:id}});
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
        const data=Books.findOne({genre:genre});
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
    const data= Books.destroy({where:{id:id}});
    console.log(data);
    res.status(201).send(data);
    }
    catch (err){
    res.status(400).send({message: err.message});
    }
})



//#########################################
//users
router.post('/users',async function(req, res){
   
    const user=req.body;
    const response=await createUser(user);
    res.status(201).send(response);
});

router.get('/users',async (req,res)=>{
    try{
        const users=await Users.findAll();
    res.status(200).send(users);
    
    }
    catch(err){
        res.status(400).send({message: err.message});
    }
})
router.get('/user/:username', async (req,res)=>{
    try{
        console.log(req.params.username);
        const user=await Users.findOne({where:{username: ""+req.params.username}});
        console.log(user);
        res.status(200).send(user);
    }
    catch(err){
        res.status(400).send({message: err.message});
    }
});

router.put('/user/:username', async (req,res)=>{
    try{
        const id=req.params.username;
        
        
            const response=await Users.update(req.body,{where:{username:id}});
            res.status(200).send(response);
        
       
       
    }
    catch(err){
        res.status(400).send({message:err.message});
    }
});
router.delete('/user/:id/delete', async (req,res )=>{
       try{
        const user_id = req.params.id;
        const response=await Users.destroy({where:{id:user_id}});
        console.log(response);
        res.sendStatus(200)
       }
       catch(err){
        res.status(400).send({message:err.message});
       }
});


// ##################loans#

router.post('/loans',async function(req, res){
    const loan=req.body;
    const response=await createLoan(loan);
    console.log(response);
    res.status(201).send(response);
});

router.get('/loans',async (req,res)=>{
  const loans=await Loans.findAll();
  console.log(loans);
  res.status(200).send(loans);
})

router.put('/loan/:id', async (req, res) => {
  try{
    const id=req.params.id;
    console.log("inside",id);
    const loan=req.body;
    
    const response= await Loans.update(loan,{where:{id:id}});
res.send(response);
    console.log(response);
    const re=await  Loans.findByPk(id);
    console.log(re);
    res.status(200).send(response);
    
  }
  catch(err){
    console.error(err.message);
    res.status(400).send({message:err.message});
  }
})


router.delete('/loan/delete/:id', async (req, res) => {
    try{
        const id=req.params.id;
        const loan=await Loans.findByPk(id);
        if(loan){
            await loan.destroy();
        }
    const response=await Loans.destroy({where:
         {
            id: id
        }
    });
    
    res.sendStatus(200).send(response);
    }
    catch (err) {
        res.status(400).send({message: err.message});
    }
})

module.exports=router;