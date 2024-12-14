const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')

mongoose.connect('mongdb://localhost/node_auth',{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>{
    console.log('connected')
})
app = express()

app.get('/',(req,res)=>{
    res.send('Hello')
})


app.listen(8000)