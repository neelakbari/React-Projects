import { Menu } from "antd";
import { DeleteOutlined, PlusSquareFilled } from "@ant-design/icons";
import React from "react";
import { DropDownData } from "../data";
const { SubMenu } = Menu;

import "../scss/CreateSurvey.scss";
const ContentBar = ({ survey, currentPage, handleChange, customIcon }) => {
  return (
    <>
      <div className="content_bar">
        <div className="Header">
          <span>content</span>
          <div className="icons">
            <Menu
              triggerSubMenuAction={"click"}
              mode="vertical"
              onClick={(e) => handleChange(e.key, "addPage")}
            >
              <SubMenu
                key={SubMenu}
                icon={
                  <PlusSquareFilled className="icon_main" />
                }
              >
                {DropDownData.map((data) => {
                  return <Menu.Item key={data.id}>{data.type}</Menu.Item>;
                })}
              </SubMenu>
            </Menu>
          </div>
        </div>
        <div className="lists">
          {survey.map((data, index) => {
            // console.log(data)
            return (
              <div
                className={`list ${data.id == currentPage ? "active" : ""} `}
                key={index}
              >
                <div className="list_item_wrapper" >
                  <div className="list_item"onClick={(e)=>handleChange(data.id,"changeCurrent")}>

                  {customIcon(DropDownData.filter((datas) => datas.id === data.dropDownId)[0].icon)}
                  <span>{data.id}</span>
                  </div>
                  <DeleteOutlined className="content-bar__lists__list__delete__icon"  onClick={()=>handleChange(data.id,"deletePage")}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ContentBar;
