import { Input } from "antd";
import React from "react";
import { CloseCircleOutlined, CheckOutlined } from "@ant-design/icons";
import "../../scss/View.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addOption,
  deleteOption,
  updateOption,
} from "../../redux/reducers/surveySlice";
import { useParams } from "react-router-dom";

const MulitipleChoice = ({
  survey,
  disabled,
  type,
  option,
  preview = false,
  currentUserIndex,
}) => {
  const { createId } = useParams();
  const { surveyId } = useParams();

  const surveyData = useSelector((state) =>
    state.survey[currentUserIndex].data.find(
      (survey) => survey.surveyId === surveyId || createId
    )
  ).surveyData;
  const surveyPages = surveyData.page;
  const currentIndex = surveyPages.findIndex(
    (data) => data.id === surveyData.currentPage
  );
  const dispatch = useDispatch();
  return (
    <div className="multiple_choice">
      <div className="multiple_choice_wrapper">
        {surveyPages[currentIndex].option?.map((data) => {
          return (
            <div className="choice" key={data.id}>
              <span className="choice_number">{data.id}</span>
              <Input
                onChange={(e) =>
                  dispatch(
                    updateOption({surveyId:createId,
                      index: currentIndex,
                      value: e.target.value,
                      id: data.id,
                    })
                  )
                }
                type="text"
                value={data.value}
                readOnly={preview}
              />
              {!preview && (
                <CloseCircleOutlined
                  onClick={() =>
                    dispatch(deleteOption({surveyId:createId, index: currentIndex, id: data.id }))
                  }
                  className="choice_icon"
                  value={data.value}
                />
              )}
              {preview && <CheckOutlined className="choice_icon" />}
            </div>
          );
        })}
      </div>
      {!preview && (
        <div
          onClick={() => dispatch(addOption({surveyId:createId, index: currentIndex }))}
          className="multiplechoice_add"
        >
          Add choice
        </div>
      )}
    </div>
  );
};

export default MulitipleChoice;
