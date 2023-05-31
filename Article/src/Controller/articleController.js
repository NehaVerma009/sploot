const mongoose = require('mongoose')
const articleModel = require('../model/articleModel')
const userModel = require('../model/userModel')
const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
  }

const createArticle = async function(req, res){
    try{
        let data = req.body;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Body should not be empty" });
     }

     let {userId, title, description} = data

     if(!userId)
     return res.status(400).send({status: false, message:"Provide UserId"})

     if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "Please enter a valid  user Id" })

     if(!title)
     return res.status(400).send({status: false,message:"Provide title"})

     if(!description)
     return res.status(400).send({status: false, message: "Give Brief Description"})

     let checkUser = await userModel.findOne({_id:userId})
    if(!checkUser){
        return res.status(400).send({status: false, message:" User Does not exist with given ID" })
    }   


    let createProduct = await articleModel.create(data)
    return res.status(201).send({status: true, message: "Article Created Successfully", data: createProduct})

    
    }
    catch(error){
          res.status(500).send({status: false, message:error.message})
    }
}



//*******************************Get All Article *************************/


let getArticles = async function (req, res) {
    try {
        let query = req.query
        
        let checkDelete = { isDeleted: false } 
        //let objArr = ["userId", "title", "isDeleted"]

       
        // if (!Object.keys(query).every(elem => objArr.includes(elem)))
        // return res.status(400).send({ status: false, message: "wrong query parameters present" });

        // if (query.userId) 
        //     if (!mongoose.Types.ObjectId.isValid(query.userId)) {
        //         return res.status(400).send({ status: false, message: "Invalid userId" })
        //     }
        //     checkDelete.userId = query.userId


        //     if (query.title||query.title==0) {
        //         if(query.title.trim().length==0){
        //             return res.status(400).send({ status: false, message: " Please give value in Param" }) 
        //         }
        //         checkDelete.title= query.title
        //     }


           


        let getProducts =  await articleModel.find(checkDelete)
        if (getProducts.length == 0) {
            return res.status(404).send({ status: false, message: "No Article Found with given filter " })
        }

                
        return res.status(200).send({ status: true,message:"Articles list", data: getProducts })
    } 


    catch(error){
        res.status(500).send({status: false, message:error.message})
    }
}


module.exports.createArticle = createArticle
module.exports.getArticles = getArticles