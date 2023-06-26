import React from "react";
import Question from "./Question";
import '../../scss/View.scss';


const Layout = ({ survey, image, ComponentToRender, type }) => {
  return (
    <div className="layout_one">
      <div className="image_wrapper">
        <img src={image} alt="image" />
      </div>
      <div className="input_wrapper">
        <div className="Question">
          <Question survey={survey} />
        </div>
        <div className="answer">
          <ComponentToRender
            survey={survey}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
