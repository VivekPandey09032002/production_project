import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { STATUS } from "../utils/status"

const initialState = {
  data: [],
  status: "idle",
  msg: "",
}

const featuredProductSlice = createSlice({
  name: "featuredProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedProducts.pending, (state, action) => {
        state.status = STATUS.LOADING
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = STATUS.IDLE
        state.msg = ""
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.status = STATUS.ERROR
        state.msg = action.error.message
      })
  },
})

// actions could be use later
// export const {setProducts} = featuredProductSlice.actions
export default featuredProductSlice.reducer

//Thunks

export const fetchFeaturedProducts = createAsyncThunk(
  "featuredProduct/fetch",
  async () => {
    try {
      const res = await axios.get(
        "/api/v1/featuredProduct"
      )
      const { products } = res.data
      const productDetail = []
      products.map((product, index) => {
        const {
          _id: productId,
          category,
          images,
          name,
          price,
          stock,
          user: userID,
          ratings,
        } = product
        productDetail.push({
          productId,
          category,
          images,
          name,
          price,
          stock,
          userID,
          id: index,
          rating: ratings,
        })
      })
      return productDetail
    } catch (e) {
      throw Error(e)
    }
  }
)
