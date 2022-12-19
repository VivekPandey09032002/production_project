import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { STATUS } from "../utils/status"

const initialState = {
  data: [],
  status: "idle",
  msg: "",
}

const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductCategories.pending, (state, action) => {
        state.status = STATUS.LOADING
      })
      .addCase(fetchProductCategories.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = STATUS.IDLE
        state.msg = ""
      })
      .addCase(fetchProductCategories.rejected, (state, action) => {
        state.status = STATUS.ERROR
        state.msg = action.error.message
      })
  },
})

// export const {setProducts} = productCategorySlice.actions
export default productCategoriesSlice.reducer

//Thunks

export const fetchProductCategories = createAsyncThunk(
  "productCategory/fetch",
  async () => {
    try {
      const res = await axios.get(
        "api/v1/productCategory"
      )
      return res.data.categories
    } catch (e) {
      throw Error(e)
    }
  }
)
