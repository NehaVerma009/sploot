
const userModel = require('../model/userModel')
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken')




//===================== Authenticate  ===========================================//



const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) return res.status(400).send({ status: false, message: "Token required" })

        // console.log(token)

        jwt.verify(token, "user-secret-key", (error, decodedToken) => {
            if (error) {
                return res.
                status(401).
                send({ status: false, message: "token is invalid"} );

            }
            req["decodedToken"] = decodedToken    //this line for we can access this token outside the middleware

            // console.log(decodedToken )

            next()

        });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


//========================================================Authorisation==============================================================

const authorisation = async function(req , res , next){
    try {
        
        let userId = req.params.userId
        let user = req.decodedToken.userId

        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({status : false , message : "Invalid id!!!"})

        let presentUser = await userModel.findById(userId)
        if(!presentUser) return res.status(404).send({status: false, message :"User not present in db!!!!"})

        if(userId != user) return res.status(403).send({status: false , message : "Unauthorised Access!!"})

        next()
    } catch (error) {
        return res.status(500).send({status: false , message : error.message})
    }
}



module.exports.authentication=authentication
module.exports.authorisation=authorisation

