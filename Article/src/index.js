const express = require('express')
const route = require('./route/route')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect("mongodb+srv://bakeroo:bakeroo1210@cluster0.eop92uq.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then(()=> console.log("MongoDB is connected"))
.catch(err => console.log(err))

