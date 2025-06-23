const express = require("express");

const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv").config();

const cors = require("cors");
const routes = require("./routes");
const { invalidJsonHandler, catchAlleError } = require("./middleware/invalidJsonHandler");

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.json());




// port
const port = process.env.PORT || 5000;

// mongoose
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MONGODB connected successfully");

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

app.use("/api", routes);

//  Handle JSON parsing errors
app.use(invalidJsonHandler);
app.use(catchAlleError);
