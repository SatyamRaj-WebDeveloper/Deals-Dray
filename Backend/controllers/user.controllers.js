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
        
        const existEmail = await employee.findOne({Email});
        const image_url = await uploadOnCloudinary(Image)
        if(!image_url){
            return res.status(400).json({message:"Invalid File Format"});
        }
        // typeof Mobile === Number ? null : console.log("Invalid Mobile Number")
        if(validator.isEmail(Email)){
            console.log("valid Email")
        }else{
            return res.status(400).json({message:"Invalid Email"})
        }
         if(existEmail){
             return res.status(400).json({message:"User Already Exist"})
        }
        const emp = new employee({
            Name ,
            Email,
            Mobile,
            Gender,
            Course,
            Designation,
            Image: image_url.url,
        })
        await emp.save();

        if(!emp){
            return res.status(400).json({message:"Employee was not cretaed"})
        }else{
            return res.status(201).json({message:"Employee Created Successfully" , data:emp})
        }
    } catch (error) {
        return res.status(400).json({message:"Create Employee :: Function did not work" , error:{error}})
    }
}

const getAllEmployee = async(req,res)=>{
    try {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        let skip = (page - 1) * limit ;
        const employees = await employee.find().skip(skip).limit(limit)

         if(!employees || employees.length === 0){
            return res.status(404).json({message:"No employees found"})
        }
        const totalEmployees = await employee.countDocuments();

        return res.status(200).json({message:"Fetched Users Successfully" , data:employees , currentPage : page , totalPages: Math.ceil(totalEmployees / limit), totalEmployees })
    } catch (error) {
        return res.status(400).json({message:"Error fetching users",error})
    }
}

const deleteUser = async(req,res)=>{
    const userId = req.params.userId;
    console.log(userId)
    try {
        if(!userId){
            return res.status(400).json({message:"Invalid User Id"})
        }
        const users = await employee.findOneAndDelete({_id:userId})
        console.log(users)

        if(!users){
            return res.status(404).json({message:"no user Found to delete"})
        }else{
            return res.status(200).json({message:"User Deleted Successfully" , data:users})
        }
       
    } catch (error) {
        return res.status(400).json({message:"DeleteUser :: Function Did not work"})
    }
}

const editUser = async(req,res)=>{
    const userId = req.params.userId;
    const Image = req.file?.path
    const {Name,Email, Mobile, Gender , Course, Designation} = req.body;
    console.log(userId)
    console.log(Name,Email, Mobile, Gender , Course, Designation)
    try {
        if(!Name||!Email|| !Mobile|| !Gender || !Course|| !Designation || !Image){
            return res.status(400).json({message:"All Fields are Required"});
        }
        const existEmail = await employee.findOne({Email});
        const image_url = await uploadOnCloudinary(Image)

        if(!image_url){
            console.log("UploadOnCloudinary from user Controller :: Did Not work");
        }
        // typeof Mobile === Number ? null : console.log("Invalid Mobile Number")
        if(validator.isEmail(Email)){
            console.log("valid Email")
        }else if(!existEmail){
             return res.status(400).json({message:"User Not found , Invalid Email"})
        }
        const user = await employee.findOneAndUpdate(
            {_id:userId},
            {
                Name,
                Email,
                Mobile,
                Gender,
                Course,
                Designation,
                Image:image_url.url
            }
        )
        await user.save()
        if(!user){
            return res.status(400).json({message:"Employee was not Edited"})
        }else{
            return res.status(201).json({message:"Employee Edited Successfully" , data:user})
        }
    } catch (error) {
        return res.status(400).json({message:"Edit User :: Function did not work" , error:{error}})
    }
}




export {
    registerUser,
    loginUser,
    creatEmployee,
    getAllEmployee,
    deleteUser,
    editUser,
}