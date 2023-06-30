import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button} from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { DropDownData } from "../data";
import Components from "../components/InputComponents";
import { openModal, updateSurveyData } from "../redux/reducers/surveySlice";
import Question from "../components/viewComponents/Question";
import "../scss/DisplaySurvey.scss"

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
      className={`container`}
    >

      <div className="survey_title">
        <h1>{surveyData.surveyName}</h1>
      </div>
      {surveyData?.page?.[pageIndex] && (
        <>
          <div
            id={`${surveyId ? "display_mode" : ""}`}
            className={`display_container  ${
              surveyData.page[pageIndex]?.layout === 2
                ? "layout_two"
                : ""
            }`}
          >
            <div
              className={`image_wrapper ${
                surveyData.page[pageIndex]?.layout === 3
                  ? "layout_three"
                  : ""
              }`}
            >
              <img
                src={surveyData.page[pageIndex].image || surveyData.image}
                alt=""
              />
            </div>
            <div
              className={`display_right ${
                surveyData.page[pageIndex]?.layout === 3
                  ? "layout_three"
                  : ""
              }`}
            >
              <div className="right_question">
                <Question
                  preview={true}
                  pageIndex={pageIndex}
                  currentUserIndex={currentUserIndex}
                />
              </div>
              <div className="right_answer">
                <ComponentToRender
                  preview={true}
                  currentUserIndex={currentUserIndex}
                //   handleAnswer={handleAnswer}
                  answer={surveyData.page[pageIndex].answer}
                  setError={setError}
                />
              </div>
              <div className="right_submit">
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  {surveyData.page.length === pageIndex + 1 ? "Submit" : "Ok"}
                </button>
              </div>

              {error && (
                <div className="right_error">
                  <WarningFilled />
                  <span>{error}</span>
                </div>
              )}
            </div>
            <div className="submit">
              {!surveyData.page[pageIndex]?.required &&
                pageIndex !== surveyData.page.length - 1 && (
                  <Button
                    onClick={() => handleChange("next")}
                    className="submit_skip"
                  >
                    Skip
                  </Button>
                )}
              <div className="submit_changePage">
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
