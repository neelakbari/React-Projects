import React from "react";
import { Input } from 'antd';
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";
import { DropDownData, getPlaceholder } from "../../data";
import { useParams } from "react-router-dom";

const TextBox = ({disabled, answer, handleAnswer, setError,currentUserIndex}) => {
  const { createId } = useParams();
  const { surveyId } = useParams();
  const surveyData = useSelector((state) =>{
  return  state.survey[currentUserIndex].data.find(
      (survey) => survey.surveyId === surveyId || createId
    )
}).surveyData;
  const dropDownType = DropDownData.filter((data)=>data.id ===surveyData.page[surveyData.currentPage -1].dropDownId)[0].type
  const placeholder = getPlaceholder(dropDownType)
  return (
    <div className="textbox">
      <Input
        onFocus={() => setError("")}
        onChange={(e) => handleAnswer(e.target.value)}
        disabled={disabled}
        type="text"
        placeholder={placeholder}
        value={answer}
      />
    </div>
  );
};

export default TextBox;
