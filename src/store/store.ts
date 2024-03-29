import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { pollsSlice } from "./slices/polls";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  [pollsSlice.name]: pollsSlice.reducer,
  //[userVotesSlice.name]: userVotesSlice.reducer,
  //[userSlice.name]: userSlice.reducer,
});

const makeConfiguredStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
  });
  setupListeners(store.dispatch);
  return store;
};

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    // we need it only on client side
    const persistConfig = {
      key: "nextjs",
      storage,
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
    });
    store.__persistor = persistStore(store); // Nasty hack
    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
