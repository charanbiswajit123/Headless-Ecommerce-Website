"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  makePersistor,
  makeStore,
  type AppStore,
} from "@/store/createStore";

/**
 * Single browser singleton — Redux store must not be recreated on re-render.
 * (Refs trigger React Compiler / ESLint rules when used for this pattern.)
 */
let browserStore: AppStore | undefined;
let browserPersistor: ReturnType<typeof makePersistor> | undefined;

function getClientStore() {
  if (!browserStore) {
    browserStore = makeStore();
    browserPersistor = makePersistor(browserStore);
  }
  return { store: browserStore, persistor: browserPersistor! };
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { store, persistor } = getClientStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
