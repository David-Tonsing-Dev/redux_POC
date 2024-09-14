import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import statusCode from "../utils/statusCode";

const initialState = {
  data: [],
  status: statusCode.IDLE,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // fetchProducts(state, action) {
    //   state.data = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.status = statusCode.LOADING;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = statusCode.IDLE;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = statusCode.ERROR;
    });
  },
});

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;

export const getProducts = createAsyncThunk("products/get", async () => {
  const data = await fetch("http://localhost:8000/products");
  const result = await data.json();
  return result.data;
});

// export function getProducts() {
//   return async function getProductsThunk(dispatch, getState) {
//     const data = await fetch("https://dummyjson.com/products");
//     const result = await data.json();
//     dispatch(fetchProducts(result.products));
//   };
// }
