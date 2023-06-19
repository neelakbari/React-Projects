import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

const ToDo = ({ todo, setUpdateData }) => {
  const dispatch = useDispatch();
  const deleteToDo = (payload) => dispatch.todos.remove(payload);
  const checkToDo = (payload) => dispatch.todos.check(payload);

  return (
    <div>
      {/* display todo */}
      {todo &&
        todo
          .sort((a, b) => (b.id > a.id ? -1 : 1))
          .map((task, index) => {
            return (
              <React.Fragment key={index}>
                <div className="col taskbg">
                  <div className={task.ischecked ? "done" : ""}>
                    <span className=" textNumber">{index + 1} </span>
                    <span className="tasktext">{task.title} </span>
                  </div>
                  <div className="iconswrap">
                    <span title="Completed / Not Completed">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        onClick={() => checkToDo(task)}
                      />
                    </span>
                    {task.ischecked ? null : (
                      <span title="Edit">
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() =>
                            setUpdateData({
                              id: task.id,
                              title: task.title,
                              ischecked: task.ischecked,
                            })
                          }
                        />
                      </span>
                    )}

                    <span title="Delete">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        onClick={() => deleteToDo(task)}
                      />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
};

export default ToDo;
