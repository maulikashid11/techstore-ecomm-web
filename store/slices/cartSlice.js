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
        clearCart: (state, action) => {
            state.items = {}
        }
    }
})

export const { addToCart, clearCart,decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;