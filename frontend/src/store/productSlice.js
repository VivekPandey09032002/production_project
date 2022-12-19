import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

import { STATUS } from "../utils/status"

const initialState = {
  data: [],
  productCount: 0,
  status: "idle",
  msg: "",
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUS.LOADING
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload.productDetail
        state.productCount = action.payload.productCount
        state.status = STATUS.IDLE
        state.msg = ""
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUS.ERROR
        state.msg = action.error.message
      })
      .addCase(fetchProductsWithFilters.pending, (state, action) => {
        state.status = STATUS.LOADING
      })
      .addCase(fetchProductsWithFilters.fulfilled, (state, action) => {
        state.data = action.payload.productDetail
        state.productCount = action.payload.productCount
        state.status = STATUS.IDLE
        state.msg = ""
      })
      .addCase(fetchProductsWithFilters.rejected, (state, action) => {
        state.status = STATUS.ERROR
        state.msg = action.error.message
      })
  },
})

// export const {} = productSlice.actions
export default productSlice.reducer

//Thunks

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  try {
    const res = await axios.get("api/v1/products")
    const { products, productCount } = res.data
    const productDetail = []
    products.map((product, index) => {
      const {
        _id: productId,
        description,
        category,
        images,
        name,
        price,
        stock,
        user: userID,
        ratings,
        user: userId,
        createdAt: date,
      } = product

      productDetail.push({
        productId,
        category,
        description,
        images,
        name,
        price,
        stock,
        userID,
        id: index,
        rating: ratings,
        userId,
        date,
      })
    })
    return { productDetail, productCount }
  } catch (e) {
    throw Error(e)
  }
})

export const fetchProductsWithFilters = createAsyncThunk(
  "productsFilter/fetch",
  async (body) => {
    try {
      const { searchStr, category, page, price_lte, price_gte } = body
      const baseUrl = `api/v1/products?keyword=${searchStr}`
      let url = baseUrl

      if (category.length != 0) {
        url += `&category=${category}`
      }
      if (!Number.isNaN(page)) {
        url += `&page=${page}`
      }
      if (!Number.isNaN(price_lte)) {
        url += `&price[lte]=${price_lte}`
      }
      if (!Number.isNaN(price_gte)) {
        url += `&price[gte]=${price_gte}`
      }
      const res = await axios.get(url)
      const { products, productCount } = res.data
      const productDetail = []
      products.map((product, index) => {
        const {
          _id: productId,
          description,
          category,
          images,
          name,
          price,
          stock,
          user: userID,
          ratings,
          user: userId,
          createdAt: date,
        } = product

        productDetail.push({
          productId,
          category,
          description,
          images,
          name,
          price,
          stock,
          userID,
          id: index,
          rating: ratings,
          userId,
          date,
        })
      })
      return { productDetail, productCount }
    } catch (e) {
      throw Error(e)
    }
  }
)
