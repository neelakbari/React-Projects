import React from "react";
import { Input } from "antd";
import { ForwardOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { changeInput } from "../../redux/reducers/surverDataSlice";

const Question = ({preview=false,pageIndex}) => {
  const surveyPages = useSelector((state) => state.surveyData.page);
  let currentIndex;
  preview ?(currentIndex = pageIndex ): (currentIndex = useSelector((state) =>
    surveyPages.findIndex((data) => data.id === state.surveyData.currentPage)
  ))
  
  const dispatch = useDispatch();
  return (
    <div className="question">
      <div className="question__left">
        <span>{surveyPages[currentIndex].id}</span>
        <ForwardOutlined />
      </div>
      <div className="question__right">
        <div className="question__right__textInput">
          <Input
            onChange={(e) =>
              dispatch(changeInput({type:"question",value:e.target.value}))
            }
            type="text"
            value={surveyPages[currentIndex]?.question}
            placeholder="Question"
          />
          <Input
            onChange={(e) =>
              dispatch(changeInput({type:"description",value:e.target.value}))
            }
            type="text"
            placeholder="Description (optional)"
            value={surveyPages[currentIndex]?.description}
          />
        </div>
      </div>
    </div>
  );
};

export default Question;
