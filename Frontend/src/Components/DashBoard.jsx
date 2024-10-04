import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
const DashBoard = () => {
  const [users , setusers] = useState([])
  const [count ,setcount] = useState(0)
  const [clicked,setclicked] = useState(false)

  // useEffect(()=>{
  //   axios.get('http://localhost:8000/api/v1/users/getAllEmployees')
  //   .then((response)=>{
  //   setusers(response.data);
  //   setcount(users.length)
  // })
  //   .catch((error)=>console.log(error))
  // },[])

  return (
    <>
    <div className='w-full h-screen relative flex justify-center items-center'>
        <div className={`${clicked ? 'blur-xl':null} w-fit h-fit border border-gray-500 rounded-xl px-2`}>
           <div>
            <div className='flex justify-around items-center border-b border-gray-500 py-4'>
              <h1 className='text-xl font-medium '>Home</h1>
              <h1 className='text-xl font-medium '>Employee List</h1>
            </div>
            <div className='flex  justify-end items-center gap-10 border-b border-gray-500 py-2'>
              {
                users && (<h1 className='text-xl font-Roboto font-medium'>Total Count: {count}</h1>)
              }
              <button className='w-fit h-fit bg-fuchsia-600 text-white hover:bg-white px-3 py-2 rounded-lg transition-all hover:text-fuchsia-700 hover:border hover:border-fuchsia-700' onClick={()=>setclicked(prev=>!prev)}>
                CreateEmployee 
              </button>
            </div>

            <div>

            </div>
           </div>
          <div className='flex justify-center items-center'>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center'>
              <label>Unique Id</label>
            {
              users.map((user)=>{
                <li className="w-10 h-8 ">{user._id}</li>
              })
            }
            </div>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center'>
              <label >Image</label>
              {
                users.map((user)=>{
                  <li className="w-10 h-8 ">{user.Image}</li>
                })
              }
            </div>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center'>
              <label >Name</label>
              {
                users.map((user)=>{
                  <li className="w-10 h-8 ">{user.Name}</li>
                })
              }
            </div>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center'>
              <label >Email</label>
              {
                users.map((user)=>{
                  <li className="w-10 h-8 ">{user.Email}</li>
                })
              }
            </div>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center'>
              <label >Mobile No.</label>
              {
                users.map((user)=>{
                  <li className="w-10 h-8 ">{user.Mobile}</li>
                })
              }
            </div>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center'>
              <label >Designation</label>
              {
                users.map((user)=>{
                  <li className="w-10 h-8 ">{user.Designation}</li>
                })
              }
            </div>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center'>
              <label >Gender</label>
              {
                users.map((user)=>{
                  <li className="w-10 h-8 ">{user.Gender}</li>
                })
              }
            </div>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center'>
              <label >Course</label>
              {
                users.map((user)=>{
                  <li className="w-10 h-8 ">{user.Course}</li>
                })
              }
            </div>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center'>
              <label >Created At</label>
              {
                users.map((user)=>{
                  <li  className="w-10 h-8 ">{user.createdAt}</li>
                })
              }
            </div>
            
          </div>
        </div>

       { clicked&&
       <div className='absolute bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10'>
          <form className='px-6 py-4 border-2 border-gray-400 rounded-xl gap-8'>

<div className='flex sm:flex-row flex-col justify-center items-center w-fit h-fit '>

            <div className='flex flex-col gap-4 items-center'>
            <div className='flex gap-4 justify-center items-center'>
            <label htmlFor="Name" className='text-md font-Roboto font-medium '>Name :</label>
            <input type="text" name='Name'  className='outline-none px-3 py-2 rounded-lg w-30 border' placeholder='Name'/>
            </div>

            <div className='flex gap-4 justify-center items-center'>
            <label htmlFor="Name" className='text-md font-Roboto font-medium '>Email :</label>
            <input type="text" name='Email' className='outline-none px-3 py-2 rounded-lg w-30 border' placeholder='Email' />
            </div>

            <div className='flex gap-4 justify-center items-center'>
            <label htmlFor="Name" className='text-md font-Roboto font-medium '>Mobile No. :</label>
            <input type="text" name='Mobile' className='outline-none px-3 py-2 rounded-lg w-30 border' placeholder='Mobile no.' />
            </div>


            <div className='flex  gap-10 justify-center items-center'>
            <label htmlFor="Name" className='text-md font-Roboto font-medium '>Designation : </label>
            <select name="Designation" className='w-28 border border-gray-400 rounded-lg px-3 py-2' id="Designation">
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select> 
            </div>
            </div>
            <div className='flex flex-col justify-start items-start gap-4 ml-8'>
              <div className='flex flex-col gap-2'>
              <label htmlFor="Male"   className='text-md font-Roboto font-medium text-xl'>Gender</label>
              <div >
               <label  htmlFor="Male"  className='text-md font-Roboto font-medium '>Male : </label>
              <input type="radio" name='Male' />
              </div>
              <div>
               <label htmlFor="Male"  className='text-md font-Roboto font-medium '>Female : </label>
              <input type="radio" name='Male' />
              </div>
              </div>

              <div className='flex  gap-10 justify-center items-center'>
            <label htmlFor="Name" className='text-md font-Roboto font-medium '>Course : </label>
            <select name="Designation" className='w-28 border border-gray-400 rounded-lg px-3 py-2' id="Designation">
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
              <option value="BSC">BSC</option>
            </select> 
            </div>

            <div>
              <label htmlFor="Image"  className='text-md font-Roboto font-medium '>Upload Image : </label>
              <input type="file" name='Image' />
            </div>
              
            </div>
           
</div>
<button
 className='w-full mt-4 h-fit bg-fuchsia-600 text-white hover:bg-white px-3 py-2 rounded-lg transition-all hover:text-fuchsia-700 hover:border hover:border-fuchsia-700'
 >Submit</button>
 
          </form>
        </div>}
    </div>
    </>
  )
}

export default DashBoard