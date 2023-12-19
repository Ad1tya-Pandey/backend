const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const FootballModel=require('./dbConnection')
const cors = require('cors'); // Import the cors middleware


// const url = "mongodb+srv://aditya:4321%40Aditya@cluster0.0kgsv.mongodb.net/demostats"



const app = express()
app.use(bodyParser.json());

app.use(cors());


// mongoose.connect(url,{useNewUrlParser:true})
// const con = mongoose.connection
// con.on('open', function(){
//     console.log('connected')

// })

// this will forward all the requests coming to football
const footballrouter= require("./routes/football")
 app.use('/football',footballrouter)


 const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the actual URL of your React app
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));
  

app.listen(9000,()=>{
    console.log("server running on port 9000")
})
