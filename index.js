const app = require("./app");
const {connectToDB}=require("./database");

const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

async function start() {
  await connectToDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

start();

