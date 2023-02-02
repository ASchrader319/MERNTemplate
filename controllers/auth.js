import bcrpyt from "bcrypt";
import _ from "lodash";
import User from "../models/user.js";
import registerValidator from "../validators/register.js";
import loginValidator from "../validators/login.js";
import configs from "../configs/index.js";
const dbSecretFields = configs.dbSecretFields;


export default {
    register : async(req,res)=>{
        const validationResult = registerValidator(req.body);
        if(validationResult !== true){
            return res.status(400).json({message: validationResult});
        }
        const hashedPassword = await bcrpyt.hash(req.body.password, 12);
        const user = await User.create({...req.body,password: hashedPassword})

        req.session.userId = user.id;

        return res.status(201)
        .json({
            message: "you are registered successfully", 
            user: _.omit(user.toObject(), dbSecretFields),
        });
    },

    login : async (req,res)=>{
        const validationResult = loginValidator(req.body);
        if(validationResult !== true){
            return res.status(400).json({message: validationResult});
        }

        const user = await User.findOne({username: req.body.username});
        if(!user){
            return res.status(404).json({message: "username does not exist."});
        }

        const isPasswordCorrect = await bcrpyt.compare(req.body.password, user.password);

        if(!isPasswordCorrect){
            return res.status(401).json({message: "password incorrect"});
        }
        req.session.userId = user.id; 

        res.json({message: "you are successfully logged in."});
    },

    logout : (req,res)=> {
        delete req.session.userId;
        return res.json({message: "you have logged out"});
    },

    loginRequired : async (req,res,next ) => {
        if(!req.session || !req.session.userId){
            return res.status(403).json({message: "You must login to access this"});
        }
        req.user = await User.findById(req.session.userId);
        if(!req.user){
            return res.status(403).json({message: "this user id does not exist"});
        }
        next();
    },

    profile : (req,res)=> {
        res.json({user: _.omit(req.user.toObject(),dbSecretFields)});
    }

}