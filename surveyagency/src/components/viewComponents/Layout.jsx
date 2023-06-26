import React, { useEffect, useState } from "react";
import Question from "./Question";
import "../../scss/View.scss";

const Layout = ({
  survey,
  image,
  ComponentToRender,
  disabled,
  type,
  handleChange,
}) => {
  const [option, setoption] = useState([]);
  useEffect(() => {
    setoption(survey.option);
  }, [survey.option]);
  const handleChoice = (type, value, id) => {
    let temp = option?.length > 0 ? [...option] : [];
    switch (type) {
      case "add": {
        temp.push({
          id: +option.length + 1,
          value: "",
        });
        break;
      }
      case "input": {
        temp = temp.map((data) => {
          return {
            ...data,
            value: data.id === id ? value : data.value,
          };
        });
        break;
      }
      case "delete": {
        temp = temp
          .filter((data) => data.id !== id)
          .map((data, index) => {
            return {
              ...data,
              id: +index + 1,
            };
          });
        break;
      }
      default:
        break;
    }
    setoption(temp);
    handleChange(temp, "changeInput", "option");
  };
  return (
    <div className="layout_one">
      <div className="image_wrapper">
        <img src={image} alt="image" />
      </div>
      <div className="input_wrapper">
        <div className="Question">
          <Question survey={survey} handleChange={handleChange} />
        </div>
        <div className="answer">
          <ComponentToRender
            survey={survey}
            disabled={disabled}
            type={type}
            handleChoice={handleChoice}
            option={option}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
