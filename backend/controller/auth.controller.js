const userModel = require("../models/user.model")
const foodPartnerModel = require("../models/foodpartner.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
//--------------------USER----------------------

//register
const registerUser = async (req, res) => {
    //retrieve info
    const { email, fullName, password } = req.body
    //check if email exist
    const isExist = await userModel.findOne({
        email: email
    })
    if (isExist) {
        return res.status(400).json({
            message: "User exist",
            status: "failed"
        })
    }
    //hash pass
    const hashedPassword = await bcrypt.hash(password, 10)
    //create user
    const user = await userModel.create({
        email, fullName, password: hashedPassword
    })
    //sign jwt
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    )
    //store in cookie
    res.cookie("token", token)
    //send success
    return res.status(201).json({
        message: "User registered successfully",
        email: user.email,
        status: "success",
        token: token
    })
}

//login
const loginUser = async (req, res) => {
    //retrieve info\
    const { email, password } = req.body

    //find user
    const user = await userModel.findOne({ email: email }).select("+password")
    //no email user
    if (!user) {
        res.status(401).json({
            message: "INVALID EMAIL OR PASSWORD!!",
            status: "fail"
        })
    }

    //compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        res.status(401).json({
            message: "INVALID EMAIL OR PASSWORD!!",
            status: "fail"
        })
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    )
    res.cookie("token", token)

    res.status(200).json({
        message: "LOGIN SUCCESSFULL!!",
        user: {
            _id: user._id,
            email: user.email,
            fullNname: user.fullName
        },
        token
    })
}

//logout
const logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}

//--------------FOOD-PARTNER------------------------

//register
const registerFoodPartner = async (req, res) => {
    //info
    const { name, email, password, phone, address, contactName } = req.body

    //already exist
    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email: email
    })

    if (isAccountAlreadyExists) {
        return res.status(400).json({
            message: "Food partner account already exists"
        })
    }

    //hash pass
    const hashedPassword = await bcrypt.hash(password, 10);
    //create user
    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        contactName
    })
    //sign token
    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET, { expiresIn: "3d" })
    res.cookie("token",token)
    return res.status(201).json({
        message: "Partner registered successfully",
           email: foodPartner.email,

        status: "success",
        token: token
    })

}

//login
const loginFoodPartner=async (req,res)=>{
    const {email,password}=req.body

    //available already or not
    const foodPartner=await foodPartnerModel.findOne({
        email:email
    })
    if(!foodPartner){
         return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    //check passwrd
    const validPassword=await bcrypt.compare(password,foodPartner.password)
     if(!validPassword){
         return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    //sign token
    const token=jwt.sign({id:foodPartner._id},process.env.JWT_SECRET)
    res.cookie("token",token)

      res.status(200).json({
        message: "Food partner logged in successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })

}

//logout
   const logoutFoodPartner=(req, res)=> {
    res.clearCookie("token");
    res.status(200).json({
        message: "Food partner logged out successfully"
    });
}
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}