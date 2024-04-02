require('dotenv').config({ path: '../.env' });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const routerFile = require("./app");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error-middleware");

app.use(cors());

app.use(express.json());

app.use(routerFile)

///****global error middleware to handle error */
app.use(errorMiddleware);


const server = app.listen(PORT, () => {
  console.log(`Node server is running on port http://localhost:5000`);
});
