const foodPartnerModel = require('../models/foodpartner.model')
const jwt = require("jsonwebtoken")

async function authFoodPartnerMiddleware(req,res,next){
  const token = req.cookies.token

  if(!token){
   return res.status(401).json({
        message:"Please login fierst"
    })

   
  }

   try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    const foodParter = await foodPartnerModel.findById(decoded.id)

    req.foodParter = foodParter
       
     next()


       }catch(error){

       return  res.status(401).json({
            message:"Invalid token"
         })
     }

  

  



   
}   


module.exports = {
    authFoodPartnerMiddleware
}