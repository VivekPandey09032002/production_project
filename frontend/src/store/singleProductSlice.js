import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { STATUS } from "../utils/status"

const initialState = {
  data: [],
  status: "idle",
  msg: "",
}

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.status = STATUS.LOADING
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = STATUS.IDLE
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = STATUS.ERROR
        state.msg = action.error.message
      })
  },
})

// export const {add,remove} = cartSlice.actions
export default singleProductSlice.reducer

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetch",
  async (id) => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/products/" + id)
      const {
        _id: productId,
        description,
        category,
        images,
        name,
        price,
        stock,
        user: userID,
        ratings: rating,
        user: userId,
        createdAt: date,
      } = res.data.product

      const product = {
        productId,
        description,
        category,
        images,
        name,
        price,
        stock,
        userID,
        rating,
        userId,
        date,
      }
      return product
    } catch (e) {
      throw Error(e)
    }
  }
)
