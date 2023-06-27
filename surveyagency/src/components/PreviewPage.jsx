import React from "react";
import { useParams } from "react-router-dom";
import "../scss/Preview.scss";
import { useSelector } from "react-redux";
import Question from "./viewComponents/Question";
import { Button, message } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, WarningFilled } from '@ant-design/icons';
import { DropDownData } from "../data";
import Components from "./InputComponents";

const PreviewPage = () => {
  const { createId } = useParams();
  console.log(createId);
  const survey = useSelector((state)=>state.surveyData);
  const currentIndex = survey?.page.findIndex(
    (data) => data.id === survey.currentPage
  );
  const dropDown = DropDownData.filter((data) => {
    return data.id === +survey?.page[currentIndex].dropDownId;
  })?.[0];
  const ComponentToRender = Components[dropDown.component];

  const pageIndex = 0
  return (
    <div
      className={`container ${
        survey?.page[pageIndex]?.layout === 3 ? "container-layout" : ""
      }`}
    >
      {survey?.page?.[pageIndex] && (
        <>
          <div
            id={`${createId ? "preview-mode" : ""}`}
            className={`container__preview  ${
              survey.page[pageIndex]?.layout === 2
                ? "container__layout-two"
                : ""
            }`}
          >
            <div
              id={`${createId ? "preview-mode" : ""}`}
              className={`container__preview__left ${
                survey.page[pageIndex]?.layout === 3
                  ? "container__preview__layout-three"
                  : ""
              }`}
            >
              <img src={survey.image} alt="" />
            </div>
            <div
              id={`${createId ? "preview-mode" : ""}`}
              className="container__preview__right"
            >
              <div className="preview__right__question">
                <Question survey={survey.page[pageIndex]} />
              </div>
              <div className="container__preview__right__answer">
                <ComponentToRender
                //   setError={setError}
                //   compData={compData}
                //   handleAnswer={handleAnswer}
                //   answer={survey.page[pageIndex]?.answer}
                //   choice={survey.page[pageIndex]?.option}
                  preview={true}
                />
              </div>
              <div className="container__preview__right__submit">
                <button
                //   onClick={() => {
                //     handleSubmit();
                //   }}
                >
                  {survey.page.length === pageIndex + 1 ? "Submit" : "Ok"}
                </button>
              </div>
              {/* {error && (
                <div className="container__preview__right__error">
                  <WarningFilled />
                  <span>{error}</span>
                </div>
              )} */}
            </div>
            <div className="container__submit">
              {!survey.page[pageIndex]?.required && (
                <button
                //   onClick={() => handleChange("next")}
                  className="container__submit__skip"
                >
                  Skip
                </button>
              )}
              <div className="container__submit__changePage">
                <Button
                  disabled={pageIndex === survey.page.length - 1}
                //   onClick={() => handleChange("next")}
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
