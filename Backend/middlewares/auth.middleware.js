import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'

const verifyToken = async(req,_,next)=>{
    try {
        const token = req.header('Authorization').replace("Bearer" , " ");
        if(!token){
            return res.status(404).json({message:"Invalid Token"})
        }
        const decodedToken = await jwt.verify(token,ACCESS_TOKEN_SECRET)
        if(!decodedToken){
            return res.status(400).json({message:"Token could not be decoded"})
        }
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
         )
         if(!user){
            throw new ApiError(401 , "Invalid Access Token")
         }
         req.user = user;
         next();
    } catch (error) {
        return res.status(404).json({message:"VerifyToken :: function did not work"})
    }
}

export {verifyToken}