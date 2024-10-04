import {User} from '../models/user.model.js';
import {employee} from '../models/employee.model.js'
import { uploadOnCloudinary } from '../cloudinary.js';
import validator from 'validator';
import bcrypt from 'bcrypt';




const registerUser = async(req,res)=>{
    const {UserName,Password}=req.body;
   
    try {
        if(!UserName || !Password){
            return res.status(404).json({message:" Username or Password are required"})
        }
        const hashedPassword =await  bcrypt.hash(Password ,10)
        const newuser = new User({
            UserName,
            Password:hashedPassword,
        })
        await newuser.save();
        if(!newuser){
            console.log("New User Was not created")
        }else{
            return res.status(201).json({message:"User was Created Successfully" , data:newuser})
        }
    } catch (error) {
        return res.status(400).json({message:"RegisterUser :: Function did not work"})
    }
}

const loginUser = async(req,res)=>{
    const {UserName ,Password}=req.body;
    try {
        if(!UserName || !Password){
            return res.status(400).json({message:"Invalid Credentials, Both Fields are required"})
        }
        const user = await User.findOne({UserName});
        const validPassword = await bcrypt.compare(Password , user.Password)
        if(!user){
            return res.status(404).json({message:"Invlaid UserName, User Not Found"})
        }else if(!validPassword){
            return res.status(404).json({message:"Invalid Password"})
        }
            return res.status(200).json({message:"User Was Found" , data:user})
    } catch (error) {
        return res.status(400).json({message:"LoginUser :: Function did not work"})
    }
}

const creatEmployee = async(req,res)=>{
    const {Name,Email, Mobile, Gender , Course, Designation} = req.body;
    const Image = req.file?.path;
    try {
        if(!Name||!Email|| !Mobile|| !Gender || !Course|| !Designation || !Image){
            return res.status(400).json({message:"All Fields are Required"});
        }
        const existEmail = await employee.findOne(Email);
        const image_url = await uploadOnCloudinary(Image)
        if(!image_url){
            console.log("UploadOnCloudinary from user Controller :: Did Not work");
        }
        typeof Mobile === Number ? null : console.log("Invalid Mobile Number")
        if(validator.isEmail(Email)){
            console.log("valid Email")
        }else if(existEmail){
             return res.status(400).json({message:"User Already Exist"})
        }else{
            return res.status(400).json({message:"Invalid Email"})
        }
        const emp = new employee({
            Name ,
            Email,
            Mobile,
            Gender,
            Course,
            Designation,
            Image: image_url,
        })
        await emp.save();
        if(!emp){
            return res.status(400).json({message:"Employee was not cretaed"})
        }else{
            return res.status(201).json({message:"Employee Created Successfully" , data:{emp}})
        }
    } catch (error) {
        return res.status(400).json({message:"Create Employee :: Function did not work" , error:{error}})
    }
}

const getAllEmployee = async(req,res)=>{
    try {
        const employees = await employee.find()
        if(!employees){
            return res.status(404).json({message:"No employees found"})
        }
        return res.status(200).json({message:"Fetched Users Successfully" , data:employees})
    } catch (error) {
        return res.status(400).json({message:"Error fetching users",error})
    }
}

export {
    registerUser,
    loginUser,
    creatEmployee,
    getAllEmployee
}