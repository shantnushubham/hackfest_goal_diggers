import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QRCode from "react-qr-code";
import "../css/General.css";

const ProfilePage = (props) => {
  const { user } = props;
  const history = useHistory();

  useEffect(() => {
    user === null && history.push("/login");
  }, [history, user]);

  return user === null ? (
    "404: Some Error Occurred"
  ) : (
    <>
      <div className={"section qr"}>
        <h4 className={"scan-qr-mssg"}>My QR:</h4>
        <QRCode value={JSON.stringify({ upiId: user.upiId })} />
      </div>
    </>
  );
};

export default ProfilePage;
