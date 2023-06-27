import { createSlice } from "@reduxjs/toolkit";
import { initialData, pageLayout } from "../../data";

const initialState = initialData;

const surveyDataSlice = createSlice({
  name: "surveyDataSlice",
  initialState,
  reducers: {
    changeName: (state, action) => {
      return {
        ...state,
        surveyName: action.payload,
      };
    },
    addPage: (state, action) => {
      let newPage = { ...pageLayout };
      newPage["id"] = state.page.length + 1;
      newPage["dropDownId"] = +action.payload;
      return {
        ...state,
        currentPage: state.page.length + 1,
        page: [...state.page, newPage],
      };
    },
    deletePage: (state, action) => {
      let index = state.page.findIndex((state) => state.id === +action.payload);
      if (state.page.length > 1 && index !== 0) {
        state["currentPage"] = state.page[index - 1].id;

        state.page.splice(index, 1);

        if (index > -1) {
          let fixID = state.page.map((state, index) => {
            return {
              ...state,
              id: index + 1,
            };
          });
          state.page = fixID;
        } else {
          return;
        }
      }
    },
    changeCurrent: (state, action) => {
      return {
        ...state,
        currentPage: +action.payload,
      };
    },
    dropDownId: (state, action) => {
      return {
        ...state,
        page: state.page.map((page) => ({
          ...page,
          dropDownId:
            page.id == state.currentPage ? +action.payload : page.dropDownId,
        })),
      };
    },
    required: (state, action) => {
      return {
        ...state,
        page: state.page.map((page) => ({
          ...page,
          required:
            page.id == state.currentPage ? action.payload : page.required,
        })),
      };
    },
    changeInput:(state,action)=>{
        let update = state.page.map((data) => ({
            ...data,
            option:
              action.payload.type == "option" && state.currentPage === data.id
                ? action.payload.value
                : data.option,
            question:
              action.payload.type == "question" && state.currentPage === data.id
                ? action.payload.value
                : data.question,
            description:
              action.payload.type == "description" && state.currentPage === data.id
                ? action.payload.value
                : data.description,
          }));
        return {
            ...state,
            page:update,
        }
    },
  },
});

export const {
  changeName,
  addPage,
  deletePage,
  changeCurrent,
  dropDownId,
  required,
  changeInput,
} = surveyDataSlice.actions;
export default surveyDataSlice.reducer;
