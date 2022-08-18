import { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Service from "./Service";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState({});
  const [show, setShow] = useState(false);

  const history = useHistory();

  useEffect(() => {
    console.log("This is useeffect output");
    if (localStorage.getItem("uuid") !== null) {
      console.log(localStorage.getItem("uuid"));
      Service.continueLogin(localStorage.getItem("uuid")).then((data) => {
        console.log("outputting useeffect data", data);
        history.push("/activitydetails/" + data.athleteId);
      });
    } else {
      history.push("/");
    }
  }, []);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  

  const loginHandler = () => {
    setEmail("");
    setPassword("");

    Service.validator(email, password).then((logindata) => {
      console.log("login data is ", logindata);
      setLogin(logindata);

      const tokenId = localStorage.getItem("uuid");
      if (tokenId !== null) {
        Service.continueLogin(tokenId).then((data) => {
          console.log("continue data is >> ", data);
          history.push("/activitydetails/" + data.Athlete_Id);
        });
      }

      if (logindata !== undefined) {
        if (logindata.uuid) {
          Service.setUUID(logindata.uuid);
          console.log("This is logindata>>>> ", logindata.uuid);
          history.push("/activitydetails/" + logindata.athleteId);
          setLogin(logindata);
          console.log(login);
        } else {
          history.push("/");
          hiddenLogInfo();
        }
      } else {
      }
    });
  };

  const hiddenLogInfo = () => {
    setShow(!show);
  };

  return (
    <section class="vh-50 gradient-custom">
      <div class="container py-5 h-50">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white">
              <div class="card-body p-3 text-center">
                <div class="mb-md-2 mt-md-4 pb-2">
                  <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                  <p class="text-white-50 mb-3">
                    Please enter your login and password!
                  </p>

                  <div class="text-danger">
                    {show ? (
                      <p class="text-50 mb-3" className={() => setShow(!show)}>
                        Email or Password incorrect!
                      </p>
                    ) : null}
                  </div>

                  <div class="form-outline form-white mb-4">
                    <label class="form-label" for="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      class="form-control form-control-lg"
                      onChange={onEmailChange}
                      value={email}
                    />
                  </div>

                  <div class="form-outline form-white mb-4">
                    <label class="form-label" for="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={onPasswordChange}
                      value={password}
                      class="form-control form-control-lg"
                    />
                  </div>

                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={loginHandler}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
