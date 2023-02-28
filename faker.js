
const faker=require('faker');
function create_fake_Books(){
    const books=[];

    for(let i=0;i<10;i++){
        books.push({
            id: faker.datatype.uuid(),
            title: faker.lorem.words(),
            authorname: faker.name.findName(),
            description: faker.lorem.sentence(),
            isbn: faker.datatype.number(),
            edition: faker.helpers.arrayElement(['First', 'Second', 'Third']),
            genre: faker.helpers.arrayElement(['Fiction', 'Non-fiction', 'Mystery', 'Thriller']),
            num_of_pages: faker.datatype.number({ min: 50, max: 500 }),
            createdAt: faker.date.between(),
            updatedAt: faker.date.between()
        })
    }
    console.log(books);
    return books;


}
function create_fake_Loans() {
    const loans=[];
    for(let i=0;i<10;i++){
        loans.push({
            id: faker.datatype.uuid(),
          username: faker.internet.userName(),
          bookid: faker.datatype.uuid(),
          title:faker.lorem.words(),
          date: faker.date.between(),
          period: faker.date.number({min: 1,max: 10}),
          isActive:faker.random.boolean(),
          createdAt: faker.date.between(),
          updatedAt: faker.date.between()
            
        })
    }
    return loans;
}

function create_fake_Users(){
    const users=[];
    
    for(let i=0;i<10;i++){
        users.push({
            id: faker.datatype.uuid()+1,
            username: faker.internet.userName(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            role: faker.helpers.arrayElement(['student','staff','admin']),
            address: faker.address.streetAddress(),
            password: faker.internet.password(),
            phone: faker.phone.phoneNumber(),
            loans: faker.datatype.array([{
                id: faker.datatype.uuid(),
            },{
                id: faker.datatype.uuid(),
            }]),
            createdAt: faker.date.between(),
            updatedAt: faker.date.between()
        })
    }
    return users;
}

module.exports={
    create_fake_Books,
    create_fake_Loans,
    create_fake_Users
}