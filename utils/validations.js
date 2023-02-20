
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

module.exports={
    createBookSchema
}