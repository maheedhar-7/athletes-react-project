import { Link } from "react-router-dom";
// import "./AddButton.css";




function AddButton() {
    
    return (
      <Link to="/athleteform">
          <button type="submit"  id="add-button" class="btn btn-primary">
            {/* {state ? form : null} */}
            {/* {state} */}
            Add Athlete
          </button>
      </Link>
    );
  }
  
  export default AddButton;
  