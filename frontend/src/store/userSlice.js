import { createAsyncThunk, createSlice, unwrapResult } from "@reduxjs/toolkit"
import axios from "axios"

import { STATUS } from "../utils/status"

const initialState = {
  data: [],
  status: "idle",
  msg: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      state.data = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = STATUS.LOADING
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload.user
        state.status = STATUS.IDLE
        state.msg = ""
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = STATUS.ERROR
        state.msg = action.error.message
      })
      .addCase(logOutUser.pending, (state, action) => {
        state.status = STATUS.LOADING
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.data = {}
        state.status = STATUS.IDLE
        state.msg = ""
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.status = STATUS.ERROR
        state.msg = action.error.message
      })
      .addCase(fetchNewDetail.pending, (state, action) => {
        state.status = STATUS.LOADING
      })
      .addCase(fetchNewDetail.fulfilled, (state, action) => {
        state.data = action.payload.user
        state.status = STATUS.IDLE
        state.msg = ""
      })
      .addCase(fetchNewDetail.rejected, (state, action) => {
        state.status = STATUS.ERROR
        state.msg = action.error.message
      })
      .addCase(sendResetEmail.pending, (state, action) => {
        state.status = STATUS.LOADING
      })
      .addCase(sendResetEmail.fulfilled, (state, action) => {
        state.status = STATUS.IDLE
        state.msg = ""
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.status = STATUS.ERROR
        state.msg = action.error.message
      })
      .addCase(changePassword.pending, (state, action) => {
        state.status = STATUS.LOADING
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.data = action.payload.user
        state.status = STATUS.IDLE
        state.msg = ""
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = STATUS.ERROR
        state.msg = action.error.message
      })
  },
})

export const { updateUser } = userSlice.actions
export default userSlice.reducer

//Thunks

export const fetchUser = createAsyncThunk("user/fetch", async () => {
  const instance = axios.create({
    withCredentials: true,
  })
  try {
    const res = await instance.get("api/v1/me")
    return res.data
  } catch (e) {
    throw Error(e)
  }
})

export const logOutUser = createAsyncThunk("user/remove", async () => {
  const instance = axios.create({
    withCredentials: true,
  })
  try {
    await instance.get("api/v1/logout")
  } catch (e) {
    throw Error(e)
  }
})

export const fetchNewDetail = createAsyncThunk(
  "fetchNewDetail",
  async (body) => {
    const instance = axios.create({
      withCredentials: true,
    })
    try {
      await instance.put("api/v1/me/update", body)
      const res = await instance.get("api/v1/me")
      return res.data
    } catch (e) {
      throw Error(e)
    }
  }
)

export const sendResetEmail = createAsyncThunk(
  "sendEmailLink/post",
  async (body) => {
    const instance = axios.create({
      withCredentials: true,
    })
    try {
      await instance.post("api/v1/password/forgot", body)
    } catch (e) {
      throw Error(e)
    }
  }
)

export const changePassword = createAsyncThunk(
  "changePassword/put",
  async (body) => {
    const instance = axios.create({
      withCredentials: true,
    })
    const { url, password, confirmPassword } = body
    try {
      await instance.put(url, { password, confirmPassword })
      const res = await instance.get("api/v1/me")
      return res.data
    } catch (e) {
      throw Error(e)
    }
  }
)
