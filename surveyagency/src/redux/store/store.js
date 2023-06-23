import { combineReducers, configureStore } from "@reduxjs/toolkit";
import surveySlice from "../reducers/surveySlice";

const rootReducer = combineReducers({
    survey:surveySlice,
})
const store = configureStore({
    reducer:rootReducer
})

export default store