const express=require('express');
const router=express.Router();
const {sequelize}=require('../database')
const {createBook,createUser,createLoan}=require('../modules/modules');
// post /books
router.post('/books',async  function(req, res){
    const body=req.body;
    console.log(sequelize.models);
   const data= await createBook(body);
    console.log(data,"routes");
    //disconnectFromDB();
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

       const data= await sequelize.models.books.findAll();

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

router.get('/users',async ()=>{
    try{
        const users=await sequelize.users.findAllAsync();
    res.status(200).send(users);
    
    }
    catch(err){
        res.status(400).send({message: err.message});
    }
})
router.get('/user/:username', async (req,res)=>{
    try{
        const user=await sequelize.users.findOne({username:req.params.username});
        res.status(200).send(user);
    }
    catch(err){
        res.status(400).send({message: err.message});
    }
});

router.put('user/:username', async (req,res)=>{
    try{
        const id=req.params.username;
        const user=await sequelize.users.findOne({username:id});
        if(user){
            const update=req.body;
            const response=await sequelize.users.update(update,id);
            console.log(response);
            res.status(201).send(response);
        }
        else{
            res.status(400).send({message:err.message});
        }
       
    }
    catch(err){
        res.status(400).send({message:err.message});
    }
});
router.delete('user/:id/delete', async (req,res )=>{
       try{
        const user_id = req.params.id;
        const response=await sequelize.users.destroy({where:{id:user_id}});
        console.log(response);
        res.status(200).send(response);
       }
       catch{
        res.status(400).send({message:err.message});
       }
});


// ##################loans#

router.post('/loans',async function(req, res){
    const loan=req.body;
    const response=await createLoan(loan);
    res.status(201).send(response);
});

router.get('/loans',async (req,res)=>{
  const loans=await sequelize.loans.findAll();
  res.status(200).send(loans);
})

router.post('/loans/:id',async (req,res)=>{
   try{
    const id=req.params.id;
    const loan=req.body;
    const response=await sequelize.loans.update(loan,id);
    res.status(200).send(response);

   }
   catch(err){
    res.status(400).send({message:err.message});
   }
});

router.delete('/loans/delete/:id', async (req, res) => {
    try{
        const id=req.params.id;
    const response=await sequelize.loans.destroy({where:{id:id}});
    console.log(response);
    res.status(200).send(response);
    }
    catch (err) {
        res.status(400).send({message: err.message});
    }
})

module.exports=router;