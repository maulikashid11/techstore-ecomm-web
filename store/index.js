import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import cartReducer from "./slices/cartSlice"
import productReducer from "./slices/productSlice"

const rootReducer = combineReducers({
    cart: cartReducer,
    product:productReducer
})

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['cart','product'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
})

export const persistor = persistStore(makeStore);

export default makeStore;
