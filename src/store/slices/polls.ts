import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";
import { Poll } from "@/domain/Poll";

export interface PollsState {
  polls: Poll[];
  loading: boolean;
  error: string | null;
}

const initialState: PollsState = {
  polls: [],
  loading: false,
  error: null,
};

export const pollsSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {
    getPollsRequest(state) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    getPollsSuccess(state, action: PayloadAction<Poll[]>) {
      return {
        ...state,
        polls: action.payload,
        loading: false,
      };
    },
    getPollsFailure(state, action: PayloadAction<string>) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.polls,
      };
    },
  },
});

export const { getPollsRequest, getPollsSuccess, getPollsFailure } =
  pollsSlice.actions;

export const selectPollsState = (state: AppState) => state.polls.polls;

export default pollsSlice.reducer;
