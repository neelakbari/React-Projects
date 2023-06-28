import { createSlice } from "@reduxjs/toolkit";
import { pageLayout } from "../../data";

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
    addPage: (state, action) => {
      const currentIndex = state.findIndex(
        (user) =>
          user.email === JSON.parse(localStorage.getItem("currentUser")).email
      );
      let newPage = { ...pageLayout };
      newPage["id"] =
        state[currentIndex].data.find(
          (survey) => survey.surveyId === action.payload.surveyId
        ).surveyData.page.length + 1;
      newPage["dropDownId"] = +action.payload.value;
      state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData.currentPage =
        state[currentIndex].data.find(
          (survey) => survey.surveyId === action.payload.surveyId
        ).surveyData.page.length + 1;
      state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData.page = [
        ...state[currentIndex].data.find(
          (survey) => survey.surveyId === action.payload.surveyId
        ).surveyData.page,
        newPage,
      ];
    },
    deletePage: (state, action) => {
      const currentIndex = state.findIndex(
        (user) =>
          user.email === JSON.parse(localStorage.getItem("currentUser")).email
      );
      const statesurveyData = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData;
      console.log(statesurveyData);
      let index = statesurveyData.page.findIndex(
        (state) => state.id === +action.payload.value
      );
      if (statesurveyData.page.length > 1 && index !== 0) {
        statesurveyData["currentPage"] = statesurveyData.page[index - 1].id;

        statesurveyData.page = statesurveyData.page
          .filter((data) => data.id !== action.payload.value)
          .map((page, index) => {
            return {
              ...page,
              id: index + 1,
            };
          });
      }
    },
    changeCurrent: (state, action) => {
      const currentIndex = state.findIndex(
        (user) =>
          user.email === JSON.parse(localStorage.getItem("currentUser")).email
      );
      const surveyData = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData;
      console.log(surveyData);
      surveyData.currentPage = +action.payload.value;
    },
  },
});

export const { addSurvey, deleteSurvey, addPage, deletePage, changeCurrent } =
  surveySlice.actions;
export default surveySlice.reducer;
