import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <NavLink to={"/"}>Home </NavLink>
          <NavLink to={"/table1"}>Table 1</NavLink>
          <NavLink to={"/table2"}>Table 2</NavLink>
        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>

  );
};

export default RootLayout;
