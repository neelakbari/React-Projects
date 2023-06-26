import { createSlice } from "@reduxjs/toolkit";
import { initialData } from "../../data";
import { survey_img } from "../../assets";

const initialState = initialData;   

const surveyDataSlice = createSlice({
    name:"surveyDataSlice",
    initialState,
    reducers:{
        change_name:(state,action)=>{
            console.log(action.payload)
            return {
                ...state,
                surveyName:action.payload,
            }
        }
    },
})


export const { change_name } =
  surveyDataSlice.actions;
export default surveyDataSlice.reducer