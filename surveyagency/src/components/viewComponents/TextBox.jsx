import React from "react";
import { Input } from 'antd';
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";
import { DropDownData, getPlaceholder } from "../../data";

const TextBox = ({disabled}) => {
  const state = useSelector((state)=>state.surveyData)
  const dropDownType = DropDownData.filter((data)=>data.id ===state.page[state.currentPage -1].dropDownId)[0].type
  const placeholder = getPlaceholder(dropDownType)
  return (
    <div className="textbox">
      <Input
        onFocus={() => setError("")}
        onChange={(e) => handleAnswer(e.target.value)}
        disabled={disabled}
        type="text"
        placeholder={placeholder}
        // value={answer}
      />
    </div>
  );
};

export default TextBox;
