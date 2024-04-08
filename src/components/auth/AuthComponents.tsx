"use client"

import { useCallback, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { InputComp } from "../ui/InputComp"
import { ButtonComp } from "../ui/ButtonComp"
import { AuthSocialButton } from "./AuthSocialButton"
import { BsGithub, BsGoogle } from "react-icons/bs"


type Varient = 'LOGIN' | 'REGISTER'


export const AuthComponents = () => {
  
  const [variant,setVariant] = useState<Varient>('LOGIN')
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState('')

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

  const onSubmit = (data:FieldValues) => {
    setIsLoading(true)
    setError('')
    if(variant === 'REGISTER'){
      
    }

    if(variant === 'LOGIN'){

    }
}


const socialAction = (action:string) => {
  setIsLoading(true)
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
                  </form>
                )
              }

              {
                variant === 'REGISTER' && ( 
                  <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <InputComp label="Name" register={register} id="name" errors={errors}/>
                    <InputComp label="Email" register={register} id="email" type="email" errors={errors}/>
                    <InputComp label="Password" register={register} id="password" type="password" errors={errors}/>
                    <ButtonComp fullWidth type="submit" disabled={isLoading}>
                      {variant === 'REGISTER' ? 'Register' : 'Sign In'} </ButtonComp>
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
