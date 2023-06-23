import { Menu } from "antd";
import { DeleteOutlined, PlusSquareFilled } from "@ant-design/icons";
import React from "react";
import { DropDownData } from "../data";
const { SubMenu } = Menu;

import "../scss/CreateSurvey.scss"
const ContentBasr = ({survey ,currentPage}) => {
  return (
    <>
      <div className="content_bar">
        <div className="Header">
          <span>content</span>
          <div className="icons">
            <Menu triggerSubMenuAction={"click"} mode="vertical">
              <SubMenu
                key={SubMenu}
                icon={
                  <PlusSquareFilled className="content-bar__header__icon__main" />
                }>
              {DropDownData.map((data)=>{
                return (<Menu.Item key={data.id}>{data.type}</Menu.Item>)
              })}
              </SubMenu>
            </Menu>
          </div>
        </div>
        <div className="lists">
            {survey.map((data,index)=>{
              return <div className={`list ${data.id==currentPage?"active":"" } `} key={index}>
                <div className="list_item">
                  {index}
                  <span>{data.id}</span>
                  <DeleteOutlined className="content-bar__lists__list__delete__icon"/>
                </div>
              </div>
            })}
        </div>
      </div>
    </>
  );
};

export default ContentBasr;
