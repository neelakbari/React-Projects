import React from "react";
import "../scss/CreateSurvey.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentBar from "../components/ContentBar";
import View from "../components/viewComponents/View";
import { DropDownData, LayoutData } from "../data";
import ChangesBar from "../components/ChangesBar";

const CreateSurvey = (props) => {
  const { createId } = useParams();
  const surveys = useSelector((state) => state.survey);
  const surveyId = surveys.filter((survey) => survey.surveyId === createId)[0].surveyId
  const survey = surveys.filter((survey) => survey.surveyId === createId)[0]
    .surveyData;
  const currentIndex = survey?.page.findIndex(data => data.id === survey.currentPage);
  const dropDown = DropDownData.filter(data => data.id === +survey?.page[currentIndex].dropDownId)?.[0];

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
              dropDown={dropDown}
              image={survey.image}
            />
          </div>
          <div className="survey_selection">
            <ChangesBar
            // handlePreview={handlePreview}
            // handleChange={handleChange}
            currentIndex={currentIndex}
            dropDown={dropDown}
            DropDownData={DropDownData}
            survey={survey}
            LayoutData={LayoutData}
            // CustomIcon={CustomIcon} 
            // handlePublish={handlePublish}
            // linkPopup={linkPopup}
            surveyId={surveyId}
            // setLinkPopup={setLinkPopup}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSurvey;
