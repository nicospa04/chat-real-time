
import clsx from "clsx"


interface Props{
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
    checked?: boolean;
}

export const ButtonComp = ({checked = false, type = 'button', fullWidth,children,onClick,secondary,danger,disabled=false} : Props) => {
  return (

    <button 
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={clsx('flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',{
            'opacity-50 cursor-default' : disabled,
            'w-full': fullWidth,
            'text-gray-900' : secondary,
            'text-white' : !secondary,
            'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600' : danger,
            'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600': !secondary && !danger,
            'bg-green-500':checked
        })}    
    >
        {children}
    </button>



  )
}
