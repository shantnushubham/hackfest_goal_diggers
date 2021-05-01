import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import QRCode from "react-qr-code";
import "../css/General.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
   
  }, [history]);

  const updateUser = async (userStateAfterUpdate) => {
    await setUser(userStateAfterUpdate);
  };

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
