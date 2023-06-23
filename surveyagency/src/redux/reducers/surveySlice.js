import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("surveyDatabase")) || [];

const surveySlice = createSlice({
  name: "surveySlice",
  initialState,
  reducers: {
    addSurvey: (state, action) => {
      const UpdatedSurveyDatabase = [...state, action.payload];
      localStorage.setItem(
        "surveyDatabase",
        JSON.stringify(UpdatedSurveyDatabase)
      );

      return [...state, action.payload];
    },
    deleteSurvey: (state, action) => {
      const UpdatedSurveyDatabase = [
        ...state.filter((survey) => survey.surveyId !== action.payload),
      ];
      localStorage.setItem(
        "surveyDatabase",
        JSON.stringify(UpdatedSurveyDatabase)
      );
      return [...state.filter((survey) => survey.surveyId !== action.payload)];
    },
  },
});

export const { addSurvey, addToLocalStorage, deleteSurvey } =
  surveySlice.actions;
export default surveySlice.reducer;
