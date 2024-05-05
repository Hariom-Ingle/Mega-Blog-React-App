import React, { Children } from 'react'

function Button(
    children,    //children is nothing but a text inside the button
    type='button',
    bgColor='bg-blue-600',
    textColor='text-white',
    className='',
    ...props
)
{
  return (
    <button 
    className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`} {...props}
    >
        {children}
    </button>
  )
}

export default Button
