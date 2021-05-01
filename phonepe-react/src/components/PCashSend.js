import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/General.css";

const PCashSend = (props) => {
  const { user } = props;
  const history = useHistory();

  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  useEffect(() => {
    user === null && history.push("/");
  }, [user, history]);

  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const onButtonClick = (e) => {
    e.preventDefault();
    if (amount > loggedInUser.wallet.user.amount) {
      setErrorMessage(
        `Please select a value lower than ${loggedInUser.wallet.user.amount} `
      );
    }
    setErrorMessage("");
  };

  return (
    <>
      <div className={"section"}>
        <h3>Enter Amount</h3>
        <h4>
          Amount Left: {" "}
          <span className={"avail-amount"}>
            {currencyFormatter.format(loggedInUser.wallet.user.amount)}
          </span>
        </h4>
        <form className={"uk-form-stacked"}>
          <div className={"uk-margin"}>
            <label className={"uk-form-label"}>Amount: *</label>
            <div className={"uk-form-controls"}>
              <input
                className={"uk-input"}
                type={"number"}
                placeholder={"Enter your amount"}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className={"auth-btn-div"}>
            <button className={"auth-btn"} onClick={(e) => onButtonClick(e)}>
              Generate QR
            </button>
          </div>
        </form>
        {errorMessage !== "" && (
          <div className={"uk-alert-danger"} uk-alert={""}>
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PCashSend;
