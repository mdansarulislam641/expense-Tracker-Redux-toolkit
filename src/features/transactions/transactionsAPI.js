import axios from "../../components/utilities/axios";

// get transactions 
export const getTransactions = async() =>{
    const response = await axios.get('/transactions')
    return response.data ;
};

// create transaction 
export const addTransaction = async(data) =>{
    const response = await axios.post('/transactions', data);
    return response.data ;
};

// update transaction 
export const updateTransaction = async(id , data) =>{
    const response = await axios.put(`/transactions/${id}`, data);
    return response.data ;
};

// delete transaction 
export const deleteTransaction = async (id) =>{
    const response = await axios.delete(`/transactions/${id}`);
    return response.data ;
}