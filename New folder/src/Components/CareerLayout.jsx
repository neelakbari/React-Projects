import React from "react";
import { Outlet } from "react-router-dom";

const CareerLayout = () => {
  return (
    <div className="careers-layout">
      <h4>Careers</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
        nostrum?
      </p>
      <Outlet />
    </div>
  );
};

export default CareerLayout;
