import React from "react";
import { Input, Select, Switch, Upload, Button, Popover } from "antd";
import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import "../scss/View.scss";
import { left_align } from "../assets";
import { DropDownData, LayoutData } from "../data";

const { Option } = Select;

const ChangesBar = ({
  currentIndex,
  dropDown,
  survey,
  surveyId,
  handleChange,
}) => {
  return (
    <div className="selection_bar">
      <div className="bar_name">
        <Input
          type="text"
          value={survey.surveyName}
          onChange={(e)=>handleChange(e.target.value,"changeInput")}
          placeholder="survey name"
          prefix={<img src={left_align} alt="" />}
        />
      </div>
      <div className="bar_type">
        <span>Type</span>
        <Select
          onChange={(e) => handleChange(e, "dropDownId")}
          value={dropDown.type}
        >
          {DropDownData.map((type) => (
            <Option key={type.id}>
              
              {type.type}
            </Option>
          ))}
        </Select>
      </div>
      <div className="bar_setting">
        <div className="required">
          <span>Required</span>
          <div>
            <Switch
             onChange={(e) => handleChange(e,"required")}
              checked={survey.page[currentIndex].required}
            />
          </div>
        </div>
      </div>
      <div className="change">
        <span>Change Image</span>
        <div className="change_upload">
          <Upload
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} />
          </Upload>
        </div>
      </div>
      <div className="layout">
        <span>Layout</span>
        <div className="layout_wrapper">
          {LayoutData.map((data) => {
            return (
              <div key={data.id}
                onClick={() => handleChange(data.id, "layout")}
                id={`${
                  survey.page[currentIndex].layout === data.id ? "selected" : ""
                }`}
                className="layout_wrapper_box"
              >
                {data.id}
              </div>
            );
          })}
        </div>
      </div>
      <div className="action">
        <button
          className="action_preview"
        >
          <EyeOutlined />
        </button>
      </div>
    </div>
  );
};

export default ChangesBar;
