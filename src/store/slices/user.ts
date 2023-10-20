import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { User } from "@/domain/User";
import { AppState } from "../store";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserRequest(state) {
      return { ...state, loading: true, error: null };
    },
    getUserSuccess(state, action: PayloadAction<User>) {
      return { ...state, user: action.payload, loading: false };
    },
    getUserFailure(state, action: PayloadAction<string>) {
      return { ...state, loading: false, error: action.payload };
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { getUserRequest, getUserSuccess, getUserFailure } =
  userSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;

export default userSlice.reducer;
