import UserModel from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;

        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409)
                .json({ message: "user already exists , you can login", success: false });
        }
        const userModel = new UserModel({ name, email, password, role, phone });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        res.status(201)
        .json({
            message : "Signup Successfull",
            success : true
        })

    } catch (error) {
        res.status(500)
        .json({
            message : "Signup failed",
            success : false
        })    
    }
}


const login = async (req, res) => {
    try {
        const { email, password, phone } = req.body;
        if(!email && !phone){
            return res.status(403)
            .json({
                message : "Either email or phone is req." ,
                success : false
            })
        }

        const user = await UserModel.findOne(email ? {email} : {phone});
        
        if(!user){
            return res.status(403)
            .json({
                message : "email not found" ,
                success : false
            })
        }
        const isPassEqual  = await bcrypt.compare(password , user.password);

        if(!isPassEqual){
            return res.status(403)
            .json({
                message : "invalid credentials" ,
                success : false
            })
        }

        const jwtToken = jwt.sign(
            {email : user.email , _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(200)
        .json({
            message : "login Successfull",
            success : true,
            jwtToken,
            email,
            name : user.name
        })

    } catch (error) {
        res.status(500)
        .json({
            message : "login failed",
            success : false
        })    
    }
}


export { signup, login  };