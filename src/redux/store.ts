import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/redux/reducers/authReducers";

const store = configureStore({
  reducer: {
    authReducer
  }
})

export default store