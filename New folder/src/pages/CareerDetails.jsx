import React from "react";
import { useLoaderData } from "react-router-dom";

// data loader
export const careerDetailsLoader = async ({ params }) => {
    const { careerId } = params
  
    const res = await fetch('http://localhost:5000/careers/' + careerId)
    if (!res.ok) {
        throw Error("Could not find that career")
    }
  
    return res.json()
  }
const CareerDetails = () => {
  const career = useLoaderData();
  return (
    <div className="career-details">
      <h2>Career Details for {career.title}</h2>
      <p>Starting salary: {career.salary}</p>
      <p>Location: {career.location}</p>
      <div className="details">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta sed
          sunt ipsam quam assumenda quasi ipsa facilis laborum rerum voluptatem!
        </p>
      </div>
    </div>
  );
};

export default CareerDetails;
