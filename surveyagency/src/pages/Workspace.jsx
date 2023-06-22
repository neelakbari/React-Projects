import React from "react";
import "../scss/Workspace.scss";
import { plus } from "../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Workspace = () => {
    const navigate = useNavigate()
  return (
    <div className="workspace">
      <div class="workspace_wrapper">
        <div class="create_form">
          <div class="create_form_name">New Survey Form</div>
          <div class="create_form_icon">
            <img src={plus} alt="" />
          </div>
        </div>
        <div class="form">
          <div class="form_name" onClick={()=>navigate("/workspace/create/1")}>My Survey</div>
          <div class="form_footer">
              <div class="footer_response">no response</div>
            <div class="footer_delete">
            <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
