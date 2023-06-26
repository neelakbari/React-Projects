import { combineReducers, configureStore } from "@reduxjs/toolkit";
import surveySlice from "../reducers/surveySlice";
import surveyDataSlice from "../reducers/surverDataSlice";

const rootReducer = combineReducers({
    survey:surveySlice,
    surveyData:surveyDataSlice,
})
const store = configureStore({
    reducer:rootReducer
})

export default store