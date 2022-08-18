import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Service from "./Service";

const LogoutButton = () => {
  const history = useHistory();

  const LogOutHandler = () => {
    Service.LogoutClearUUID(localStorage.getItem("uuid")).then((data) => {
      console.log("data in logout is", data);
      if (data.status === false) {
          localStorage.removeItem("uuid")
          history.push("/")
      }
    });
  };
  return (
    <Link to="/">
      <button
        type="submit"
        id="logout-button"
        class="btn btn-primary btn-block mb-4 bg-danger float-end"
        onClick={LogOutHandler}
      >
        {/* {state ? form : null} */}
        {/* {state} */}
        Logout
      </button>
    </Link>
  );
};

export default LogoutButton;
