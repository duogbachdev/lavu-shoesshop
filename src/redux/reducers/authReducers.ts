import { createSlice } from "@reduxjs/toolkit";
import { localDateNames } from "../../constants/appInfor";

export interface AuthState {
  token: string,
  _id: string,
  name: string,
  role: number,
}

const initialState = {
  token: '',
  _id: '',
  name: '',
  role: 0,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: initialState
  },
  reducers: {
    addAuth: (state, action) => {
      state.data = action.payload
    },
    removeAuth: (state, action) => {
      state.data = initialState
      syncLocal({})
    },
    refreshToken: (state, action) => {
      state.data.token = action.payload
    }
  }
})

export const authReducer = authSlice.reducer
export const { addAuth, removeAuth, refreshToken } = authSlice.actions

export const authSelector = (state: any) => state.authReducer.data

const syncLocal = (data: any) => {
  localStorage.setItem(localDateNames.authData, JSON.stringify(data))
}