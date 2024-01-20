import { configureStore } from "@reduxjs/toolkit";

import modalLoginReducer from "./features/Modallogin";
import loginReducer from "./features/LoginSlice";

const store = configureStore({
  reducer: {
    modalLogin: modalLoginReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
