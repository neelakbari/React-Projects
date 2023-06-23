import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSurvey } from "../redux/reducers/surveySlice";


const CreatedForm = ({ survey }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <>
      <div className="form">
        <div
          className="form_name"
          onClick={() => navigate(`/workspace/create/${survey.surveyId}`)}
        >
          {survey.surveyData.surveyName}
        </div>
        <div className="form_footer">
          <div className="footer_response">
            {survey.response.length === 0 ? (
              <div className="created-form__footer__response">no response</div>
            ) : (
              <div className="created-form__footer__response-found">
                {survey.response.length} response
              </div>
            )}
          </div>
          <div className="footer_delete" onClick={()=>dispatch(deleteSurvey(survey.surveyId))}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatedForm;
