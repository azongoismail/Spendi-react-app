import React from 'react'

const Balance = ({balance}) => {
  return (
    <div className='bg-[#2BA3EC] w-[50vw] h-[50vh] my-4 p-4 flex items-start justify-center'>
      <p className='text-2xl '>Balance: <span className='bg-[#EBFCFF] py-2 px-4 text-2xl justify-start w-[50vw]'>${balance}</span> </p>
    </div>
  )
}

export default Balance
