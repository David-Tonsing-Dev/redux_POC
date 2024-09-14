import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import statusCode from "../utils/statusCode";

const initialState = {
  data: [],
  status: statusCode.IDLE,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add(state, action) {
    //   state.push(action.payload);
    // },
    // remove(state, action) {
    //   return state.data.filter((item) => item.id !== action.payload);
    // },
  },
  extraReducers: (builders) => {
    builders.addCase(getProduct.pending, (state, action) => {
      state.status = statusCode.PENDING;
    });
    builders.addCase(getProduct.fulfilled, (state, action) => {
      state.status = statusCode.IDLE;
      state.data = action.payload;
    });
    builders.addCase(getProduct.rejected, (state, action) => {
      state.status = statusCode.ERROR;
    });
    builders.addCase(addProduct.pending, (state, action) => {
      state.status = statusCode.PENDING;
    });
    builders.addCase(addProduct.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.status = statusCode.IDLE;
    });
    builders.addCase(addProduct.rejected, (state, action) => {
      state.status = statusCode.ERROR;
    });
    builders.addCase(removeProduct.pending, (state, action) => {
      state.status = statusCode.PENDING;
    });
    builders.addCase(removeProduct.fulfilled, (state, action) => {
      state.status = statusCode.IDLE;
      state.data = state.data.filter((item) => item.id !== action.payload);
    });
    builders.addCase(removeProduct.rejected, (state, action) => {
      state.status = statusCode.ERROR;
    });
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;

export const getProduct = createAsyncThunk("cart/get", async () => {
  const resp = await axios.get("http://localhost:8000/cart");
  return resp.data;
});

export const addProduct = createAsyncThunk("cart/add", async (data) => {
  const resp = await axios.post("http://localhost:8000/cart", data);
  return resp.data;
});

export const removeProduct = createAsyncThunk("cart/remove", async (id) => {
  const removeId = String(id);
  const resp = await axios.delete(`http://localhost:8000/cart/${removeId}`);
  return id;
});
