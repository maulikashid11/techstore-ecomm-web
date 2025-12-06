import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products: []
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addAllProducts: (state, action) => {
            const products = action.payload;
            if (products.length !== 0) {
                state.products = products;
            }
        }
    }
})

export const { addAllProducts } = productSlice.actions;
export default productSlice.reducer;    