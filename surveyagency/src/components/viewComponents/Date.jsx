import React from "react";
import moment from 'moment';
import { DatePicker } from 'antd';

const Date = ({disabled}) => {
  const answer =false;
  return (
    <div className="date">
      <DatePicker
        // onFocus={() => setError("")}
        disabled={disabled}
        onChange={(e) => handleAnswer(e.format("DD-MM-YYYY"))}
        value={answer ? moment(answer, "DD-MM-YYYY") : moment()}
      />
    </div>
  );
};

export default Date;
