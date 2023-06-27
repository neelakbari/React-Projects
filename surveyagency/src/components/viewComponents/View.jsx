import Layout from "./Layout";
import Components from "../InputComponents";
import "../../scss/View.scss";

const View = ({  dropDown, image }) => {
  const ComponentToRender = Components[dropDown.component];
  let disabled = false;
  if (
    dropDown.component === "Textbox" ||
    dropDown.component === "Textarea" ||
    dropDown.component === "Date"
  ) {
    disabled = true;
  }
  return (
    <div className="view">
      <Layout
        image={image}
        type={dropDown.type}
        ComponentToRender={ComponentToRender}
        disabled={disabled}
      />
    </div>
  );
};

export default View;
