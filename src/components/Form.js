import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTransaction, postTransaction } from '../features/transactions/transactionsSlice';


const Form = () => {
    const [name , setName] = useState('');
    const [amount , setAmount] = useState('');
    const [type , setType] = useState('');
    const [editMode , setEditMode] = useState(false);
    const dispatch = useDispatch();
    const {isLoading, isError } = useSelector(state => state.transactions);
    const {editTransaction} = useSelector(state => state.transactions)
    console.log(editTransaction)
   //reset form 
   const reset = () =>{
    setName('');
    setAmount('');
    setType ('')
};

    useEffect(()=>{
      const {id , name , amount , type} = editTransaction || {};
      if(id){
        setName(name)
        setAmount(amount)
        setType(type)
        setEditMode(true);
      }
      else{
        setEditMode(false)
        reset()
      }
    },[editTransaction]);

    // submit transaction 
    const handleCreate = (event) =>{
        event.preventDefault();
        dispatch(postTransaction({
            name ,
            amount : Number(amount),
            type
        }));
        reset();
    }

    const handleUpdate = (event) =>{
        event.preventDefault();
        dispatch(changeTransaction({id : editTransaction?.id  , data :{
            name ,
            amount:Number(amount) ,
            type
        }}));
        setEditMode(false)
        reset()
    }

    const handleCancelUpdate = () =>{
        setEditMode(false)
        reset()
    }
     

    return (
        <div className="form">
        <h3>Add new transaction</h3>
        <form onSubmit={ editMode ? handleUpdate : handleCreate }>
        <div className="form-group">
            <label htmlFor="transaction_name">Name</label>
            <input
            required
                type="text"
                name="name"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                placeholder="Enter Transaction Name"
            />
        </div>

        <div className="form-group radio">
            <label htmlFor="transaction_type">Type</label>
            <div className="radio_group">
                <input
                    type="radio"
                    name="type_transaction"
                    checked={type === "income"}
                    onChange={()=> setType('income')}
                />
                <label htmlFor="transaction_type">Income</label>
            </div>
            <div className="radio_group">
                <input
                required
                    type="radio"
                    name="type_transaction"
                    checked={type === "expense"}
                    onChange={()=> setType('expense')}
                />
                <label htmlFor="transaction_type">Expense</label>
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="transaction_amount">Amount</label>
            <input
            required
                type="number"
                placeholder="300"
                name="amount"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
            />
        </div>

        <button disabled={isLoading} className="btn" type='submit'>{editMode ? "Update Transaction" : "Add Transaction"}</button>
        { !isLoading && isError && <p className='error'>Some thing went wrong occur</p> }
        </form>
       {editMode && <button onClick={handleCancelUpdate} className="btn cancel_edit">Cancel Edit</button>}
    </div>
    );
};

export default Form;