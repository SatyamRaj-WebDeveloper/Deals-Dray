import  { useState } from 'react'
import React from 'react'
import { CiUser } from "react-icons/ci";
import { IoMdKey } from "react-icons/io";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [clicked,setclicked] = useState('Password')
    const navigate = useNavigate()

    const LoginUser =(e)=>{
        e.preventDefault();
        const formData = {
            UserName : e.target[0].value,
            Password : e.target[1].value,
        }
         axios.post('http://localhost:8000/api/v1/users/loginUser',formData)
        .then((response)=>console.log(response.data))
        .catch((error)=>console.log("ERROR :: fetching data" , error))
        navigate('/Dashboard')
    }
  return (
    <>
   <div className='flex items-center w-full h-screen justify-center'>
        <div className='bg-gray-100 w-auto sm:h-80 h-[420px] rounded-xl shadow-lg border border-gray-500 flex sm:flex-row flex-col'>
            <div className='sm:w-[50%] w-full h-40 sm:h-full bg-green-600 text-white sm:rounded-tl-xl sm:rounded-bl-xl rounded-tr-xl rounded-tl-xl flex justify-center items-center flex-col '>
                <h1 className='text-2xl font-bold font-Roboto '>Login</h1>
                <p className='text-lg mx-4'> Login to Your Account</p>
            </div>
            <div className='mt-10'>
                <form onSubmit={LoginUser} method='Post'>
                    <div className=' flex flex-col justify-center items-center w-fit h-fit px-3 py-2'>
                        <label htmlFor="UserName" className='text-lg font-medium '>UserName</label>
                        <div className='flex gap-2 items-center justify-center w-[245px] h-fit bg-white px-2 rounded-xl '>
                        <CiUser  className='text-xl font-medium'/>
                        <input type="text" name='UserName' placeholder='UserName' className=' py-2 outline-none ' />
                        </div>
                    </div>
                    <div className=' flex flex-col justify-center items-center w-fit h-fit px-3 py-2'>
                        <label htmlFor="UserName" className='text-lg font-medium '>Password</label>
                        <div className='flex gap-2 items-center justify-center w-fit h-fit bg-white px-2 rounded-xl '>
                        <IoMdKey  className='text-xl font-medium'/>
                        <input type={clicked} placeholder='Password' className=' py-2 outline-none ' name='Password'/>
                        {clicked === "Password"?<FaEye onClick={()=>setclicked('text')}/> :<FaEyeSlash onClick={()=>{setclicked('Password')}}/>
 }
                        </div>
                    </div>
                    <p className='ml-4'>Already have an Account? <NavLink to='/' className='text-blue-500 hover:underline transition-all cursor-pointer'>SignUp</NavLink></p>
                    <div className='flex justify-center items-center h-fit w-full'>
                    <button className='w-[80%] h-8 text-white bg-green-400 rounded-xl mt-8 hover:bg-white hover:text-green-600 hover:border hover:border-green-600 transition-all mb-4 font-medium' type='Submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login