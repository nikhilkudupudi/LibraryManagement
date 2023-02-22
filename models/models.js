const {STRING,TEXT,UUID,UUIDV4,INTEGER,DATE,Model,ENUM,DataTypes}=require("sequelize");

const {sequelize}=require('../database');
const book={
    id:{
        type: UUID,
        primaryKey:true,
        defaultValue: UUIDV4
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
        defaultValue:1
    }
};

const  loans={
    id:{
        type: UUID,
        primaryKey:true,
        defaultValue: UUIDV4
    },
    username: {
        type: STRING,
        allowNull: false
    },
    bookid:{
        type: INTEGER,
        allowNull: false
    },
   title:{
    type: STRING,
    allowNull: false
   },
   date:{
    type: STRING,
    allowNull: false,
    
   },
   period:{
    type: INTEGER,
    allowNull: false,
    defaultValue: 1
   },
   isActive:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
   }
}
class Loans extends Model{};
Loans.init(loans,{
    sequelize,
    modelName: "loans",
    timestamps: "true",
});
sequelize.sync(Loans);
const users={
    id:{
        type: UUID,
        primaryKey:true,
        defaultValue: UUIDV4
    },
    username:{
        type: STRING,
        unique: true,
        allowNull: false
    },
    firstName:{
        type: STRING,
        allowNull: false
    },
    lastName:{
        type: STRING,
        allowNull: false
    },
    email:{
        type: STRING,
        allowNull: false
    },
    role:{
        type: ENUM({
            values:["student","staff","admin"]
        }),
        allowNull: false,
        
    },
    address:{
        type: STRING,
        allowNull: false
    },
    password:{
        type: STRING,
        allowNull: false
    },
    phone:{
        type: STRING,
        allowNull: false
    },
    loans:{
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
        defaultValue: null
        
    }
}



class Books extends Model{};
Books.init(book,{
    sequelize,
    modelName: "books",
    timestamps: "true",
});
class Users extends Model{};

Users.init(users,{
    sequelize,
    modelName: "users",
    timestamps: "true",
});



// Users.hasMany(Loans,{
//     foreignKey:"id",
//     onDelete:"CASCADE"
// });

sequelize.sync(Books);
sequelize.sync(Users);

console.log("models");
module.exports={Books,Users,Loans};
