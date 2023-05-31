const express = require('express');
const router =express.Router()

const userController = require("../Controller/userController")
const articleController = require("../Controller/articleController")
const auth = require("../middleware/authentication")

router.post('/signup',userController.createUser)
router.post('/login',userController.loginUser)
router.post('/users/:userId/articles',auth.authentication,auth.authorisation,articleController.createArticle)
router.get('/articles',auth.authentication,articleController.getArticles)
router.put('/users/:userId',auth.authentication,auth.authorisation,userController.updateUser)





module.exports = router