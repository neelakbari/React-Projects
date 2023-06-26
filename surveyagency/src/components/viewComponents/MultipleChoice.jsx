import { Input } from "antd";
import React from "react";
import { CloseCircleOutlined, CheckOutlined } from "@ant-design/icons";
import "../../scss/View.scss";

const MulitipleChoice = ({ survey, disabled, type, handleChoice, option }) => {
  return (
    <div className="multiple_choice">
      <div className="multiple_choice_wrapper">
        {option?.map((data) => {
          return (
            <div className="choice" key={data.id}>
              <span className="choice_number">{data.id}</span>
              <Input
                onChange={(e) => handleChoice("input", e.target.value, data.id)}
                type="text"
                value={data.value}
              />
              {
                <CloseCircleOutlined
                  onClick={() => handleChoice("delete", null, data.id)}
                  className="choice_icon"
                  value={data.value}
                />
              }
            </div>
          );
        })}
      </div>
      <div
        onClick={() => handleChoice("add", null, null)}
        className="multiplechoice_add"
      >
        Add choice
      </div>
    </div>
  );
};

export default MulitipleChoice;
