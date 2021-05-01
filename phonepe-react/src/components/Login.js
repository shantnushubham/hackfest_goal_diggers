import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginApi } from "../apis/User";
import "../css/General.css";

const Login = (props) => {
  const { setUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  useEffect(() => {
    JSON.parse(localStorage.getItem("loggedInUser")) !== null &&
      history.push("/");
  }, [history]);

  const onSubmitClick = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setErrorMessage("Please fill in all required fields.");
    } else {
      await LoginApi(email, password)
        .then(({ data }) => {
          console.info(data);
          localStorage.setItem("loggedInUser", JSON.stringify(data));
          setUser(data.user);
          history.push("/");
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className={"section"}>
      <h3>Login to PhonePe</h3>
      <form className={"uk-form-stacked"}>
        <div className={"uk-margin"}>
          <label className={"uk-form-label"}>Email: *</label>
          <div className={"uk-form-controls"}>
            <input
              className={"uk-input"}
              type={"text"}
              placeholder={"Enter your Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={"uk-margin"}>
          <label className={"uk-form-label"}>Password: *</label>
          <div className={"uk-form-controls"}>
            <input
              className={"uk-input"}
              type={"password"}
              placeholder={"Enter your Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className={"auth-btn-div"}>
          <button className={"auth-btn"} onClick={(e) => onSubmitClick(e)}>
            Login
          </button>
          <legend>{errorMessage}</legend>
        </div>
      </form>
    </div>
  );
};

export default Login;
