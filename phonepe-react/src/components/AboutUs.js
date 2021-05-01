import React from "react";
import "../css/General.css";

const AboutUs = () => {
  return (
    <div className={"section"}>
      <h3>About Us:</h3>
      <div>
        <div className={"uk-card uk-card-default uk-card-body"}>
          <h3 className={"uk-card-title"}>Shantanu Shubham</h3>
          <p>
            Has done the Frontend Development using React.js and has handled all
            the QR Scanning and Creating and dealing with REST APIs to connect
            to the bank servers when internet is available.
          </p>
        </div>
        <div className={"uk-card uk-card-default uk-card-body"}>
          <h3 className={"uk-card-title"}>Prakhar Shrivastava</h3>
          <p>
            Has done the Backend Development using Node.js and has handled all
            REST APIs to connect to the bank servers when internet is available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
