import { configureStore } from "@reduxjs/toolkit";

import modalLoginReducer from "./features/Modallogin";
import loginReducer from "./features/LoginSlice";
import userInfoReducer from "./features/userInfoSlice";
import logoutModalReducer from "./features/logOutModalSlice";

const store = configureStore({
  reducer: {
    modalLogin: modalLoginReducer,
    login: loginReducer,
    userInfo: userInfoReducer,
    modalLogout: logoutModalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
