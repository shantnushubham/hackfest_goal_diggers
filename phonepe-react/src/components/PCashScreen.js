import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const PCashScreen = (props) => {
  const { user } = props;
  const history = useHistory();

  useEffect(() => {
    user === null && history.push("/");
  }, [user, history]);

  return <h1>This is P Cash Screen</h1>;
};

export default PCashScreen;
