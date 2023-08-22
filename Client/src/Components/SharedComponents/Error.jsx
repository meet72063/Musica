import React from 'react'


const Error = ({error='something went wrong'}) => {
  return (<>
  <div className="flex rounded mt-2 mb-2 h-7  text-red-600 justify-start space-x-2"  role="alert">
    <h2 className='font-semibold pl-2 '>{error}</h2>
</div>
    
  </>

  )
}

export default Error
