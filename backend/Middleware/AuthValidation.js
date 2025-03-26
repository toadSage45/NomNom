import Joi from "joi";


const signupValidation = (req , res , next) => {
    const schema = Joi.object({
        name : Joi.string().min(3).max(50).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(5).max(50).required(),
        role:Joi.string().valid("customer" , "owner").required(),
        phone:Joi.string().min(10).max(12).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message : "Bad Request" , error})
    }
    next();
}


const loginValidation = (req , res , next) => {
    const schema = Joi.object({
        email:Joi.string().email(),
        password:Joi.string().min(5).max(50).required(),
        phone:Joi.string().min(10).max(12)
    }).or("email" , "phone");

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message : "Bad Request" , error})
    }
    next();

}

export {signupValidation , loginValidation};