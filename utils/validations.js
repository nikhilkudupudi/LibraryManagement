
const joi=require('joi');

const createBookSchema=joi.object({
    
    title: joi.string().required(),
    authorname: joi.string().optional(),
    isbn: joi.number().integer().required(),
    genre: joi.string().optional(),
    description: joi.string().optional(),
    num_of_pages: joi.number().integer().optional(),
    edition: joi.string().optional(),
    date: joi.date().optional(),
})

const createUserSchema=joi.object({
    id: joi.optional(),
    username: joi.string().required(),
    firstName: joi.string().optional(),
    lastName: joi.string().optional(),
    password: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string().optional(),
    address: joi.string().optional(),
    role: joi.string().optional(),
    loans: joi.optional(),

});
const createLoansScheme=joi.object({
    id:joi.optional(),
   username: joi.string().required(),
   bookid: joi.number().integer().required(),
   title: joi.string().optional(),
   date: joi.string().optional(),
   period: joi.number().required(),
    isActive: joi.boolean().optional(),

})

module.exports={
    createBookSchema,
    createUserSchema,
    createLoansScheme
}