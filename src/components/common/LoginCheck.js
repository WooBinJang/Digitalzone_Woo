import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
const LoginCheck = () => {
  const history = useHistory();
  useEffect(() => {
    let accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || null;
    if (accessToken === null) {
      history.push("/login");
    }
  }, []);
  return <div></div>;
};

export default LoginCheck;
