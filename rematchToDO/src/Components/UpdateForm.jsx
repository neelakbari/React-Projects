import { useDispatch } from "react-redux";

const UpdateForm = ({ updateData, setUpdateData }) => {
  const dispatch = useDispatch();
  const updateTodo = (payload) => dispatch.todos.update(payload);
  const handleUpdate = () => {
    if (updateData.title.trim().length < 15) {
      updateTodo(updateData);
      setUpdateData("");
    }else{
      alert("Title Cannot be greater Than 15 characters")
      setUpdateData("")
    }
  };
  const changeTask = (e) => {
    setUpdateData({
      ...updateData,
      title: e.target.value,
    });
  };
  return (
    <>
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control form-control-lg"
            value={updateData && updateData.title}
            onChange={(e) => changeTask(e)}
          />
        </div>
        <div className="col-auto">
          <button
            className="btn btn-lg btn-success me-4"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="btn btn-lg btn-danger"
            onClick={() => setUpdateData("")}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateForm;
