import React from "react";
import "../scss/CreateSurvey.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentBar from "../components/ContentBar";
import View from "../components/View";

const CreateSurvey = (props) => {
  const { createId } = useParams();
  const surveys = useSelector((state) => state.survey);
  const survey = surveys.filter((survey) => survey.surveyId === createId)[0]
    .surveyData;
  const currentIndex = survey?.page.findIndex(data => data.id === survey.currentPage);
  
  return (
    <>
      <div className="main_survey">
        <div className="survey_wrapper">
          <div className="survey_content">
            <ContentBar survey={survey.page} currentPage={survey.currentPage} />
          </div>
          <div className="survey_view">
            <View
              // handleChange={handleChange}
              survey={survey.page[currentIndex]}
              // dropDown={dropDown}
              image={survey.image}
            />
          </div>
          <div className="survey_selection">
            <h1>ContentBar</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSurvey;
