import React from "react";
import { Input, Select, Switch, Upload, Button, Popover } from "antd";
import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import "../scss/View.scss";
import { left_align } from "../assets";

const { Option } = Select;

const ChangesBar = ({
  currentIndex,
  dropDown,
  DropDownData,
  survey,
  surveyId,
  LayoutData,
}) => {
  return (
    <div className="selection_bar">
      <div className="selection_bar_name">
        <Input
          type="text"
          value={survey.surveyName}
          placeholder="survey name"
          prefix={<img src={left_align} alt="" />}
        />
      </div>
      <div className="selection_bar_type">
        <span>Type</span>
        <Select
          onChange={(e) => handleChange(e, "dropDownId")}
          value={dropDown}
        >
          {DropDownData.map((type) => (
            <Option key={type.id}>
              
              {type.type}
            </Option>
          ))}
        </Select>
      </div>
      <div className="selection_bar_settings">
        <span>Settings</span>
        <div className="selection_bar_settings_req">
          <span>Required</span>
          <div>
            <Switch
             
              checked={survey.page[currentIndex].required}
            />
          </div>
        </div>
      </div>
      <div className="selection_bar_change">
        <span>Change Image</span>
        <div className="selection_bar_change_upload">
          <Upload
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />} />
          </Upload>
        </div>
      </div>
      <div className="selection_bar_layout">
        <span>Layout</span>
        <div className="selection_bar_layout_wrapper">
          {LayoutData.map((data) => {
            return (
              <div key={data.id}
                onClick={() => handleChange(data.id, "layout")}
                id={`${
                  survey.page[currentIndex].layout === data.id ? "selected" : ""
                }`}
                className="selection_bar_layout_wrapper_box"
              >
                {data.id}
              </div>
            );
          })}
        </div>
      </div>
      <div className="selection_bar_action">
        <button
          className="selection_bar_action_preview"
        >
          <EyeOutlined />
        </button>
      </div>
    </div>
  );
};

export default ChangesBar;
