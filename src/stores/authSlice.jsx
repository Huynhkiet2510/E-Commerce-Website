import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, getProfileApi } from "../services/AuthApi"

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginApi(payload);
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProfileApi();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    isInitialized: false,
    loginStatus: "idle",
    profileStatus: "idle",
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.token = action.payload.access_token;
        localStorage.setItem("token", action.payload.access_token);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload;
      })

      .addCase(getProfile.pending, (state) => {
        state.profileStatus = "loading";
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.profileStatus = "succeeded";
        state.user = action.payload;
        state.isInitialized = true;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.profileStatus = "failed";
        state.error = action.payload;
        state.isInitialized = true;
        state.user = null;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
