'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/router'


export default  function Profilepage() {
  const router = useRouter()
  const [data,setData] =useState("nothing")

  const getUserDetails =async ()=>{
    try {
      const res = await axios.get('/api/users/me')
      console.log(res.data);
      
      setData(res.data._id)
    } catch (error:any) {
      console.log(error)
    }

    
  }
  const logout = async ()=>{
    try {
      const res = await axios.get('/api/users/logout')
      toast.success("Logged out success")
      console.log(res.data);
      router.push('/login')
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  return (
    <div className='flex flex-col items-center
    justify-center min-h-screen py-2'>
      <h1 className='text-4xl'>Profile</h1>
      <hr />
      <h2>{data ==="nothing"?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />

      <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={logout}>
        Logout
      </button>
      
      
    </div>
  )
}

