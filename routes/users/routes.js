const express=require('express');
const router=express.Router();

const {createUser,getUserByUsername,updateUserByUsername,deleteUserById}=require('./module');
const {Users}=require("../../models/models")

router.post('/',async function(req, res){
   
    const user=req.body;
    const response=await createUser(user);
    res.status(201).send(response);
});

router.get('/',async (req,res)=>{
    try{
        const users=await Users.findAll() ||"no users found";
        res.status(200).send(users);
    
    }
    catch(err){
        res.status(400).send({message: err.message});
    }
})
router.get('/:username', async (req,res)=>{
    try{
        const user=await getUserByUsername(req.params.username);
        console.log(req.params.username);
        res.status(200).send(user);
    }
    catch(err){
        res.status(400).send({message: err.message});
    }
});

router.put('/:username', async (req,res)=>{
    try{
        const id=req.params.username;
        const response=await updateUserByUsername(id,req.params.body);
        res.status(200).send(response);  
    }
    catch(err){
        res.status(400).send({message:err.message});
    }
});
router.delete('/:id/delete', async (req,res )=>{
       try{
        const user_id = req.params.id;
        const response=await deleteUserById(user_id);
        
        res.status(200).send(response);
       }
       catch(err){
        res.status(400).send({message:err.message});
       }
});

module.exports =router;