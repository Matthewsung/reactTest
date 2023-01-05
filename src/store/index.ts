import {configureStore, combineReducers, PayloadAction} from "@reduxjs/toolkit";
import {useDispatch, useSelector, TypedUseSelectorHook} from "react-redux";
import LoginSlice from "@/store/loginSlice";
import ListSlice from "@/store/listSlice";

const rootReducers = combineReducers({
  login: LoginSlice.reducer,
  list: ListSlice.reducer
})

const store = configureStore({
  reducer: rootReducers
})

export default store

export type rootState = ReturnType<typeof rootReducers>
type appDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<appDispatch>();
export const useAppSelector:TypedUseSelectorHook<rootState> = useSelector