import React from 'react'

const Balance = ({balance, totalExpenses}) => {
  return (
    <div className='bg-[#2BA3EC] w-[50vw] h-[50vh] my-4 p-4 mx-auto flex flex-col items-start justify-start gap-[30px] shadow-lg rounded-2xl'>
      <p className='text-2xl '>Balance: <span className='bg-[#EBFCFF] py-2 px-4 text-2xl justify-start w-[50vw]'>${balance}</span> </p>
      <p className='text-2xl my-6'>Total Expenses: <span className='bg-[#EBFCFF] py-2 px-4 -6 text-2xl justify-start w-[50vw]'>${totalExpenses}</span> </p>
    </div>
  )
}

export default Balance
