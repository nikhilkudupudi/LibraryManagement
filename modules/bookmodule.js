const {Books}=require("../models/models");

const {createBookSchema}=require("../utils/validations");

async function createBook(book){
    try{
        
        const validateBook= await createBookSchema.validateAsync(book);
        const newBook=await Books.create(validateBook);
        
        return newBook;
    }
    catch(err){
        throw new Error(err);
    }
}

module.exports={
    createBook,
    
};