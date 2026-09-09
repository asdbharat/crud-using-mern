// server la start karna
// db la connect karna

const app = require("./src/app")
require('dotenv').config()
const connectToDB = require("./src/config/database")

connectToDB()

app.listen(3000, ()=>{
    console.log("server is running ")
})