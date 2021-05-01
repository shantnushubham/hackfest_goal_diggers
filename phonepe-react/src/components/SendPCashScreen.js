import React, { useState } from "react";
import { Link } from "react-router-dom";
import QRSCanner from "react-qr-scanner";
import "../css/General.css";

const SendPCashScreen = () => {
  const [scannedResult, setScannedResult] = useState(null);

  return (
    <>
      <div className={"scan-camera"}>
        <h2 className={"scan-qr-mssg"}>Scan Receiver's QR</h2>
        <QRSCanner
          delay={false}
          onScan={
            scannedResult === null
              ? (data) => {
                  console.log(data);
                  if (data !== null) {
                    setScannedResult(data.text);
                  }
                }
              : null
          }
          onError={(error) => console.error(error)}
        />
        {scannedResult !== null && (
          <Link
            // to={"/send-offline/amount-page"}
            to={{
              pathname: "/send-offline/amount-page",
              state: scannedResult,
            }}
          >
            <button className={"qr-upi"}>{scannedResult}</button>
          </Link>
        )}
      </div>
      <div className={"scan-button-box"}>
        <button
          className={"scan-button"}
          onClick={(e) => setScannedResult(null)}
        >
          Scan Again
        </button>
      </div>
    </>
  );
};

export default SendPCashScreen;
