import React, { useEffect } from 'react'
import { useState } from 'react';
import { FaTrash } from "react-icons/fa6";
import Balance from './Balance';



const Income = () => {
    const [income, setIncome] = useState()
    const [totalIncome, setTotalIncome] = useState('')
    const [balance, setBalance] = useState('')
    const [ list, SetList] = useState([]);
    const [ amount, setAmount] = useState('')
    const [ item, setItem] = useState ('')


    useEffect(()=>{
      const numericTotalIncome = parseFloat(totalIncome);
      if (!isNaN(numericTotalIncome)) {
     setBalance(numericTotalIncome.toString());
   }

    }, [totalIncome]) 

    const handleChange = (e) => {
          setIncome(
          e.target.value
      )
    }

   
    const handleIncomeSubmit = (event) =>{
        event.preventDefault();
        console.log('hello');

        const totalIncome = income;
        setTotalIncome(totalIncome);
        console.log(totalIncome)
        setIncome('');
    }

    
    const handleExpensesSubmit = (event) => {
        event.preventDefault();
        const newItem = {
          id: Date.now(),
          name: item.trim(),
          amount: parseInt(amount, 10)
        }

        SetList((item) => (
           [...item, newItem]
        ));
        setAmount('')
        setItem('')
 
 const numericCurrentBalance = parseFloat(balance);
 const numericAmount = parseFloat(amount);

 if (isNaN(numericCurrentBalance) || isNaN(numericAmount) || numericAmount <= 0) {
  console.error("Invalid current balance or expense amount.");
  return;
}

const newRunningBalance = numericCurrentBalance - numericAmount;
setBalance(newRunningBalance.toString());

    
    }


   
   
  const deleteItem = (item) =>{
     const filteredItems = list.filter((list) => list.id !== item.id);
     SetList(filteredItems);
     const deletedAmount = parseFloat(item.amount);
     const newbalance = parseFloat(balance) + deletedAmount;
     setBalance(newbalance.toString());
  }


  return (
    <div class= "bg-[#EFEDCE] h-[100vh] flex justify-start items-center flex-col">
      <p>Income:<span>${totalIncome}</span></p>
      <form action="" onSubmit={handleIncomeSubmit}>
        <input value={income} type="text" onChange={handleChange} class="bg-white p-3 mr-2" />
        <button class="p-3 text-5xl">+</button>
      </form>
      <h2>Expenses</h2>
      <form action="" onSubmit={handleExpensesSubmit}>
        <input type="text" value={item} class=" bg-white p-3 mr-3" placeholder='item' onChange={(e) => setItem(e.target.value)} />
        <input type="number" value={amount} class=" bg-white p-3 mr-3" placeholder='amount' onChange={(e) => setAmount(e.target.value)}/>
        <button class="p-3 ">+</button>
      </form>

      {
        <div className='flex gap-5'>
        <ul>
          {list.map((list) => (
            <li key={list.id} className='flex items-center justify-between  bg-[#2BA3EC] px-4 py-2 mt-2 w-[50vw] rounded-8'>
              <span className='text-xl '>{list.name}</span>
              <span className='text-lg'>${list.amount}</span>
              <FaTrash onClick={()=> deleteItem(list)} style={{ fontSize:'20px', color:'white'}} />

            </li>
           ))}
        </ul>
        </div>
      }
      <Balance balance={balance} />
     
    </div>
  )
}

export default Income;
