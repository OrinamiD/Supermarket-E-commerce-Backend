

const express = require("express")

const mongoose = require("mongoose")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const dotenv = require("dotenv").config()

const cors = require("cors")
const routes = require("./routes")





const app = express()

app.use(express.json())

app.use(cors())

app.use(express.json());

//  Handle JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next();
});


// port
const port = process.env.PORT || 5000;


// mongoose
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("MONGOD connect successfully")

    app.listen(port, ()=>{
        console.log(`Server running on port ${port}`)
    })
})



app.use("/api", routes)
