import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { cartSlice } from "./cartSlice";

/** SSR-safe storage: noop on server, localStorage in the browser. */
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : {
        getItem() {
          return Promise.resolve(null);
        },
        setItem(_k: string, v: string) {
          return Promise.resolve(v);
        },
        removeItem() {
          return Promise.resolve();
        },
      };

const cartPersistConfig = {
  key: "cart",
  storage,
};

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartSlice.reducer),
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export function makePersistor(store: AppStore) {
  return persistStore(store);
}
