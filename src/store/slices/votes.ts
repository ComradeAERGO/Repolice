import { Vote } from "@/domain/Vote";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";

interface votesState {
  votes: Vote[];
  loading: boolean;
  error: string | null;
}

const initialState: votesState = {
  votes: [],
  loading: false,
  error: null,
};

export const votesSlice = createSlice({
  name: "votes",
  initialState,
  reducers: {
    getVotesRequest(state) {
      return { ...state, loading: true, error: null };
    },
    getVotesSuccess(state, action: PayloadAction<Vote[]>) {
      return { ...state, votes: action.payload, loading: false };
    },
    getVotesFailure(state, action: PayloadAction<string>) {
      return { ...state, loading: false, error: action.payload };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.votes,
      };
    },
  },
});

export const { getVotesRequest, getVotesSuccess, getVotesFailure } =
  votesSlice.actions;

export const selectAuthState = (state: AppState) => state.votes.votes;

export default votesSlice.reducer;
