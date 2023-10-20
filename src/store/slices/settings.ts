import { Settings } from "@/domain/Settings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "../store";

interface SettingsState {
  settings: Settings | null;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  settings: null,
  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    getSettingsRequest(state) {
      return { ...state, loading: true, error: null };
    },
    getSettingsSuccess(state, action: PayloadAction<Settings>) {
      return { ...state, settings: action.payload, loading: false };
    },
    getSettingsFailure(state, action: PayloadAction<string>) {
      return { ...state, loading: false, error: action.payload };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.settings,
      };
    },
  },
});

export const { getSettingsRequest, getSettingsSuccess, getSettingsFailure } =
  settingsSlice.actions;

export const selectSettingsState = (state: AppState) => state.settings.settings;

export default settingsSlice.reducer;
