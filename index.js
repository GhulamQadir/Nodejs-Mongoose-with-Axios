const express = require('express');
const bd = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();
const bcrypt = require('bcryptjs')
const port = 4001;
let authModel = require('./authSchema');
const ey = require('./')
const dotenv = require("dotenv");
dotenv.config({ path: "./nodeman.env" });


app.use(cors());

app.use(bd.urlencoded({
    extended: false
}))

app.use(bd.json())


mongoose.connect(process.env.url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("Database Connected!")
})

mongoose.connection.on("error", () => {
    console.log("Database not connected :(")
},


app.get('/', (req, res) => {
    res.send("<center><h1>My first API created</h1></center>")
}),

app.post('/signup', async(req, res) => {


var checkUser = await authModel.findOne({email: req.body.email})
if(checkUser){
  res.status(200).send({result: checkUser, message: "Email already registered"})
}else{
    // res.send({message: "Yes you can signup"})
    var hashPass = await bcrypt.hash(req.body.password, 12)
    // res.send({pass: hashPass})


       let userCreate = new authModel({
        email: req.body.email, password: hashPass
    })
    userCreate.save()
    .then((response) => {
        // console.log(response, "response sucesss")
        res.status(200).send({result: response, message: "User signed up successfully"})
    })
    .catch((err) => {
        // console.log(err, "err")
        res.status(400).send({result: err.message, message: "your data not successfully stores"})

    })
}
}),

app.post('/signin', async(req, res) => {

    var checkUser = await authModel.findOne({email: req.body.email})
    if(checkUser){
        var checkPass = await bcrypt.compare(req.body.password, checkUser.password);

        if(checkPass){
            res.status(200).send({message: "You are logged in successfully"})
        }
        else{
            res.status(403).send({message: "Yor password is incorrect"})

        }

    }else{
        res.status(403).send({message: "No user is registered with this email"})

    }
}),

app.listen(port, () => {
    console.log("Server is running!")
}
))