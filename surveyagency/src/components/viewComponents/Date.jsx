import React from "react";
import moment from "moment";
import { DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// { disabled, handleAnswer, answer,setError }
const Date = ({ disabled, handleAnswer, answer, setError }) => {
  console.log(answer)
  return (
    <div className="date">
      <DatePicker
        onFocus={() => setError("")}
        disabled={disabled}
        onChange={(e) => handleAnswer(e.format("DD-MM-YYYY"))}
        // value={answer ? moment(answer, "DD-MM-YYYY") : moment()}
      />  
      {console.log(answer)}
    </div>
  );
};

export default Date;
