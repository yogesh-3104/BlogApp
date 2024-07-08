import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Button,Input} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'
import {login as storeLogin} from '../store/authSlice'
function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit} =useForm()
    const [error, setError] = useState()

    const login=async(data)=>{
        setError("")
        try {
            const session=await authService.login(data)
            if(session){
                const userData=await authService.getCurrentUser()
                if(userData){
                    dispatch(storeLogin(data))
                }
                navigate('/')
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className='inline-block w-full max-w-[100px]'>
                    <div className="w-full">Logo</div>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>
                Sign in to your account
            </h2>
            {error && <p className='text-red-600 mt-8 text-center'>
            {error}
            </p>}
            <form onSubmit={handleSubmit(login)}>
                <div className="space-y-5">
                    <Input label="Email" placeholder="Enter the Email" type="email"
                    {...register("email",{
                        required:true,
                        validate:{
                            matchPattern:(value)=>
                              /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || 
                             "Email address must be a valid address", 
                        }
                    })} />
                    <Input type="password" label="password" placeholder="Enter your password"
                    {...register("password",{
                        required:true
                    })}/>
                    <Button type='submit' className="w-full">Sign in</Button>
                </div>
            </form>
            
        </div>
    </div>
  )
}

export default Login
