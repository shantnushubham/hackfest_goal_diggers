import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../css/General.css";
import QRScanner from "react-qr-scanner";

const PCashReceive = (props) => {
  const { user } = props;
  const history = useHistory();
  const [qrData, setQrData] = useState(null);
  const [scanMessage, setScanMessage] = useState({ success: false, data: "" });
  const [senderUpi, setSenderUpi] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    user === null && history.push("/login");
  }, [user, history]);

  const onButtonClick = (e) => {
    e.preventDefault();
    if (JSON.parse(qrData).sender !== senderUpi) {
      setErrorMessage(
        "The UPI ID of the sender doesn't match with the one you entered."
      );
    } else {
      addToQueue(`${user.uid}`, { receiverQueue: [JSON.parse(qrData)] });
      setScanMessage({
        success: true,
        data: "Added to your pending payments.",
      });
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
  };

  const renderContentOnState = () => {
    if (qrData === null || !scanMessage.success) {
      return (
        <QRScanner
          onScan={(data) => {
            if (data !== null) {
              console.log(JSON.parse(data.text));
              setQrData(data.text);
              setScanMessage({
                success: true,
                data: "QR Code was successfully read.",
              });
            }
          }}
          onError={(error) => {
            console.error(error);
          }}
        />
      );
    } else if (scanMessage.success) {
      return (
        <>
          <div className={"uk-alert-success"} uk-alert={""}>
            <p>{scanMessage.data}</p>
          </div>
          <form>
            <div className={"uk-margin"}>
              <label className={"uk-form-label"}>Sender's UPI ID:</label>
              <div className={"uk-form-controls"}>
                <input
                  className={"uk-input"}
                  type={"text"}
                  placeholder={"Enter Sender's UPI ID"}
                  value={senderUpi}
                  onChange={(e) => setSenderUpi(e.target.value)}
                />
              </div>
            </div>
            <div className={"auth-btn-div"}>
              <button className={"auth-btn"} onClick={(e) => onButtonClick(e)}>
                Submit
              </button>
            </div>
            {errorMessage !== "" && (
              <div className={"uk-alert-danger"} uk-alert={""}>
                <p>{errorMessage}.</p>
              </div>
            )}
          </form>
        </>
      );
    }
  };

  const renderContent = () => {
    return (
      <div className={"section"}>
        <h1>Receive P-Cash</h1>
        {renderContentOnState()}
      </div>
    );
  };

  return renderContent();
};

export default PCashReceive;
