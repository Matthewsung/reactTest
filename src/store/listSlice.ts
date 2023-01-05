import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

type listState = {
  branches: reduxBranchesType[]
}
export type reduxBranchesType = {
  id: number,
  store: string,
  value: number
}
const initialState:listState = {
  branches: []
}

export const getStoreData = createAsyncThunk('list/getStoreData', async () => {
  const {data} = await axios('http://localhost:4567/store')
  if(!data.success) return []

  return data.data
})


const ListSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getStoreData.fulfilled, (state, action) => {
      state.branches = action.payload
    })
  }
})

export const {} = ListSlice.actions
export default ListSlice