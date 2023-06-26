import React, { useState } from "react";
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
  const [option, setoption] = useState([...survey.option]);
  console.log(option);
  const handleChoice = (type, value, id) => {
    switch (type) {
      case "add":
        {
          const newOption = {
            id: +option.length + 1,
            value: "",
          };
          setoption([...option, newOption]);
          break;
        }
        case "input":{
          let updatedOption = option.map((data)=>{
            return {
              ...data,
              value:data.id === id?value:data.value
            }
          })
          setoption(updatedOption)
          break
        }
        case "delete":{
          let updatedOption = option.filter((data)=>data.id!==id).map((data,index)=>{
            return {
              ...data,
              id:+index+1
            }
          })
          setoption(updatedOption)
          break;
        }
      default:
        break;
    }
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
