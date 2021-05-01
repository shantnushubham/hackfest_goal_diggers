import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/General.css";
import { SignUpUserApi } from "../apis/User";

const SignUp = (props) => {
  const { user, setUser } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [upiId, setUpiId] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  useEffect(() => {
    user !== null && history.push("/");
  }, [history, user]);

  const onSubmitClick = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      upiId === "" ||
      phone === "" ||
      password === ""
    ) {
      setErrorMessage("Please fill in all the required fields.");
    }
    let userToAdd = {
      name,
      username: email,
      password,
      email,
      upiId,
      phone,
    };
    await SignUpUserApi(userToAdd)
      .then(({ data }) => {
        console.log(data.user);
        localStorage.setItem("loggedInUser", JSON.stringify(data));
        setUser(data.user);
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={"section"}>
      <h3>SignUp to PhonePe</h3>
      <form className={"uk-form-stacked"}>
        <div className={"uk-margin"}>
          <label className={"uk-form-label"}>Name: *</label>
          <div className={"uk-form-controls"}>
            <input
              className={"uk-input"}
              type={"text"}
              placeholder={"Enter your name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
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
        <div className={"uk-margin"}>
          <label className={"uk-form-label"}>UPI ID: *</label>
          <div className={"uk-form-controls"}>
            <input
              className={"uk-input"}
              type={"text"}
              placeholder={"Enter your UPI ID"}
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        </div>
        <div className={"uk-margin"}>
          <label className={"uk-form-label"}>Phone Number: *</label>
          <div className={"uk-form-controls"}>
            <input
              className={"uk-input"}
              type={"number"}
              placeholder={"Enter your Phone No."}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className={"auth-btn-div"}>
          <button className={"auth-btn"} onClick={(e) => onSubmitClick(e)}>
            SignUp
          </button>
          <legend>{errorMessage}</legend>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
