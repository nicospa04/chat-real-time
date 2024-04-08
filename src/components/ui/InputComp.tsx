"use client"

import clsx from "clsx"
import { FieldErrors,FieldValues,UseFormRegister } from "react-hook-form"


interface Props {
    label:string
    id:string
    type?:string
    required?:boolean
    register:UseFormRegister<FieldValues>
    errors:FieldErrors
    disabled?:boolean
}

export const InputComp = ({label,id,type = 'text' ,required = true ,register,errors,disabled = false}:Props) => {
  return (

        <div>

            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            
            <div className="mt-2">
                <input 
                id={id}
                type={type}
                required={required}
                autoComplete={id}
                disabled = {disabled}
                {...register(id, { required: true })}
                className={clsx('form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6', {
                    'focus:ring-rose-500': errors[id],
                    'opacity-50 cursor-default': disabled
                })}
                /> 
    
            </div>
        </div>

    )
}
