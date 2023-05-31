const mongoose = require("mongoose");
const userModel = require('../model/userModel')
const {isEmail,isValidPassword, isValidString} = require('../Validator/userValidator')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");


const createUser = async function(req, res){
    try{
    
        let data = req.body
        if (Object.keys(data).length == 0) {
            return   res.status(400).send({ status: false, message: "Body should not be empty" });
            }
    
       
            let { fname, lname, email, password, age } = data
    
            //let securePassword = await bcrypt.hash(password, 10); //......salt used.....
    
        if (!fname)
          return res.status(400).send({ status: false, message: "fname is Mandatory!!" });
    
        if (!lname)
          return res.status(400).send({ status: false, message: "lname is Mandatory!!" });
    
        //===========================Email==============================================
    
        if (!email)
          return res.status(400).send({ status: false, message: "email is required" });
        if (!isEmail(email))
          return res.status(400).send({ status: false, message: "email is not valid" });
    
        let UniqueEmail = await userModel.findOne({ email: email });
        if (UniqueEmail)
          return res.status(409).send({ status: false, message: "Email already Exists" });
    
        const emailLower = email.toLowerCase();
    
        //===========================  password ================================================================
    
        if (!password)
          return res.status(400).send({ status: false, message: "password is required" });
        if (!isValidPassword(password))
          return res.status(400).send({ status: false, message: "The password must contain an uppercase, a lowercase, a numeric value, a special character and the limit is from 8 to 15 characters." });
    
         //>>>>>>>>>>>>password encryption>>>>>>>>>>>>>>>>//
         
         const salt = await bcrypt.genSalt(10);
         const encryptedPassword = await bcrypt.hash(password, salt);
    
    
          if(!age)
          return res.status(400).send({status:false, message:"Age is required"})
    
          let userData = {
            fname:fname,
            lname:lname,
            email:emailLower,
            password:encryptedPassword,
            age:age
          }
    
          let user = await userModel.create(data)
          return res.status(201).send({status: true, message: "User Created Successfully", data: userData})
    
    
    }
    catch(error){
        res.status(500).send({status: false, message:error.message})
    
    }
    }






//****************************Login**************************** */

const loginUser = async function (req, res) {
    try {
      const body = req.body;
      if (Object.keys(body).length == 0)
        return res.status(400).send({ status: false, message: "Please provide Email ID and password for login" });

      const { email, password } = body;

      if (!email)
        return res.status(400).send({ status: false, message: "Email is mandatory" });

      if (!isEmail(email))
        return res.status(400).send({ status: false, message: "Invalid email, ex.- ( abc123@gmail.com )" });

    if (!password)
      return res.status(400).send({ status: false, message: "Please provide the password!!" });

    let checkUser = await userModel.findOne({ email: email });

    if (!checkUser) {
      return res.status(401).send({ status: false, message: "Please Register User" });
    }

    let checkPassword = await bcrypt.compare(password, checkUser.password);
    if (checkPassword)
      return res.status(400).send({ status: false, message: "Enter correct Password" });

    let createToken = jwt.sign(
      {
        userId: checkUser._id.toString()
      },
      "user-secret-key", { expiresIn: "5 hr" }
    );

    return res.status(201).send({ status: true, message: "User login successfull", data: { userId: checkUser._id, token: createToken } });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};



//********************updateUser********************************** */

const updateUser = async function(req, res){
    try{
        let data = req.body;
        let userId = req.params.userId;

        let { fname, lname, age} = data


        if (Object.keys(data).length == 0)
    return res.status(400).send({ status: false, message: "Please provide some data for updating the profile!!" });

  if (fname) {
    if (isValidString(fname)) {
      return res.status(400).send({ status: false, message: "fname should be valid" });
    }
  }

  if (lname) {
    if (isValidString(lname)) {
      return res.status(400).send({ status: false, message: "lname is not valid" });
    }
  }

  if (age) {
    if (isValidString(age)) {
      return res.status(400).send({ status: false, message: "Age is not valid" });
    }
  }

  let update = await userModel.findByIdAndUpdate({ _id: userId }, data, { new: true });

  res.status(200).send({ status: true, message: "Update user profile is successful", data: update });
}


    catch(error){
        return res.status(500).send(error.message)
    }

}


module.exports.createUser = createUser
module.exports.loginUser = loginUser
module.exports.updateUser = updateUser