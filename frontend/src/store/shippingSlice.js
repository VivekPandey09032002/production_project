import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { STATUS } from "../utils/status"

const initialState = {
  data: {},
  status: "idle",
  msg: "",
}

const shippingSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeProduct.pending, (state, action) => {
        state.status = STATUS.LOADING
      })
      .addCase(placeProduct.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = STATUS.IDLE
      })
      .addCase(placeProduct.rejected, (state, action) => {
        state.status = STATUS.ERROR
        state.msg = action.error.message
      })
  },
})

export const { changeStatus } = shippingSlice.actions
export default shippingSlice.reducer

export const placeProduct = createAsyncThunk(
  "placeProduct/fetch",
  async ({ body, setIsSuccess }) => {
    try {
      const instance = axios.create({
        withCredentials: true,
      })
      const res = await instance.post(
        "api/v1/order/new",
        body
      )
      setIsSuccess(true)
      return res.data
    } catch (e) {
      setIsSuccess(false)
      throw Error(e)
    }
  }
)
