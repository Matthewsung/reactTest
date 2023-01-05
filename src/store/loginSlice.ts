import {createSlice, PayloadAction} from "@reduxjs/toolkit";
type loginState = {
  token: string
}
const initialState: loginState = {
  token:''
}

const LoginSlice = createSlice({
  name:'login',
  initialState,
  reducers: {
    saveToken: (state:loginState, action:PayloadAction<string>) => {
      const { payload } = action
      state.token = payload
    }
  }
})
export const { saveToken } = LoginSlice.actions
export default LoginSlice