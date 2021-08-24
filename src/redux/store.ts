import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import productsReducer from "./productSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";


const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  user: userReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["products", "cart", "user"],
};


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions:["persist/PERSIST"]
    }
  })
});

const persistor = persistStore(store)
export  { store, persistor };