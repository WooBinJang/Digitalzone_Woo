import React, { useRef, useCallback, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = ({ setUser, setIsUserLogin }) => {
  const history = useHistory();
  const logInId = useRef();
  const logInPw = useRef();

  const loginUser = useCallback(() => {
    let url = "https://digitalzone1.herokuapp.com/api/auth/signin";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Allow-Control-Access-Origin": "*",
      },
      body: JSON.stringify({
        accountid: logInId.current.value,
        accountpw: logInPw.current.value,
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        sessionStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        sessionStorage.setItem("userData", JSON.stringify(data.user));
      })
      .then(() => {
        setIsUserLogin(true);
        history.push("/home");
      })
      .catch((err) => {
        alert("아이디 혹은 비밀번호가 없거나 일치하지 않습니다.");
      });
  }, []);

  const onEnterKey = (e) => {
    if (e.key === "Enter") loginUser();
  };

  return (
    <div className="login-box">
      <div className="inner">
        <h2 className="page-title">로그인</h2>
        <form className="login-form-area" action="/">
          <ul className="login-form-list">
            <li>
              <label htmlFor="loginUserId">아이디</label>
              <input
                id="loginUserId"
                type="text"
                autoFocus
                required
                ref={logInId}
              />
            </li>
            <li>
              <label htmlFor="loginUserPw">비밀번호</label>
              <input
                id="loginUserPw"
                type="password"
                required
                ref={logInPw}
                onKeyPress={onEnterKey}
              />
            </li>
          </ul>
          <div className="login-btn-box">
            <button
              className="login-btn-log-in btn-r btn-o"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                loginUser();
              }}
            >
              로그인
            </button>
          </div>
        </form>
        <ul className="login-link-box">
          <li>
            <Link to="/findId">아이디 찾기</Link>
          </li>
          <li>
            <Link to="/findPw">비밀번호 찾기</Link>
          </li>
          <li>
            <Link to="/terms">회원가입</Link>
          </li>
        </ul>
        <Link to="/panel">
          <div className="login-btn-panelBox">
            <button className="login-btn-panel-register btn-r btn-b">
              패널인증시스템 신청하기
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
