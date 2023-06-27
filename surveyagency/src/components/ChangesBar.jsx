import React from "react";
import { Input, Select, Switch, Upload, Button, Popover } from "antd";
import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import "../scss/View.scss";
import { left_align } from "../assets";
import { DropDownData, LayoutData } from "../data";
import { useDispatch, useSelector } from "react-redux";
import {
  changeName,
  dropDownId,
  fileUpload,
  layoutChange,
  openModal,
  required,
} from "../redux/reducers/surverDataSlice";

const { Option } = Select;

const ChangesBar = ({ currentIndex, dropDown }) => {
  const surveyData = useSelector((state) => state.surveyData);
  const dispatch = useDispatch();

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageSrc = reader.result;
      dispatch(fileUpload(imageSrc));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="selection_bar">
      <div className="bar_name">
        <Input
          type="text"
          value={surveyData.surveyName}
          onChange={(e) => dispatch(changeName(e.target.value))}
          placeholder="survey name"
          prefix={<img src={left_align} alt="" />}
        />
      </div>
      <div className="bar_type">
        <span>Type</span>
        <Select onChange={(e) => dispatch(dropDownId(e))} value={dropDown.type}>
          {DropDownData.map((type) => (
            <Option key={type.id}>{type.type}</Option>
          ))}
        </Select>
      </div>
      <div className="bar_setting">
        <div className="required">
          <span>Required</span>
          <div>
            <Switch
              onChange={(e) => dispatch(required(e))}
              checked={surveyData.page[currentIndex].required}
            />
          </div>
        </div>
      </div>
      <div className="change">
        <span>Change Image</span>
        <div className="change_upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            id="file-upload"
          />
          <label htmlFor="file-upload" className="custom-upload-button">
            <UploadOutlined />
          </label>
        </div>
      </div>
      <div className="layout">
        <span>Layout</span>
        <div className="layout_wrapper">
          {LayoutData.map((data) => {
            return (
              <div
                key={data.id}
                onClick={() =>
                  dispatch(layoutChange({ index: currentIndex, id: data.id }))
                }
                id={`${
                  surveyData.page[currentIndex].layout === data.id
                    ? "selected"
                    : ""
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
          onClick={() => dispatch(openModal())}
        >
          <EyeOutlined />
        </button>
      </div>
    </div>
  );
};

export default ChangesBar;
