
// const books={
// id:0,
// title:	"",
// authorname:	"",
// description:	"",
// isbn:	0,
// edition:	"",
// genre:	[],
// num_of_pages:	0,
// date:	""
// }

const mongoose=require('mongoose');
const {randomUUID}= require('crypto');
const book=new mongoose.Schema({
    _id:{
        type: string,
        default: randomUUID
    },
    title:{
        type: string,
    },
    authorname:{
        type: string
    },
    description:{
        type: string
    },
    isbn:{
        type: 0,
        required: true
    },
    edition:{
        type: string
    },
    genre:{
        type: string
    }
},{collection: "Books"})
module.exports=mongoose.model('Books',book);
