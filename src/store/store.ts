import { configureStore } from "@reduxjs/toolkit";

import modalLoginReducer from "./features/Modallogin";

const store = configureStore({
  reducer: {
    modalLogin: modalLoginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
