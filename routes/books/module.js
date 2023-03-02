const {Books}=require("../../models/models");
const {createBookSchema}= require("../../utils/validations");
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


async function getBookById(id=1){
try{
    const book= await Books.findOne({where:{id:id}});
    if(book){
        return book;
    }
    else{
        return "book not found";
    }
}
catch(err){
    throw new Error(err);
}
}
async function getBookByGenre(genre="fiction"){
    try{
        const books= await Books.findAll({Where:{genre:genre}});;
        if(books){
            return books;
        }
        else{
            return "books not found";
        }
    }
    catch(err){
        throw new Error(err);
    }
    }

    async function getBookByAuthor(Author){
        try{
            const books= await Books.findAll({Where:{authorname:Author}});
            if(books){
                return books;
            }
            else{
                return "books not found";
            }
        }
        catch(err){
            throw new Error(err);
        }
        }


 async function deleteBook(id=1){
    try{
        const book=await Books.findByPk(id);
        if(book){
            await book.destroy();
            return {message: "book deleted"}
        }
        else{
            return "book not found";
        }
    }
catch(err){
        throw new Error(err);
}
 }

 async function sortbooks(){
    const books=await getBooks();
    const orderbook=books.sort((a,b)=>(a.id-b.id));
    console.log(orderbook);
    return orderbook;
 }
module.exports = {
    createBook,
    getBookByAuthor,
    getBookByGenre,
    getBookById,
    deleteBook
}