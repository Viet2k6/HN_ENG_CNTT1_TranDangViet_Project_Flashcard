import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginFormData, RegisterFormData, UserInfo } from "../types/authTypes";
import { saveUserToLocalStorage, getUserFromLocalStorage } from "../utils/localStorage";
import { authApi } from "../apis/authApi";

interface AuthState {
  user: UserInfo | null;
  loading: boolean;
  error: string | null;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUserThunk = createAsyncThunk<
  UserInfo,
  RegisterFormData,
  { rejectValue: string }>("auth/registerUser", async (data, { rejectWithValue }) => {
  try {
    const user = await authApi.register(data);
    saveUserToLocalStorage(user);
    return user;
  } catch (err) {
    const error = err as ApiError;
    return rejectWithValue(error.response?.data?.message || "Register failed");
  }
});

export const loginUserThunk = createAsyncThunk<
  UserInfo,
  LoginFormData,
  { rejectValue: string }>("auth/loginUser", async (data, { rejectWithValue }) => {
  try {
    const user = await authApi.login(data);
    saveUserToLocalStorage(user);
    return user;
  } catch (err) {
    const error = err as ApiError;
    return rejectWithValue(error.response?.data?.message || "Email or password is incorrect");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("currentUser");
    },
    loadUserFromStorage(state) {
      const user = getUserFromLocalStorage();
      state.user = user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Email or password is incorrect";
      });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
