const foodModel = require("../models/food.model")



async function createFood(req,res){

console.log(req.foodParter)
console.log(req.body)
console.log(req.file)
res.send("food item created succsessfully")
}

module.exports={

    createFood
}