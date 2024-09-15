import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    status: null,
    message: null,
  },
  reducers: {
    setToast(state, action) {
      const { status, message } = action.payload;
      state.status = status;
      state.message = message;
    },
    clearToast(state) {
      state.status = null;
      state.message = null;
    },
  },
});

export const { setToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
