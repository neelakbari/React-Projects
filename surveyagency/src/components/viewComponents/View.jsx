import Layout from './Layout';
import Components from '../InputComponents';
import '../../scss/View.scss';


const View = ({ survey, dropDown, handleChange, image }) => {
    const ComponentToRender = Components[dropDown.component];
    let disabled = false;

    if (dropDown.component === "Textbox" || "Textarea" || "Date" ) {
        disabled = true;
    }
    return (
        <div className="view">
            <Layout 
                survey={survey}
                image={image}
                // handleChange={handleChange}
                type={dropDown.type}
                ComponentToRender={ComponentToRender}
                // disabled={disabled} 
            />
        </div>
    )
}

export default View