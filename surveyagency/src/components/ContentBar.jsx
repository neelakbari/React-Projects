import { Menu } from "antd";
import { DeleteOutlined, PlusSquareFilled } from "@ant-design/icons";
import React from "react";
import { DropDownData } from "../data";
const { SubMenu } = Menu;


import "../scss/CreateSurvey.scss";
import { useDispatch, useSelector } from "react-redux";
import CustomIcon from "../components/CustomIcon";

import { addPage, changeCurrent, deletePage } from "../redux/reducers/surverDataSlice";
const ContentBar = () => {
  const surveyData = useSelector((state)=>state.surveyData);
  const dispatch = useDispatch()
  // console.log(surveyData)
  // console.log(survey)
  return (
    <>
      <div className="content_bar">
        <div className="Header">
          <span>content</span>
          <div className="icons">
            <Menu
              triggerSubMenuAction={"click"}
              mode="vertical"
              onClick={(e)=>dispatch(addPage(e.key))}
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
          {surveyData.page.map((data, index) => {
            return (
              <div
                className={`list ${data.id == surveyData.currentPage ? "active" : ""} `}
                key={index}
              >
                <div className="list_item_wrapper" >
                  <div className="list_item"onClick={()=>dispatch(changeCurrent(data.id))}>

                  {CustomIcon(DropDownData.filter((datas) => datas.id === data.dropDownId)[0].icon)}
                  <span>{data.id}</span>
                  </div>
                  <DeleteOutlined className="content-bar__lists__list__delete__icon"  onClick={()=>{dispatch(deletePage(data.id))}}/>
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
