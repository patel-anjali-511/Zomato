const express = require('express')
const authController = require('../controllers/auth.controller')
const router = express.Router()

//user auth apis
router.post("/user/register", authController.registerUser)
router.get("/user/login", authController.loginUser)
router.get('/user/logout', authController.logoutUser)

//foodpatner auth apis
router.post('/food-patner/register', authController.registerFoodPartner)
router.get('/food-patner/login', authController.loginFoodPatner)
router.get('/food-patner/logout', authController.logoutUser)
module.exports = router