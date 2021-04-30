import React from "react";
import { Link } from "react-router-dom";
import "../css/General.css";

const HomePage = () => {
  return (
    <>
      <div className={"section"}>
        <div
          className={
            "uk-card uk-card-default uk-card-body uk-width-expands@m card"
          }
        >
          <h6 className={"action-text"}>Choose Action</h6>
          <div className={"action-grid"}>
            <div className={"action-block"}>
              <Link to={"/pending"}>
                <div className={"icon-img-box"}>
                  <img src="/history.png" alt={"Check Pending Transactions"} />
                </div>
                <h6 className={"action-mssg"}>Pending...</h6>
              </Link>
            </div>
            <div className={"action-block"}>
              <Link to={"/offline-cash"}>
                <div className={"icon-img-box"}>
                  <img src="/history.png" alt={"Check Pending Transactions"} />
                </div>
                <h6 className={"action-mssg"}>Your P Cash</h6>
              </Link>
            </div>
            <div className={"action-block"}>
              <Link to={"/send-offline"}>
                <div className={"icon-img-box"}>
                  <img src="/history.png" alt={"Check Pending Transactions"} />
                </div>
                <h6 className={"action-mssg"}>Send P Cash</h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
