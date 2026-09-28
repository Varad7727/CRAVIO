const foodPartnerModel = require("../models/foodpartner.model")
const userModel=require("../models/user.model")
const jwt = require("jsonwebtoken")

const authFoodPartnerMiddleware = async (req, res, next) => {
    //check token
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({
            message: "No Partner Found!!",
            status: "failed"
        })
    }  
    try {
        //verify token
        //foodpartner can only access this so tht token should be verified
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //find partner
        const foodPartner = await foodPartnerModel.findById(decoded.id)
        req.foodPartner = foodPartner
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token Found!!",
            status: "failed"
        })
    }
}

//authenticate the legit user

const authUserMiddleware=async(req, res, next)=>{
    //findout token
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
             message: "Please login first"
        })
    }

    try{const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const user=await userModel.findById(decoded.id)
    req.user=user
    next()
    }catch(error){
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports={authFoodPartnerMiddleware,
    authUserMiddleware
}