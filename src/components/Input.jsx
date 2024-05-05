import React,{useId} from 'react'
 
const Input =React.forwardRef( function Input({ 
    lable,
    type="text",
    className="",
    ...props
},ref){
    const id =useId()
    return (
        <div className=''w-full>
            {lable && <lable className='inline-block mb-1 pl-1' 
            htmlFor={id}>{lable}</lable>}
            <input 
            type={text} 
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className} `}
            ref={ref}  //this will pass the input field state mean input feild content 
            id={id}
            />
        </div>
    )
})

export default input
