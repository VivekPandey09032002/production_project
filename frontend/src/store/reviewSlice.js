import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { STATUS } from "../utils/status"

const initialState = {
  data: [],
  status: "idle",
  msg: "",
}

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReview.pending, (state, action) => {
        state.status = STATUS.LOADING
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = STATUS.IDLE
        state.msg = ""
      })
      .addCase(fetchReview.rejected, (state, action) => {
        state.status = STATUS.ERROR
        state.msg = action.error.message
      })
      .addCase(updateReview.pending, (state, action) => {
        state.status = STATUS.LOADING
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = STATUS.IDLE
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.status = STATUS.ERROR
        state.msg = action.error.message
      })
  },
})

// export const {add,remove} = cartSlice.actions
export default reviewSlice.reducer

export const fetchReview = createAsyncThunk("review/fetch", async (id) => {
  try {
    const res = await axios.get("api/v1/reviews?id=" + id)
    return res.data.reviews
  } catch (e) {
    throw Error(e)
  }
})

export const updateReview = createAsyncThunk("review/update", async (body) => {
  try {
    const instance = axios.create({
      withCredentials: true,
    })
    await instance.put("http://localhost:4000/api/v1/review", body)
    const res = await axios
      .get(`http://localhost:4000/api/v1/reviews?id=${body.productId}`)
      .catch((e) => console.log(e))
    return res.data.reviews
  } catch (e) {
    throw Error(e)
  }
})
