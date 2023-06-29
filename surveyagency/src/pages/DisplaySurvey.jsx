import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../scss/Preview.scss";
import { Button, message } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { DropDownData } from "../data";
import Components from "../components/InputComponents";
import { openModal, updateSurveyData } from "../redux/reducers/surveySlice";
import Question from "../components/viewComponents/Question";

const DisplaySurvey = () => {
  const { surveyId } = useParams();
  let database = JSON.parse(localStorage.getItem("dataBase"));
  const [pageIndex, setpageIndex] = useState(0);
  const [error, setError] = useState("")
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let currentUserIndex = database.findIndex(
    (user) => user.email === currentUser.email
  );
  const surveyData = useSelector((state) =>
    state.survey[currentUserIndex].data.find(
      (survey) => survey.surveyId === surveyId
    )
  ).surveyData;
  const dropDown = DropDownData.filter((data) => {
    return data.id === +surveyData?.page[pageIndex].dropDownId;
  })?.[0];
  const ComponentToRender = Components[dropDown.component];
  console.log(surveyData);


  const handleChange=(type)=>{
    if(surveyData?.page[pageIndex]?.required && !surveyData?.page[pageIndex].answer){
        setError("This is required");
        return false;
    }
    type === "prev"? pageIndex > 0 && setpageIndex((prev)=>prev -1) : pageIndex<surveyData.page.length-1 && setpageIndex((prev)=>prev+1)
  }
  return (
    
    <div
      className={`container ${
        surveyData?.page[pageIndex]?.layout === 3 ? "container_layout" : ""
      }`}
    >
      {surveyData?.page?.[pageIndex] && (
        <>
          <div
            id={`${surveyId ? "preview_mode" : ""}`}
            className={`container_preview  ${
              surveyData.page[pageIndex]?.layout === 2
                ? "container_layout_two"
                : ""
            }`}
          >
            <div
              id={`${surveyId ? "preview_mode" : ""}`}
              className={`image_wrapper ${
                surveyData.page[pageIndex]?.layout === 3
                  ? "container_preview_layout_three"
                  : ""
              }`}
            >
              <img
                src={surveyData.page[pageIndex].image || surveyData.image}
                alt=""
              />
            </div>
            <div
              id={`${surveyId ? "preview_mode" : ""}`}
              className="container_preview_right"
            >
              <div className="preview__right__question">
                <Question
                  preview={true}
                  pageIndex={pageIndex}
                  currentUserIndex={currentUserIndex}
                />
              </div>
              <div className="container_preview_right_answer">
                <ComponentToRender
                  preview={true}
                  currentUserIndex={currentUserIndex}
                //   handleAnswer={handleAnswer}
                  answer={surveyData.page[pageIndex].answer}
                  setError={setError}
                />
              </div>
              <div className="container_preview_right_submit">
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  {surveyData.page.length === pageIndex + 1 ? "Submit" : "Ok"}
                </button>
              </div>

              {error && (
                <div className="container_preview_right_error">
                  <WarningFilled />
                  <span>{error}</span>
                </div>
              )}
            </div>
            <div className="container_submit">
              {!surveyData.page[pageIndex]?.required &&
                pageIndex !== surveyData.page.length - 1 && (
                  <button
                    onClick={() => handleChange("next")}
                    className="container_submit_skip"
                  >
                    Skip
                  </button>
                )}
              <div className="container_submit_changePage">
                <Button
                //   disabled={pageIndex === surveyData.page.length - 1}
                  onClick={() => handleChange("next")}
                >
                  <ArrowDownOutlined />
                </Button>
                <Button
                //   disabled={pageIndex === 0}
                  onClick={() => handleChange("prev")}
                >
                  <ArrowUpOutlined />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplaySurvey;
