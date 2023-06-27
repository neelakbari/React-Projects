import React, { useEffect, useState } from "react";
import Question from "./Question";
import "../../scss/View.scss";
import { useDispatch, useSelector } from "react-redux";

const Layout = ({ ComponentToRender, disabled, type }) => {
  const surveyPages = useSelector((state) => state.surveyData.page);
  const surveyData = useSelector((state) => state.surveyData);
  const currentIndex = useSelector((state) =>
    surveyPages.findIndex((data) => data.id === state.surveyData.currentPage)
  );
  const [option, setoption] = useState([]);
  useEffect(() => {
    setoption(surveyPages[currentIndex].option);
  }, [surveyPages[currentIndex].option]);
  return (
    <div
      className={`layout_one ${
        surveyPages[currentIndex].layout === 2 ? "layout_two" : ""
      }`}
    >
      <div
        className={`image_wrapper ${
          surveyPages[currentIndex].layout === 3
            ? "image_wrapper_layout_three"
            : ""
        }`}
      >
        <img
          src={surveyPages[currentIndex].image || surveyData.image}
          alt="image"
        />
      </div>
      <div className="input_wrapper">
        <div className="Question">
          <Question />
        </div>
        <div className="answer">
          <ComponentToRender
            survey={surveyPages}
            disabled={disabled}
            type={type}
            option={option}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
