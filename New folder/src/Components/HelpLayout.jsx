import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const HelpLayout = () => {
  return (
    <>
      <div className="help-layout">
        <h2>Website Help</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, eveniet laboriosam blanditiis sunt laudantium maiores aut! Est accusamus, fugit quos quibusdam sint molestiae aperiam animi.</p>
        <nav>
          <NavLink to={"faq"}> FAQ</NavLink>
          <NavLink to={"contact"}> Contact</NavLink>
        </nav>
        <Outlet />
      </div>
    </>
  );
};

export default HelpLayout;
