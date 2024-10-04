import mongoose  from "mongoose";

const dbConnect =()=>{
    try {
        mongoose.connect('mongodb+srv://SatyamRaj:Satyam123@cluster0.zwfdxin.mongodb.net/DealsDray')
        console.log("DataBase Connected Successfully");
    } catch (error) {
        console.log("Error In DB Connection");
    } 
}

export {dbConnect}