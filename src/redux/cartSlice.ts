import {createSelector, createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addItem(state: any, action) {
     const existItemIndex = state.cart.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (existItemIndex >= 0) {
        state.cart[existItemIndex] = {...action.payload, quantity: state.cart[existItemIndex].quantity + 1}
      } else {
        state.cart.push(action.payload);
      }
    },


    updateItemQuantity (state: any, action) {
      const itemIndex = state.cart.findIndex((item: any) => item.id === action.payload.id)
      if (action.payload.quantity > 0) {
        if (itemIndex >= 0) {
          state.cart[itemIndex] = { ...state.cart[itemIndex], quantity: action.payload.quantity }
        }
      }
    },

    removeItem: (state: any, action) => {
      state.cart = state.cart.filter((item: any) => item.id !== action.payload);
    },

    resetState(state: any) {
      state.product = 0;
    },
  },
});


export const { resetState, addItem, updateItemQuantity, removeItem } = cartSlice.actions;
export const selectCart = (state: any) => state.cart.cart;



export default cartSlice.reducer;
