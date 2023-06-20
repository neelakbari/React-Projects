import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

const ToDo = ({ todo, setUpdateData, }) => {
  const descriptions = {};
  const dispatch = useDispatch();
  const deleteToDo = (payload) => dispatch.todos.remove(payload);
  const checkToDo = (payload) => dispatch.todos.check(payload);
  const toggleDescription = (payload) =>
    dispatch.todos.toggleDescription(payload);
  const handleDescriptionChange = (id, value) => {
    descriptions[id] = value;
  };
  const updateDescription = (task) => {
    const descriptionValue = descriptions[task.id];
    if (descriptionValue) {
      dispatch.todos.updateDescription({
        id: task.id,
        description: descriptionValue,
      });
    }
    toggleDescription(task)
  };

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
                    <span title="Add Description">
                      <FontAwesomeIcon
                        icon={faSortDown}
                        onClick={() => toggleDescription(task)}
                      />
                    </span>
                  </div>
                  <div className="description_container">
                    {task.isDescriptionOpen && (
                      <>
                        <input
                          type="text"
                          placeholder="Enter description"
                          required
                          defaultValue={task.description }
                          onChange={(e) =>
                            handleDescriptionChange(task.id, e.target.value)
                          }
                        />
                        <button onClick={() => updateDescription(task)}>
                          Add description
                        </button>
                      </>
                    )}
                    {!task.isDescriptionOpen && task.description && <p>{task.description}</p>}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
};

export default ToDo;
