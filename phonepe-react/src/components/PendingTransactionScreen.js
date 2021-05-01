import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const PendingTransactionsScreen = (props) => {
  const { user } = props;
  const history = useHistory();

  useEffect(() => {
    user === null && history.push("/");
  }, [history, user]);

  return <h1>Pending Transactions Screen</h1>;
};

export default PendingTransactionsScreen;
