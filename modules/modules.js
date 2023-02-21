const {Books}=require("../models/models");

const {createBookSchema,createLoansScheme,createUserSchema}=require("../utils/validations");

async function createBook(book){
    try{
        
        const validateBook= await createBookSchema.validateAsync(book);
        const newBook=await Books.create(validateBook);
        console.log(newBook);
        return newBook;
    }
    catch(err){
        throw new Error(err);
    }
}

async function createUser(user){
try{
    const validateUser= await createUserSchema.validateAsync(user);
    const newUser=await Users.create(validateUser);
    console.log(newUser);
    return newUser;
}
catch (err) {
    throw new Error(err);
}
}

async function createLoan(loan){
    try{
        const validateLoan= await createLoansScheme.validateAsync(loan);
        const newLoan=await Loans.create(validateLoan);
        console.log(newLoan);
        return newLoan;
    }
    catch(err){
        throw new Error(err);
    }
}

module.exports={
    createBook,
    createLoan,
    createUser
};