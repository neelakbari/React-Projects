import React from "react";
import "../scss/Workspace.scss";
import { plus } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { addSurvey } from "../redux/reducers/surveySlice";
import { initialData } from "../data";
import { v4 as uuidv4 } from "uuid";
import CreatedForm from "../components/CreatedForm";

const Workspace = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const dispatch = useDispatch();
  const surveyDb = JSON.parse(localStorage.getItem("surveyDatabase")) || [];
  const surveys = surveyDb.filter(
    (survey) => survey.userId === currentUser.email
  );
  const survey = useSelector((state) => state.survey);
  const addNewSurvey = {
    surveyData: initialData,
    userId: currentUser.email,
    surveyId: uuidv4(),
    response: [],
  };
  let data = survey.filter(
    (user) =>
      user.email === JSON.parse(localStorage.getItem("currentUser")).email
  )[0].data;
  return (
    <div className="workspace">
      <div className="workspace_wrapper">
        <div className="create_form">
          <div className="create_form_name">New Survey Form</div>
          <div
            className="create_form_icon"
            onClick={() => {
              dispatch(addSurvey(addNewSurvey));
            }}
          >
            <img src={plus} alt="" />
          </div>
        </div>

        {data?.map((survey) => {
          return <CreatedForm survey={survey} key={survey.surveyId} />;
        })}
      </div>
    </div>
  );
};

export default Workspace;
