const {STRING,TEXT,UUID,UUIDV4,INTEGER,DATE,Model}=require("sequelize");

const {sequelize}=require('../database');
const book={
    id:{
        type: UUID,
        primaryKey:true,
        default: UUIDV4
    },
    title:{
        type: STRING,
        allowNull: false
    },
    authorname:{
        type: STRING,
        allowNull:false
    },
    description:{
        type: STRING,
        allowNull: true
    },
    isbn:{
        type: INTEGER,
        allowNull:false
    },
    edition:{
        type: STRING,
        allowNull: true
    },
    genre:{
        type: STRING,
        allowNull:true
    },
    num_of_pages:{
        type: INTEGER,
        default:1
    }
};

class Books extends Model{};
Books.init(book,{
    sequelize,
    modelName: "books",
    timestamps: "true",
});

sequelize.sync(Books);
console.log(Books===sequelize.models.books);
module.exports={Books};
