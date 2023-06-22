import React from "react";
import { NavLink, useLoaderData } from "react-router-dom";

const Career = () => {
    const careers = useLoaderData();
    return (
        <div className="careers">
      {careers.map((career) => {
        return (
            <NavLink to={`${career.id}`} key={career.id}>
            <p>{career.title}</p>
            <p>{career.salary}</p>
            <p> Based in {career.location}</p>
          </NavLink>
          );
        })}
    </div>
  );
};

export default Career;

export const careersLoader = async () => {
  const res = await fetch("http://localhost:5000/careers");
  return res.json();
};