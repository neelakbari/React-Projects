import React, { useState } from "react";
import "../scss/CreateSurvey.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentBar from "../components/ContentBar";
import View from "../components/viewComponents/View";
import { DropDownData, pageLayout } from "../data";
import ChangesBar from "../components/ChangesBar";

const CreateSurvey = () => {
  const { createId } = useParams();
  const surveys = useSelector((state) => state.survey);
  const survey = useSelector((state) => state.surveyData);
  const surveyId = surveys.filter((survey) => survey.surveyId === createId)[0]
    .surveyId;
  // const currentPage = surveys.filter((survey) => survey.surveyId === createId)[0]
  // .currentPage;
  // const survey = surveys.filter((survey) => survey.surveyId === createId)[0]
  // .surveyData;
  const currentIndex = survey?.page.findIndex(
    (data) => data.id === survey.currentPage
  );
  const dropDown = DropDownData.filter((data) => {
    return data.id === +survey?.page[currentIndex].dropDownId;
  })?.[0];

  return (
    <>
      <div className="main_survey">
        <div className="survey_wrapper">
          <div className="survey_content">
            <ContentBar/>
          </div>
          <div className="survey_view">
            <View
              dropDown={dropDown}
            />
          </div>
          <div className="survey_selection">
            <ChangesBar
              // handlePreview={handlePreview}
              currentIndex={currentIndex}
              dropDown={dropDown}
              // handlePublish={handlePublish}
              // linkPopup={linkPopup}
              // setLinkPopup={setLinkPopup}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSurvey;
