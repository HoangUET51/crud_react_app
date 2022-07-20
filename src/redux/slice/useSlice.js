import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchLogin } from "../../services/useService";
import { toast } from "react-toastify";
export const FetchLoginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await FetchLogin(email.trim(), password);
      if (res && res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("email", email.trim());
        return res;
      } else {
        toast.error(res.data.error);
        return thunkAPI.rejectWithValue(res);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  email: "",
  auth: null,
  token: "",
  isLoading: false,
  isError: false,
};

export const authSlice = createSlice({
  name: "login-logout",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      state.auth = false;
      state.isLoading = false;
      state.isError = false;
    },
    resfresh: (state) => {
      state.email = localStorage.getItem("email");
      state.token = localStorage.getItem("token");
      state.auth = true;
    },
  },
  extraReducers: {
    [FetchLoginUser.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },

    [FetchLoginUser.fulfilled]: (state, action) => {
      state.email = action.meta.arg.email;
      state.token = action.payload.token;
      state.auth = true;
      state.isLoading = false;
      state.isError = false;
    },

    [FetchLoginUser.rejected]: (state, action) => {
      console.log("check not");
      state.auth = false;
      state.isLoading = false;
      state.isError = true;
    },
  },
});
export const { logout, resfresh } = authSlice.actions;
export default authSlice.reducer;
