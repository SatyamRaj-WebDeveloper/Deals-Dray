import mongoose,{Schema} from 'mongoose';

const empSchema = new Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique : true
    },
    Mobile:{
        type:String,
        required:true,
        unique:true
    },
    Designation:{
        type:String,
        enum:['HR' , 'Manager' , 'Sales'],
        required:true,
    },
    Gender:{
        type:String,
        enum:['Male' , 'Female'],
        required:true,
    },
    Course:{
        type:String,
        enum:['MCA' ,'BCA' ,'BSC'],
        required:true,
    },
    Image:{
        type:String,
        required:true
    }
},{timestamps:true})

export const employee = mongoose.model('employee',empSchema);

