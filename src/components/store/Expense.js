import {createSlice} from '@reduxjs/toolkit';


const initialExpenseState = {
    data:{}
}

const expenseSlice = createSlice({
    name: 'expense/receivedData',
    initialState: initialExpenseState,
    reducers:{
        recivedData(state,action){
            state.data = action.payload
        },
        
    }
})
export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;