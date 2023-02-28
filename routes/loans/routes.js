const express=require('express');
const router=express.Router();
const {createLoan,updateloanById,deleteLoanById}=require('./module');
const {Loans}=require("../../models/models");

router.post('/',async function(req, res){
    try{
        const loan=req.body;
    const response=await createLoan(loan);
    res.status(201).send(response);
    }
    catch(err){
        res.status(400).send({message: err.message});
    }
});

router.get('/',async (req,res)=>{
try{
    const loans=await Loans.findAll();
  if(loans){
    return res.status(200).send(loans);

  }
 return  res.status(200).send("no loans");
}
catch(err){
    res.status(400).send({message: err.message});
}
  
  
})

router.put('/:id', async (req, res) => {
  try{
    const id=req.params.id;
    const loan=req.body;
    const response= await updateloanById(id,loan);

    res.status(200).send(response)
    
  }
  catch(err){
    res.status(400).send({message:err.message});
  }
})


router.delete('/delete/:id', async (req, res) => {
    try{
        const id=req.params.id;
        const loan=await deleteLoanById(id);
        res.status(200).send(loan);
    }
    catch (err) {
        res.status(400).send({message: err.message});
    }
})

module.exports= router;