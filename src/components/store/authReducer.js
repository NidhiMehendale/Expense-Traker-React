import { createSlice } from "@reduxjs/toolkit";

const initialAuthSate = {
  isAuthenticated: !!localStorage.getItem("email"),
};

const authSlice = createSlice({
  name: "Authentication",
  initialState: initialAuthSate,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      localStorage.removeItem("idToken");
     // localStorage.removeItem("email");
      state.isAuthenticated = false
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer