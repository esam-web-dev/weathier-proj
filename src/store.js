import { configureStore } from "@reduxjs/toolkit";
import weartherApiSliceReducer from "./weatherApiSlice";

export default configureStore({
  reducer: { weather: weartherApiSliceReducer },
});
