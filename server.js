const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const url = "mongodb+srv://aditya:4321%40Aditya@cluster0.0kgsv.mongodb.net/demostats"



const app = express()
app.use(bodyParser.json());



mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection
con.on('open', function(){
    console.log('connected')

})

// this will forward all the requests coming to football
const footballrouter= require("./routes/football")
 app.use('/football',footballrouter)

app.listen(9000,()=>{
    console.log("server running on port 9000")
})
