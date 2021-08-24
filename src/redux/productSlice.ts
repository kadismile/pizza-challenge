import {createSlice} from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [
      { id: 1, name: "Olives", "price": 3, quantity: 0, image: "/images/olives.png" },
      { id: 2, name: "Pepperoni", "price": 4, quantity: 0,  image: "/images/pepperoni-pizza.png"},
      { id: 3, name: "Mushrooms", "price": 2, quantity: 0, image: "/images/mushrooms.png"  },
      { id: 4, name: "Pepper", "price": 2, quantity: 0, image: "/images/pizza.png" }
    ],
    productSize:[
      { value: 'Small', label: 'Small', price: 15, picked: false },
      { value: 'Medium', label: 'Medium', price: 20, picked: false },
      { value: 'Large', label: 'Large', price: 25, picked: false },
    ]
  },
  reducers: {
    setProductSize(state, action) {
      console.log("we are inside here")
      const existItemIndex = state.productSize.findIndex(
        (item: any) => item.label === action.payload.label
      );
      state.productSize[existItemIndex] = { ...action.payload, picked: true}
      state.productSize.map((pz: any, index) => {
        if (existItemIndex !== index) {
          state.productSize[index] = { ...pz, picked: false}
        }
      })
    },
    resetState(state: any) {
      state.product = 0;
    },
  },
});


export const { resetState, setProductSize } = productSlice.actions;
export const selectProduct = (state: any) => state.products.products;
export const selectProductSize = (state: any) => state.products.productSize;



export default productSlice.reducer;
