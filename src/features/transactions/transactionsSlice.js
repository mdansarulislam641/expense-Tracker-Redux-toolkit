import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransactions, addTransaction, deleteTransaction, updateTransaction } from "./transactionsAPI";

// initialState 
const initialState = {
    isLoading: false,
    transactions: [],
    isError: false,
    error: '',
    editTransaction : {}
};

// get transaction thunk
export const fetchTransaction = createAsyncThunk('transactions/fetchTransactions', async () => {
    const transactions = await getTransactions();
    return transactions;
});

// post transaction thunk
export const postTransaction = createAsyncThunk('transactions/postTransaction', async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
});

// change or update transaction 
export const changeTransaction = createAsyncThunk('transactions/changeTransaction', async ({ id, data }) => {
    const transaction = await updateTransaction(id, data);
    return transaction;
});

// delete transaction 
export const removeTransaction = createAsyncThunk('transactions/removeTransaction', async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
});


//transactions slice reducer
const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers:{
        activeEdit : (state, action) =>{
            state.editTransaction = action.payload
        },
        removeEdit : (state) =>{
            state.editTransaction = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            })
            .addCase(fetchTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions = action.payload;
                state.isError = false;
                state.error = '';
            })
            .addCase(fetchTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message
            })
            // post a transaction 
            .addCase(postTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            })
            .addCase(postTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions.push(action.payload) ;
                state.isError = false;
                state.error = '';
            })
            .addCase(postTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message
            })

            // update transaction 
            .addCase(changeTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            })
            .addCase(changeTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.transactions.findIndex(t =>t.id === action.payload.id
                )
                state.transactions[index] = action.payload ;
                state.isError = false;
                state.error = '';
            })
            .addCase(changeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message
            })
            // delete transaction 
            .addCase(removeTransaction.pending, (state) => {
                state.isLoading = true;
                state.isError = false
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions = state.transactions.filter(t => t.id !== action.meta.arg
                ) ;
                state.isError = false;
                state.error = '';
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message
            })

    }
});

export default transactionSlice.reducer ; 
export const {activeEdit, removeEdit} = transactionSlice.actions;
