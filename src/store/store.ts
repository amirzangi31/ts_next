import { configureStore } from "@reduxjs/toolkit";

import modalLoginReducer from "./features/Modallogin";
import loginReducer from "./features/LoginSlice";
import userInfoReducer from "./features/userInfoSlice";

const store = configureStore({
  reducer: {
    modalLogin: modalLoginReducer,
    login: loginReducer,
    userInfo :userInfoReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
