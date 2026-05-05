import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: {},
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const id = action.payload
            if (!state.items[id]) {
                state.items[id] = 1;
            } else {
                state.items[id] += 1;
            }
        },
        decreaseQuantity:(state,action)=>{
            const id = action.payload;
            if(state.items[id] === 1){
                delete state.items[id]
            }else{
                state.items[id] -= 1 
            }
        },
        
        deleteItem:(state,action)=>{
            const id = action.payload;
            delete state.items[id];
        },
        clearCart: (state, action) => {
            state.items = {}
        }
    }
})

export const { addToCart, clearCart,deleteItem,decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;