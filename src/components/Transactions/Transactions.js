import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransaction } from '../../features/transactions/transactionsSlice';
import Transaction from './Transaction';

const Transactions = () => {
    const dispatch = useDispatch();
    const {isLoading , isError , transactions} = useSelector(state => state.transactions);

    useEffect(()=>{
        dispatch(fetchTransaction())
    },[dispatch]);

    // decide what do render 
    let content = null ;
    if(isLoading) content = <p>Loading.....</p>
    if(!isLoading && isError) content = <p>Some This Happen wrong</p>
    if(!isLoading && !isError && transactions?.length === 0) content = <p>No Transaction</p>
    if(!isLoading && !isError && transactions?.length > 0) {
        content = transactions.map(transaction =><Transaction transaction={transaction} key={transaction.id} /> )
    }

    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    );
};

export default Transactions;