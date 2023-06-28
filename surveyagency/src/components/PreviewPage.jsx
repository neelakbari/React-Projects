import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/Preview.scss";
import { useSelector } from "react-redux";
import Question from "./viewComponents/Question";
import { Button } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { DropDownData } from "../data";
import Components from "./InputComponents";

const PreviewPage = () => {
  const { createId } = useParams();
  const survey = useSelector((state) => state.surveyData);
  const [pageIndex, setPageIndex] = useState(0);
  const dropDown = DropDownData.filter((data) => {
    return data.id === +survey?.page[pageIndex].dropDownId;
  })?.[0];
  const ComponentToRender = Components[dropDown.component];

  const handleChange = (type) => {
    if (survey.page[pageIndex]?.required) {
      alert("This answer is required");
      return false;
    }
    type === "prev" && pageIndex !== 0
      ? setPageIndex(pageIndex - 1)
      : setPageIndex(pageIndex + 1);
  };
  return (
    <div
      className={`container ${
        survey?.page[pageIndex]?.layout === 3 ? "container_layout" : ""
      }`}
    >
      {survey?.page?.[pageIndex] && (
        <>
          <div
            id={`${createId ? "preview_mode" : ""}`}
            className={`container_preview  ${
              survey.page[pageIndex]?.layout === 2 ? "container_layout_two" : ""
            }`}
          >
            <div
              id={`${createId ? "preview_mode" : ""}`}
              className={`image_wrapper ${
                survey.page[pageIndex]?.layout === 3
                  ? "container_preview_layout_three"
                  : ""
              }`}
            >
              <img src={survey.page[pageIndex].image || survey.image} alt="" />
            </div>
            <div
              id={`${createId ? "preview_mode" : ""}`}
              className="container_preview_right"
            >
              <div className="preview__right__question">
                <Question preview={true} pageIndex={pageIndex} />
              </div>
              <div className="container_preview_right_answer">
                <ComponentToRender preview={true} />
              </div>
              <div className="container_preview_right_submit">
                <button>
                  {survey.page.length === pageIndex + 1 ? "Submit" : "Ok"}
                </button>
              </div>
            </div>
            <div className="container_submit">
              {!survey.page[pageIndex]?.required && (
                <button
                  onClick={() => handleChange("next")}
                  className="container_submit_skip"
                >
                  Skip
                </button>
              )}
              <div className="container_submit_changePage">
                <Button
                  disabled={pageIndex === survey.page.length - 1}
                  onClick={() => handleChange("next")}
                >
                  <ArrowDownOutlined />
                </Button>
                <Button
                  disabled={pageIndex === 0}
                  onClick={() => handleChange("prev")}
                >
                  <ArrowUpOutlined />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PreviewPage;
