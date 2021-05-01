import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SendQueueApi } from "../apis/Queue";
import "../css/General.css";

const PendingTransactionsScreen = (props) => {
  const { user } = props;
  const history = useHistory();
  const [pendingReceiverPayments, setPendingReceiverPayments] = useState([]);
  const [pendingSenderPayments, setPendingSenderPayments] = useState([]);

  useEffect(() => {
    if (user === null) {
      history.push("/login");
    } else {
      let userQueues = JSON.parse(localStorage.getItem(`${user.uid}`));
      if (typeof userQueues !== "undefined" || userQueues !== null) {
        setPendingReceiverPayments(userQueues?.receiverQueue);
        setPendingSenderPayments(userQueues?.senderQueue);
      }
    }
  }, [history, user]);

  const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  let payments = JSON.parse(localStorage.getItem(`${user.uid}`));

  const dateFormatter = new Intl.DateTimeFormat("en-IN");

  const onVerifyClick = async () => {
    if (pendingReceiverPayments.length > 0) {
      await SendQueueApi(pendingReceiverPayments)
        .then(({ data }) => {
          localStorage.setItem(
            `${user.uid}`,
            JSON.stringify({
              ...payments,
              receiverQueue: [],
            })
          );
          setPendingReceiverPayments([]);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (pendingSenderPayments.length > 0) {
      await SendQueueApi(pendingSenderPayments)
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem(
            `${user.uid}`,
            JSON.stringify({
              ...payments,
              senderQueue: [],
            })
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const renderCards = () => {
    if (typeof pendingReceiverPayments === "undefined") {
      return <legend>No Pending Transactions remaining.</legend>;
    }
    return pendingReceiverPayments.map((pendingReceiverPayment, index) => {
      return (
        <div
          className={"uk-card uk-card-default uk-card-body"}
          key={pendingReceiverPayment.transactionId}
        >
          <label>
            Amount: {currencyFormatter.format(pendingReceiverPayment.amount)}
          </label>
          <br />
          <label>
            Date: {dateFormatter.format(new Date(pendingReceiverPayment.date))}
          </label>
          <br />
          <label>Sent By: {pendingReceiverPayment.sender}</label>
        </div>
      );
    });
  };

  return (
    <div className={"section"}>
      <h4>Pending P Cash Transactions:</h4>
      <button
        className={"auth-btn"}
        onClick={(e) => onVerifyClick()}
        style={{ margin: "10px 0" }}
      >
        Verify Pending Payments
      </button>
      {renderCards()}
    </div>
  );
};

export default PendingTransactionsScreen;
