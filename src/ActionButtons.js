import { Link } from "react-router-dom";
import "./ActionButtons.css";

function ActionButtons(props) {

    const id = props.id;

    return (
        <div>
            {/* <button type="submit" onClick={() => {props.onDelete(id)}} className="action-buttons delete">{"Delete"}</button> */}
            <Link onClick={() => {props.onDelete(id)}} className="action-buttons delete">
                {"Delete"}
            </Link >

            <Link onClick={() => {props.onEdit(id)}} className="action-buttons edit">
                {"Edit"}
            </Link>
        </div>
    );

}

export default ActionButtons;