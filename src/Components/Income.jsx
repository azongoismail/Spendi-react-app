import React, { useEffect } from 'react'
import { useState } from 'react';
import { FaTrash } from "react-icons/fa6";
import Balance from './Balance';



const Income = () => {
    const [income, setIncome] = useState();
   const [totalIncome, setTotalIncome] = useState(() => {
  const savedIncome = localStorage.getItem('totalIncome');
  return savedIncome ? JSON.parse(savedIncome) : '';
});

    const [balance, setBalance] = useState(()=>{
      const savedBalance = localStorage.getItem("balance")
      return savedBalance ? JSON.parse(savedBalance) : '';});

    const [totalExpenses, setTotalExpenses] = useState(()=>{
      const savedExpenses = localStorage.getItem("totalExpenses")
      return savedExpenses ? JSON.parse(savedExpenses) : 0;
    })
    const [ list, SetList] = useState(()=>{
      const savedList = localStorage.getItem('list');
      return savedList? JSON.parse(savedList) : []
    });
    const [ amount, setAmount] = useState(() => {
  const saved = localStorage.getItem('amount');
  return saved ? JSON.parse(saved) : '';})
    const [ item, setItem] = useState ('')


    useEffect(()=>{
      const numericTotalIncome = parseFloat(totalIncome);
      if (!isNaN(numericTotalIncome)) {
     setBalance(numericTotalIncome.toString());
   }
    }, [totalIncome]) 


    // useEffect to store income to localstorage
   useEffect(()=>{
    localStorage.setItem('totalIncome',JSON.stringify(totalIncome))
   },[totalIncome])
// add totalExpenses to localStorage
   useEffect(()=>{
    localStorage.setItem('totalExpenses',JSON.stringify(totalExpenses))
   },[totalExpenses]);

   // add amount to localStorage
   useEffect(()=>{
    localStorage.setItem('amount',JSON.stringify(amount))
   },[amount]);

   // add balance to localStorage
   useEffect(()=>{
    localStorage.setItem('balance',JSON.stringify(balance))
   },[balance]);

     useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
   },[list]);




    const handleChange = (e) => {
          setIncome(
          e.target.value
      )
    }
// submit income
   
    const handleIncomeSubmit = (event) =>{
        event.preventDefault();
        const totalIncome = income;
        setTotalIncome(totalIncome)
        console.log(totalIncome)
        setIncome('');
    }

    // submit expenses
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

const newAmount  = parseFloat(amount);
setTotalExpenses(preTotal => preTotal + newAmount);
    
    }


   // delete items
   
  const deleteItem = (item) =>{
     const filteredItems = list.filter((list) => list.id !== item.id);
     SetList(filteredItems);
     const deletedAmount = parseFloat(item.amount);
     const newbalance = parseFloat(balance) + deletedAmount;
     setBalance(newbalance.toString());
     const deletedSpending = parseFloat(item.amount)
     const newTotal = parseFloat(totalExpenses) - deletedSpending;
     setTotalExpenses(newTotal);

  }

  // localStorage.clear()



  return (
    <>
    <div className= "bg-[#EFEDCE] h-[100%] w-[50vw]  mx-auto my-4 flex justify-start items-center flex-col shadow-4xl rounded-lg gap-10 md:w-[30%]">
        <p className='text-2xl mt-6'>Income:<span>${totalIncome}</span></p>
      <form action="" onSubmit={handleIncomeSubmit} className='flex flex-col gap-5 items-center' >
        
        <input value={income} type="text" onChange={handleChange} className="bg-white p-3 mr-2" placeholder="enter income" />
        <button type="submit" className="add-income-btn ">Enter Income</button>
      </form>
    
      <form action="" onSubmit={handleExpensesSubmit} className='flex flex-col gap-5 my-4 items-center'>
          <h2 className='text-4xl'>Expenses</h2>
          <div className='flex flex-col gap-4'>
          <input type="text" value={item} className=" bg-white p-3 mr-3" placeholder=' add item' onChange={(e) => setItem(e.target.value)} />
          <input type="number" value={amount} className=" bg-white p-3 mr-3" placeholder='enter amount' onChange={(e) => setAmount(e.target.value)}/>
          <button type="submit"className="add-item-btn">Add Item</button>
          </div>
        
      </form>

      {
        <div className='flex gap-5'>
        <ul className='w-[100%]'>
          {list.map((list) => (
            <li key={list.id} className='flex items-center justify-between  bg-[#2BA3EC] px-4 py-2 mt-2 w-[30vw] rounded-4'>
              <span className='text-xl '>{list.name}</span>
              <span className='text-lg'>${list.amount}</span>
              <FaTrash onClick={()=> deleteItem(list)} style={{ fontSize:'20px', color:'white'}} />
            </li>
           ))}
        </ul>
        </div>
      }
      
     
    </div>
     <Balance balance={balance} totalExpenses={totalExpenses} />
   
    </>
  )

}

export default Income;
