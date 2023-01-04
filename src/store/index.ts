import {configureStore, combineReducers, PayloadAction} from "@reduxjs/toolkit";
import LoginSlice from "@/store/loginSlice";
import {useDispatch} from "react-redux";

const rootReducers = combineReducers({
  login: LoginSlice.reducer
})

const store = configureStore({
  reducer: rootReducers
})

export default store

export type rootState = ReturnType<typeof rootReducers>
export type appDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<appDispatch>();