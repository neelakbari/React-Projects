import React, { useEffect, useState } from "react";
import Question from "./Question";
import "../../scss/View.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeInput } from "../../redux/reducers/surverDataSlice";

const Layout = ({
  image,
  ComponentToRender,
  disabled,
  type,
}) => {
  const surveyPages = useSelector((state) => state.surveyData.page);
  const dispatch = useDispatch();
  const currentIndex = useSelector((state) =>
  surveyPages.findIndex((data) => data.id === state.surveyData.currentPage)
);
  const [option, setoption] = useState([]);
  useEffect(() => {
    setoption(surveyPages[currentIndex].option);
  }, [surveyPages[currentIndex].option]);
  console.log(surveyPages[currentIndex])
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
    dispatch(changeInput({type:"option",value:temp}))
  };
  return (
    <div className="layout_one">
      <div className="image_wrapper">
        <img src={image} alt="image" />
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
            handleChoice={handleChoice}
            option={option}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
