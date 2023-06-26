import React, { useState } from "react";
import "../scss/CreateSurvey.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentBar from "../components/ContentBar";
import View from "../components/viewComponents/View";
import { DropDownData, LayoutData, pageLayout } from "../data";
import ChangesBar from "../components/ChangesBar";
import CustomIcon from "../components/CustomIcon";

const CreateSurvey = (props) => {
  const { createId } = useParams();
  const surveys = useSelector((state) => state.survey);
  const surveyId = surveys.filter((survey) => survey.surveyId === createId)[0]
    .surveyId;
  // const currentPage = surveys.filter((survey) => survey.surveyId === createId)[0]
  // .currentPage;
  const [survey, setSurvey] = useState(
    surveys.filter((survey) => survey.surveyId === createId)[0].surveyData
  );
  // const survey = surveys.filter((survey) => survey.surveyId === createId)[0]
  // .surveyData;
  const currentIndex = survey?.page.findIndex(
    (data) => data.id === survey.currentPage
  );
  const dropDown = DropDownData.filter((data) => {
    return data.id === +survey?.page[currentIndex].dropDownId;
  })?.[0];

  const handleChange = (value, type, name = "") => {
    let data = { ...survey };
    switch (type) {
      case "addPage": {
        data["currentPage"] = data.page.length + 1;
        let newPage = { ...pageLayout };
        newPage["id"] = data.page.length + 1;
        newPage["dropDownId"] = +value;
        data["page"] = [...data.page, newPage];
        break;
      }
      case "changeCurrent": {
        data["currentPage"] = value;
        break;
      }
      case "changeInput": {
        console.log(data);
        console.log(value);
        data["surveyName"] = value;
        break;
      }
      case "deletePage": {
        let index = data.page.findIndex((data) => data.id === +value);
        (data["currentPage"] = data.page[index - 1].id),
          data.page.splice(index, 1);
        if (index > -1) {
          let fixID = data.page.map((data, index) => {
            return {
              ...data,
              id: index + 1,
            };
          });
          data.page = fixID;
        }
      }
      case "dropDownId": {
        let update = data.page.map((dat) => ({
          ...dat,
          dropDownId: data.currentPage === dat.id ? +value : dat.dropDownId,
        }));
        data.page = update;
        break;
      }
      case "required":{
        let update = data.page.map((dat) => ({
          ...dat,
          required: data.currentPage === dat.id ? value : dat.required,
        }));
        data.page = update;
        break;
      }
      default:
        break;
    }
    setSurvey(data);
  };

  return (
    <>
      <div className="main_survey">
        <div className="survey_wrapper">
          <div className="survey_content">
            <ContentBar
              survey={survey.page}
              currentPage={survey.currentPage}
              handleChange={handleChange}
              customIcon={CustomIcon}
            />
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
              handleChange={handleChange}
              currentIndex={currentIndex}
              dropDown={dropDown}
              survey={survey}
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
