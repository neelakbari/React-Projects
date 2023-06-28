import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("dataBase")) || [];

const surveySlice = createSlice({
  name: "surveySlice",
  initialState,
  reducers: {
    addSurvey: (state, action) => {
      console.log(action.payload);
      const currentIndex = state.findIndex(
        (user) =>
          user.email === JSON.parse(localStorage.getItem("currentUser")).email
      );
      state[currentIndex].data = [...state[currentIndex].data, action.payload];
      localStorage.setItem("dataBase", JSON.stringify(state));
    },
    deleteSurvey: (state, action) => {
      const currentIndex = state.findIndex(
        (user) =>
          user.email === JSON.parse(localStorage.getItem("currentUser")).email
      );
      state[currentIndex].data = [
        ...state[currentIndex].data.filter(
          (survey) => survey.surveyId !== action.payload
        ),
      ];
      localStorage.setItem("dataBase", JSON.stringify(state));
    },
  },
});

export const { addSurvey, deleteSurvey } =
  surveySlice.actions;
export default surveySlice.reducer;
