import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import QRCode from "react-qr-code";
import shortId from "shortid";
import "../css/General.css";

const PCashSend = (props) => {
  let { user } = props;
  const [localWallet, setLocalWallet] = useState(0);
  const history = useHistory();

  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSection, setSelectedSection] = useState("GEN");
  const [qrData, setQrData] = useState(JSON.stringify({}));

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  let receiverUpiId = history?.location?.state?.upiId;

  if (user === null && loggedInUser) {
    user = loggedInUser.user;
  } else if (typeof loggedInUser === "undefined") {
    history.push("/");
  }

  useEffect(() => {
    user === null && history.push("/");
    if (typeof history.location.state === "undefined") {
      history.push("/send-offline");
    }
    loggedInUser?.wallet?.user?.amount &&
      setLocalWallet(loggedInUser.wallet.user.amount);
  }, [user, history, loggedInUser]);

  const onButtonClick = (e) => {
    e.preventDefault();
    if (Number(amount) > localWallet) {
      setErrorMessage(`Please select a value lower than ${localWallet}.`);
    } else {
      setErrorMessage("");
      let transactionData = {
        sender: user.upiId,
        receiver: receiverUpiId,
        transactionId: shortId.generate(),
        date: new Date(),
        amount: Number(amount),
        resolved: false,
      };
      setQrData(JSON.stringify(transactionData));
      addToQueue(`${user.uid}`, { senderQueue: [transactionData] });
      setLocalWallet(localWallet - Number(amount));
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          ...loggedInUser,
          wallet: {
            ...loggedInUser.wallet,
            user: {
              ...loggedInUser.wallet.user,
              amount: loggedInUser.wallet.user.amount - Number(amount),
            },
          },
        })
      );
    }
  };

  const addToQueue = (key, value) => {
    let userIdLocalObj = localStorage.getItem(key);
    if (userIdLocalObj === null) {
      localStorage.setItem(
        key,
        JSON.stringify({
          senderQueue: value?.senderQueue ?? [],
          receiverQueue: value?.receiverQueue ?? [],
        })
      );
    } else {
      let tempObject = JSON.parse(userIdLocalObj);
      var newSenderQueue = [];
      var newReceiverQueue = [];
      if (tempObject.senderQueue.length !== 0) {
        newSenderQueue = [...tempObject.senderQueue];
      }
      if (tempObject.receiverQueue.length !== 0) {
        newReceiverQueue = [...tempObject.receiverQueue];
      }
      value?.senderQueue?.[0] !== null &&
        typeof value?.senderQueue?.[0] !== "undefined" &&
        newSenderQueue.push(value?.senderQueue?.[0]);
      value?.receiverQueue?.[0] !== null &&
        typeof value?.receiverQueue?.[0] !== "undefined" &&
        newReceiverQueue.push(value?.receiverQueue?.[0]);

      localStorage.setItem(
        key,
        JSON.stringify({
          senderQueue: newSenderQueue,
          receiverQueue: newReceiverQueue,
        })
      );
    }
    setSelectedSection("QR");
  };

  const createQR = () => {
    return <QRCode value={qrData} />;
  };

  const renderContent = () => {
    if (selectedSection === "GEN") {
      return (
        <div className={"section"}>
          <h3>Enter Amount</h3>
          <h4>
            Amount Left:{" "}
            <span className={"avail-amount"}>
              {currencyFormatter.format(localWallet)}
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
      );
    } else {
      return <div className={"section"}>{createQR()}</div>;
    }
  };

  return <>{renderContent()}</>;
};

export default PCashSend;
