const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const foodPatnerModel = require('../models/foodpartner.model')

async function registerUser (req,res){
    const {fullName, email, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        email
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            massage:"User alredy exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
           fullName,
           email,
           password:hash
    })

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message:"registerd succesfilly",
        user:{
            id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })
}

async function loginUser(req,res){
 const { email, password } = req.body
 const user = await userModel.findOne({
    email
 })

 if(!user){
    return res.status(400).json({
        message:"Invalid email or password"
    })
 }

 const isPasswordValid = await bcrypt.compare(password, user.password)

 if(!isPasswordValid){
    return res.status(400).json({
        message:"Invalid email or password"
    })
 }

 const token = jwt.sign({
    id:user._id
 }, process.env.JWT_SECRET)


res.cookie("token", token)
 res.status(200).json({
    message:"user logged in successfully",
    user:{
        id:user._id,
        email:user.email,
        fullName:user.Fullname
    }
})
}

async function logoutUser(req,res){
    res.clearCookie(200).json({
   message:"user loggout successfully"
    })

}

async function registerFoodPartner(req,res){
    const {name, email, password} = req.body

    const isAccountAlreadyExists = await foodPatnerModel.findOne({
        email
    })

    if(isAccountAlreadyExists){
        return res.status(400).json({
            message:"user already exists"
        })
    }
 const hashpassword = await bcrypt.hash(password, 10)
    const foodPatner = await foodPatnerModel.create({
        name,
        email,
        password:hashpassword
    })
    
    const token = jwt.sign({
        id:registerFoodPartner._id,

    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message:"food patner created successfuly",
        footPatner:{
            _id:foodPatner._id,
            email:foodPatner.email,
            name:foodPatner.name
        }
    })
}

async function loginFoodPatner(req,res){
    const { email, password} = req.body

   const foodPartner = await foodPatnerModel.findOne({
    email
   })

   if(!foodPartner){
    return res.status(400).json({
        message:"Invalid email or password"
    })
   }

   const isPasswordValid = await bcrypt.compare(password, foodPartner.password)

   if(!isPasswordValid){
    return res.status(400).json({
        message:"Invalid eamil or password"
    })
   }
 const token = jwt.sign({
    id:foodPartner._id
 }, process.env.JWT_SECRET)
   

   res.cookie("token", token)

   res.status(200).json({
   message:"food patner logged in successfully",
   foodPartner:{
    _id:foodPartner._id,
    name:foodPartner.name,
    email:foodPartner.email
   }
   })
}

async function logoutFoodpatner(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"food patner logged out successfully"
    })
}

module.exports ={
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPatner,
    logoutFoodpatner
}