const express = require('express')
const route = require('./route/route')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect("mongodb+srv://NehaVerma009:A9CEHRbpunBJ90to@cluster0.r6xdcuv.mongodb.net/Sploot", {
    useNewUrlParser: true
})
.then(()=> console.log("MongoDB is connected"))
.catch(err => console.log(err))

app.use('/api', route);

app.use(function(req, res){
    return res.status(400).send({status: false, message: "Path Not Found"})
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express app running on Port " + (process.env.PORT || 3000))
})

