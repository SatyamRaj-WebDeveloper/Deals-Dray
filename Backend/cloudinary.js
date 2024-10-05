import {v2 as cloudinary} from 'cloudinary';
import path from 'path';
import fs from 'fs'

cloudinary.config({
    cloud_name : 'ddtzeeazz' ,
    api_key : '344626612553335'  ,
    api_secret : 'P557-6uWGWtjMXn99_BD3WU4A_U',
})

const uploadOnCloudinary = async(FilePath)=>{
    try {
        
        if(!FilePath) return null ;
        
        const extname = path.extname(FilePath).toLowerCase();
        if (extname !== '.jpg' && extname !== '.jpeg' && extname !== '.png') {
            fs.unlinkSync(FilePath); 
            console.log("Invalid file format. Please upload JPG or PNG files only.");
            return null;
        }
        const response = await cloudinary.uploader.upload(FilePath , {
            resource_type :'image',
            allowed_formats: ['jpg', 'jpeg', 'png'],
        })
        fs.unlinkSync(FilePath);
        return response
    } catch (error) {
        if(fs.existsSync(FilePath))
            fs.unlinkSync(FilePath)
        console.log("File Could Not Be Uploaded" ,error.message)
        return null
    }
}

export {uploadOnCloudinary}