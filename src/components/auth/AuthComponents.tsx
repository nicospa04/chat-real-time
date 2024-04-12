"use client"

import { useCallback, useEffect, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { InputComp } from "../ui/InputComp"
import { ButtonComp } from "../ui/ButtonComp"
import { AuthSocialButton } from "./AuthSocialButton"
import { BsGithub, BsGoogle } from "react-icons/bs"
import axios from "axios"
import toast from "react-hot-toast"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

type Varient = 'LOGIN' | 'REGISTER'


export const AuthComponents = () => {
  
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if(session?.status === 'authenticated'){
      router.push('users')
    }
  }, [session?.status,router])

  const [variant,setVariant] = useState<Varient>('LOGIN')
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState('')
  const [registerCompleted,setRegisterCompleted] = useState(false)

  const toggleVarient = useCallback(() => {
    setVariant(variant === 'LOGIN' ? 'REGISTER' : 'LOGIN')
  }, [variant])


  const {register,handleSubmit,formState: {
    errors
  }} = useForm<FieldValues>({
    defaultValues:{
      name:'',
      email:'',
      password:'',
    }
  });

  const onSubmit =  async (data:FieldValues) => {
    setIsLoading(true)
    setError('')
    if(variant === 'REGISTER'){
     const response =  await axios.post('/api/register',data)
      .then(() => signIn('credentials', data))
     .catch(() => toast.error('Something went wrong'))
     .finally(() => setIsLoading(false))
      
     if(response === 'Account created successfully') setRegisterCompleted(true)


     
    }

    if(variant === 'LOGIN'){
      console.log(data)
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {

        if(callback?.error){
          toast.error(callback.error)
        }

        if(callback?.ok){
         toast.success('Logged in successfully')
         router.push('/users')
        }
        setIsLoading(false)
        
      })
    }
}


const socialAction = (action:string) => {
  setIsLoading(true)

  signIn(action, {
    redirect: false
  })
  .then((callback) => {
    console.log(callback)
    if(callback?.error){
      toast.error('Invalid Credentials')
    }

    if(callback?.ok) {
      toast.success('Logged in successfully')
    }
  })
  .finally(() => setIsLoading(false))
}

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">

        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
              
              {
                variant === 'LOGIN' && ( 
                  <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <InputComp label="Email" register={register} id="email" type="email" errors={errors}/>
                    <InputComp label="Password" register={register} id="password" type="password" errors={errors}/>
                    <ButtonComp fullWidth type="submit" disabled={isLoading}>
                      {variant === 'LOGIN' ? 'Sign In' : 'Register'} </ButtonComp>
                      <p className="text-red-500 w-full flex justify-center">{error}</p>
                  </form>
                )
              }

              {
                variant === 'REGISTER' && ( 
                  <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <InputComp label="Name" register={register} id="name" errors={errors}/>
                    <InputComp label="Email" register={register} id="email" type="email" errors={errors}/>
                    <InputComp label="Password" register={register} id="password" type="password" errors={errors}/>
                    <ButtonComp fullWidth type="submit" disabled={isLoading} checked={registerCompleted}>
                      {variant === 'REGISTER' ? 'Register' : 'Sign In'} </ButtonComp>
                      <p className="text-red-500 w-full flex justify-center">{error}</p>
                  </form>
                )
              }

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"/>

                  </div>

                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div> 
                </div>

                <div className="mt-6 flex gap-2">
                      <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')}/>
                      <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')}/>
                      

                </div>



              </div>

              <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                      {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'} 
                    </div>

                    <div onClick={toggleVarient} className="underline cursor-pointer">
                      {variant === 'LOGIN' ? 'Create an account' : 'Sign In'}
                    </div>
              </div>

        </div>



    </div>
  )
}
