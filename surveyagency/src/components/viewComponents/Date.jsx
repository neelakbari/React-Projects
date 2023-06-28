import React from "react";
import moment from 'moment';
import { DatePicker } from 'antd';

const Date = ({disabled}) => {
  const answer =false;
  return (
    <div className="date">
      <DatePicker
        disabled={disabled}
        value={ moment()}
      />
    </div>
  );
};

export default Date;
