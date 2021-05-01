import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GetBalanceApi, AddPCashApi } from "../apis/Money";

const PCashScreen = (props) => {
  const { user } = props;
  const history = useHistory();
  const [balance, setBalance] = useState(0);
  const [amountToAdd, setAmountToAdd] = useState("");
  const [pin, setPin] = useState("");
  const [successMessage, setSuccessMessage] = useState({
    success: false,
    data: "",
  });

  useEffect(() => {
    user === null && history.push("/login");

    fetchBalance();
  }, [user, history]);

  const fetchBalance = async () => {
    await GetBalanceApi()
      .then(({ data }) => {
        console.info(data);
        setBalance(data.bankData.amount);
      })
      .catch((error) => console.error(error));
  };

  const addPCash = async () => {
    await AddPCashApi(pin, Number(amountToAdd))
      .then(({ data }) => {
        console.info(data);
        setBalance(balance - amountToAdd);
        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            ...loggedInUser,
            wallet: {
              ...loggedInUser.wallet,
              user: {
                ...loggedInUser.wallet.user,
                amount: balance - amountToAdd,
              },
            },
          })
        );
        setSuccessMessage({
          success: true,
          data: "Amount was successfully added.",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const onSubmitClick = (e) => {
    e.preventDefault();
    addPCash();
  };

  return (
    <div className={"section"}>
      <div uk-grid={""} className={"uk-child-width-expands@s"}>
        <div>
          <div className={"uk-card uk-card-default uk-card-small uk-card-body"}>
            <h3 className={"uk-card-title"}>Balance:</h3>
            <span className={"avail-amount"}>
              {currencyFormatter.format(balance)}
            </span>
          </div>
        </div>

        <div>
          <div className={"uk-card uk-card-default uk-card-small uk-card-body"}>
            <h3 className={"uk-card-title"}>Add some P Cash:</h3>
            <form>
              <div className={"uk-margin"}>
                <div className={"uk-form-controls"}>
                  <input
                    className={"uk-input"}
                    type={"number"}
                    placeholder={"Enter Amount"}
                    value={amountToAdd}
                    onChange={(e) => setAmountToAdd(e.target.value)}
                  />
                </div>
              </div>
              <div className={"uk-margin"}>
                <div className={"uk-form-controls"}>
                  <input
                    className={"uk-input"}
                    type={"password"}
                    placeholder={"Enter UPI PIN"}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                </div>
              </div>
              <div className={"auth-btn-div"}>
                <button
                  className={"auth-btn"}
                  onClick={(e) => onSubmitClick(e)}
                >
                  Add
                </button>
                {/* <legend>{errorMessage}</legend> */}
              </div>
            </form>
            {successMessage.success && (
              <div className={"uk-alert-success"} uk-alert={""}>
                <p>{successMessage.data}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCashScreen;
