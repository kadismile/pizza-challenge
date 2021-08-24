import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setUser(state:any, action) {
      state.user = action.payload
    },

    setPayments(state:any, action) {
      state.user.payments = action.payload
    },

    resetState(state: any) {
      state.user = 0;
    },
  },
});


export const { resetState, setUser, setPayments } = userSlice.actions;
export const selectUser = (state: any) => state.user.user;



export default userSlice.reducer;
