const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const cors = require('cors')
require('dotenv').config()

mongoose.connect(process.env.connectID,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Connection error', error));
app = express()

app.use(cors({
    credentials:true,
    origin:['http://localhost:8000']
}))

app.use(express.json())

app.use('/api',routes)


app.listen(8000)