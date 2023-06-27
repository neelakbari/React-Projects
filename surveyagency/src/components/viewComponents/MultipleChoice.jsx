import { Input } from "antd";
import React from "react";
import { CloseCircleOutlined, CheckOutlined } from "@ant-design/icons";
import "../../scss/View.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addOption,
  deleteOption,
  updateOption,
} from "../../redux/reducers/surverDataSlice";

const MulitipleChoice = ({
  survey,
  disabled,
  type,
  option,
  preview = false,
}) => {
  const surveyPages = useSelector((state) => state.surveyData.page);
  const currentIndex = useSelector((state) =>
    surveyPages.findIndex((data) => data.id === state.surveyData.currentPage)
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
                    updateOption({
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
                    dispatch(deleteOption({ index: currentIndex, id: data.id }))
                  }
                  className="choice_icon"
                  value={data.value}
                />
              )}
              {preview  && (
                <CheckOutlined className="multiple-choice__wrapper__choice__icon" />
              )}
            </div>
          );
        })}
      </div>
      {!preview && (
        <div
          onClick={() => dispatch(addOption({ index: currentIndex }))}
          className="multiplechoice_add"
        >
          Add choice
        </div>
      )}
    </div>
  );
};

export default MulitipleChoice;
