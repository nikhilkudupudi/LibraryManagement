const express = require("express");
const yaml = require("yamljs");

const swaggerUi = require("swagger-ui-express");
require('dotenv').config({path: __dirname + '/.env'});
console.log(__dirname);
const app = express();

app.use(express.json());


const swaggerDocument = yaml.load("apidoc.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (_req, res) => {
  res
    .status(200)
    .send(
      `Hello from Library Management service!. To visit api docs visit <a href="./api-docs/">here</a>`
    );
});
app.use("/books",require("./routes/books/routes"));
app.use("/loans",require("./routes/loans/routes"));
app.use("/users",require("./routes/users/routes"));


//const test=connectToDB(app);

// Path: app.js

module.exports=app;
