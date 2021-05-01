import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/General.css";

const PCashSend = (props) => {
  const { user } = props;
  const history = useHistory();
  let upiId = JSON.parse(props.location.state).upiId;

  useEffect(() => {
    user === null && history.push("/");
  }, [user, history]);

  const [amount, setAmount] = useState("");

  return (
    <>
      <div className={"section"}>
        <h3>Enter Amount</h3>
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
            <button className={"auth-btn"}>Generate QR</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PCashSend;
