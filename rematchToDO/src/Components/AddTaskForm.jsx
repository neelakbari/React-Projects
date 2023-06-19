import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AddTaskForm = ({ newTask, setNewTask }) => {
  const dispatch = useDispatch();
  const addToDo = (payload) => dispatch.todos.add(payload);

  const handleAddTask = () => {
    addToDo({ id: Date.now(), title: newTask, ischecked: false });
    setNewTask("");
  };
  return (
    <>
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control-lg form-control"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-success btn-lg" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTaskForm;
