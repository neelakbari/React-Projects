import Layout from "./Layout";
import Components from "../InputComponents";
import "../../scss/View.scss";

const View = ({ survey, dropDown, handleChange, image }) => {
  const ComponentToRender = Components[dropDown.component];
  let disabled = false;
  console.log(dropDown.component);
  if (
    dropDown.component === "Textbox" ||
    dropDown.component === "Textarea" ||
    dropDown.component === "Date"
  ) {
    disabled = true;
    console.log("called");
  }
  return (
    <div className="view">
      <Layout
        survey={survey}
        image={image}
        handleChange={handleChange}
        type={dropDown.type}
        ComponentToRender={ComponentToRender}
        disabled={disabled}
      />
    </div>
  );
};

export default View;
