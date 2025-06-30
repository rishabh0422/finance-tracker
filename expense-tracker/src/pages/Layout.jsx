import React from "react";
import SideBar from "../components/SideBar";

const Layout = ({children}) => {
  return (
    <div className="d-flex">
      <div style={{ width: "250px", minHeight: "100vh" }}>
        <SideBar />
      </div>
      <div className="flex-grow-1 bg-light p-4 vh-100 overflow-auto ">
            {children}
      </div>
    </div>
  );
};

export default Layout;
