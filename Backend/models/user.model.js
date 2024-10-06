import mongoose,{Schema} from 'mongoose';

const UserSchema = new Schema({
    UserName:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true,
    }
},{timestamps:true})

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
     {
         _id : this._id,
        UserName : this.UserName,
     },
     process.env.ACCESS_TOKEN_SECRET,
     {
         expiresIn : process.env.ACCESS_TOKEN_EXPIRY
     }
    )
 }
 UserSchema.methods.generateRefreshToken =function (){
     return jwt.sign(
         {
             _id : this._id,
            
         },
         process.env.REFRESH_TOKEN_SECRET,
         {
             expiresIn : process.env.REFRESH_TOKEN_EXPIRY
         }
        )
 }

export const User = mongoose.model("user",UserSchema)