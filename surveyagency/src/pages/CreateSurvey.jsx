import React, { useState } from "react";
import "../scss/CreateSurvey.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ContentBar from "../components/ContentBar";
import View from "../components/viewComponents/View";
import { DropDownData, pageLayout } from "../data";
import ChangesBar from "../components/ChangesBar";
import { Modal } from 'antd';
import PreviewPage from "../components/PreviewPage";
import { openModal } from "../redux/reducers/surverDataSlice";

const CreateSurvey = () => {
  const { createId } = useParams();
  const dispatch = useDispatch();
  // const surveys = useSelector((state) => state.survey);
  const survey = useSelector((state) => state.survey[1].data.find((survey)=>survey.surveyId === createId)).surveyData;
  // const surveyId = surveys.filter((survey) => survey.surveyId === createId)[0]
  //   .surveyId;
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
              currentIndex={currentIndex}
              dropDown={dropDown}
            />
          </div>
        </div>

        <Modal className="preview-modal" footer={null} open={survey.isModalOpen} closable={false} onCancel={()=>dispatch(openModal())} >
           <PreviewPage/>
        </Modal>  
      </div>
    </>
  );
};

export default CreateSurvey;
