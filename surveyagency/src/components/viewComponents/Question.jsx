import React from "react";
import { Input } from 'antd';
import { ForwardOutlined } from '@ant-design/icons';

const Question = ({ handleChange, survey }) => {
  // console.log(handleChange, survey);
  return (
    <div className="question">
      <div className="question__left">
        <span>{survey.id}</span>
        <ForwardOutlined />
      </div>
      <div className="question__right">
        <div className="question__right__textInput">
          <Input
            onChange={(e) =>
              handleChange(e.target.value, "changeInput","question")
            }
            onBlur={(e)=>handleChange(e.target.value,"changeInput","question")}
            type="text"
            value={survey?.question}
            placeholder="Question"
          />
          <Input
            onChange={(e) =>
              handleChange(e.target.value, "changeInput", "description")
            }
            type="text"
            placeholder="Description (optional)"
            value={survey?.description}
          />
        </div>
      </div>
    </div>
  );
};

export default Question;
