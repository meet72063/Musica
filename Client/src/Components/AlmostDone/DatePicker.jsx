import React from 'react'

const DatePicker = () => {
    const handleChange = (e)=>{
        
    }
  return (
 <div>
      
<div className="relative max-w-lg">
  <input datepicker datepicker-title="Choose DOB" type="date" className="w-60 bg-gray-50 border border-gray-300 text-base  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" onChange={handleChange} />
</div>

 </div>
  )
}

export default DatePicker
