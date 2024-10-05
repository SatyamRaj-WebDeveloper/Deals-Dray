import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { IoMdCloseCircleOutline } from "react-icons/io";

const DashBoard = () => {
  const [users , setusers] = useState([])
  const [count ,setcount] = useState(0)
  const [clicked,setclicked] = useState(false)
  const [gender ,setgender] = useState('')
  const[editclicked,seteditclicked] = useState(false)
  const [userId,setuserId] = useState('')

  const createEmployee = (e)=>{
       e.preventDefault()
       const formdata = new FormData()
       formdata.append('Name', e.target[0].value )
       formdata.append('Email' , e.target[1].value)
       formdata.append('Mobile' , e.target[2].value)
       formdata.append('Designation' ,e.target[3].value)
       formdata.append('Gender' , gender)
       formdata.append('Course', e.target[6].value)
       formdata.append('Image', e.target[7].files[0])

       axios.post('http://localhost:8000/api/v1/users/createEmployee' ,formdata)
       .then(response => {
         console.log(response.data)
         setclicked(false)
         getUsers()
      })
       .catch((error) =>console.log(error))
      
     
  }

  const deleteUser=(e,userId)=>{
    e.preventDefault()
      console.log(userId)
      axios.post(`http://localhost:8000/api/v1/users/deleteUser/${userId}`)
      .then(response=>console.log(response))
      .catch(error =>console.log(error.message))
      getUsers()
  }

  const editUser=(e)=>{
    e.preventDefault()
    console.log(e)
    console.log(userId)
    const formdata = new FormData()
    formdata.append('Name',e.target[0].value)
    formdata.append('Email',e.target[1].value)
    formdata.append('Mobile',e.target[2].value)
    formdata.append('Designation',e.target[3].value)
    formdata.append('Gender',gender)
    formdata.append('Course',e.target[6].value)
    formdata.append('Image',e.target[7].files[0])
    axios.post(`http://localhost:8000/api/v1/users/edituser/${userId}`,formdata)
    .then(()=>{
      seteditclicked(false)
      getUsers()
    })
    .catch(error=>console.log(error.message))
    
  }

  const getUsers =()=>{
    axios.get('http://localhost:8000/api/v1/users/getAllEmployees')
    .then((response)=>{
      const data = response.data.data;
    setusers(data)
    setcount(data.length)
  })
  .catch((error)=>console.log(error))
  }
   
  useEffect(()=>{
    getUsers()
},[])


  return (
    <>
    <div className='w-screen h-screen relative flex justify-center items-center bg-gray-200'>
        <div className={`${clicked ? 'blur-lg':null}  ${editclicked ? 'blur-lg':null} w-fit h-fit border border-gray-500 rounded-xl px-2 shadow-lg bg-white`}>
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
          <div className='sm:flex sm:flex-row  justify-center items-center'>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center  '>
              <label className='text-lg font-Roboto font-medium underline'>Unique Id</label>
              {
              users.map((user)=>
                <li className=" text-sm list-none mt-14 text-black" key={user._id}>{user._id}</li>
              )
            }
           
            </div>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center gap-2 '>
              <label className='text-lg font-Roboto font-medium underline'>Image</label>
              {
                users.map((user)=>
                  <img src={user.Image} alt="user's Image "  key={user._id} className='w-10 h-10 mt-8 rounded-full'/>
                )
              }
            </div>
            <div className='flex flex-col h-auto w-40 px-3 py-2 justify-center items-center  '>
              <label className='text-lg font-Roboto font-medium underline'>Name</label>
              {
                users.map((user)=>
                  <li className=" list-none mt-14" key={user._id}>{user.Name}</li>
                )
              }
            </div>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center  '>
              <label className='text-lg font-Roboto font-medium underline'>Email</label>
              {
                users.map((user)=>
                  <li className=" list-none mt-14" key={user._id}>{user.Email}</li>
                )
              }
            </div>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center '>
              <label className='text-lg font-Roboto font-medium underline'>Mobile No.</label>
              {
                users.map((user)=>
                  <li className=" list-none mt-14"  key={user._id}>{user.Mobile}</li>
                )
              }
            </div>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center  '>
              <label className='text-lg font-Roboto font-medium underline'>Designation</label>
              {
                users.map((user)=>
                  <li className=" list-none mt-14" key={user._id}>{user.Designation}</li>
                )
              }
            </div>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center  '>
              <label className='text-lg font-Roboto font-medium underline'>Gender</label>
              {
                users.map((user)=>
                  <li className=" list-none mt-14" key={user._id}>{user.Gender}</li>
                )
              }
            </div>
            <div className='flex flex-col  px-3 py-2 justify-center items-center  '>
              <label className='text-lg font-Roboto font-medium underline' >Course</label>
              {
                users.map((user)=>
                  <li className=" list-none mt-14" key={user._id}>{user.Course}</li>
                )
              }
            </div>
            <div className='flex flex-col h-fit w-fit px-3 py-2 justify-center items-center'>
              <label className='text-lg font-Roboto font-medium underline'>Created At</label>
              {
               users.map((user) => {
                     const createdAt = new Date(user.createdAt).toString().split('T')[0]; 
                         return (
                    <li className="list-none mt-14" key={user._id}>
                      {createdAt}
                       </li>
                     );
               })
                 }
            </div>
            <div className='flex flex-col h-fit w-fit px-3  justify-center items-center' >
              <label className='text-lg font-Roboto font-medium underline'>Actions</label>
              {
                users.map((user)=>(
                   
                    <div className=' flex gap-4 mt-12' key={user._id}>
                    <button   className='mt-4 cursor-pointer hover:text-blue-500 hover:underline font-light' onClick={(e)=>deleteUser(e,user._id)} >Delete</button>
                    <button  className='mt-4 cursor-pointer hover:text-blue-500 hover:underline font-light' onClick={()=>{
                      setuserId(user._id)
                      seteditclicked(prev=>!prev)}} >Edit</button>
                    </div>
                  
                ) )}
            </div>
            
          </div>
        </div>





       {
        editclicked && <div className='absolute bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 rounded-xl'>
          <form onSubmit={editUser} className='px-6 py-4 border-2 border-gray-400 rounded-xl gap-8' method='POST' encType='multipart/form-data'>

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
              <input type="radio" value='Male'  onChange={(e)=>setgender(e.target.value)} name='gender' />
              </div>
              <div>
               <label htmlFor="Male"  className='text-md font-Roboto font-medium '>Female : </label>
              <input type="radio" value='Female' onChange={(e)=>setgender(e.target.value)} name='gender' />
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
              <label htmlFor="Image"  className='text-md font-Roboto font-medium ' >Upload Image : </label>
              <input type="file" name='Image' />
            </div>
            </div>
             </div>
             <button className='w-full mt-4 h-fit bg-fuchsia-600 text-white hover:bg-white px-3 py-2 rounded-lg transition-all hover:text-fuchsia-700 hover:border hover:border-fuchsia-700' type='Submit'>Update</button>
          <IoMdCloseCircleOutline className='absolute top-6 right-4 sm:right-10  text-xl ' title='Close' onClick={()=>seteditclicked(false)}/>
          </form>
        </div>
       }



       { clicked&&
       <div className='absolute bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 rounded-xl'>
          <form onSubmit={createEmployee} className='px-6 py-4 border-2 border-gray-400 rounded-xl gap-8' method='POST' encType='multipart/form-data'>

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
              <input type="radio" value='Male'  onChange={(e)=>setgender(e.target.value)} name='gender' />
              </div>
              <div>
               <label htmlFor="Male"  className='text-md font-Roboto font-medium '>Female : </label>
              <input type="radio" value='Female' onChange={(e)=>setgender(e.target.value)} name='gender' />
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
              <label htmlFor="Image"  className='text-md font-Roboto font-medium ' >Upload Image : </label>
              <input type="file" name='Image' />
            </div> 
            </div>
            </div>
              <button className='w-full mt-4 h-fit bg-fuchsia-600 text-white hover:bg-white px-3 py-2 rounded-lg transition-all hover:text-fuchsia-700 hover:border hover:border-fuchsia-700'>Submit</button>
            <IoMdCloseCircleOutline className='absolute top-6 right-4 sm:right-10  text-xl ' title='Close' onClick={()=>setclicked(false)}/>
          </form>
        </div>}
    </div>
    </>
  )
}

export default DashBoard