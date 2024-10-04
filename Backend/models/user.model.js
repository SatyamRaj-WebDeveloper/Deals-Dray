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

export const User = mongoose.model("user",UserSchema)