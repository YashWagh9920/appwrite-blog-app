import React,{useId} from 'react'

function Select({options, label,className= "",...props},ref) {
    const id = useId()
  return (
    <div className='w-full'>
      {label && <label className='text-sm text-gray-600' htmlFor={id}></label>}
      <select 
      ref={ref}
      className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      id = {id}
      {...props}
      >
        {options?.map((option)=><option key={option} value={option}>{option}</option>)}
      </select>

    </div>
  )
}

export default React.forwardRef(Select)
