import React, { useCallback, useEffect } from "react";
import "./AccountChange.css";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import Gnb from "../common/Gnb";
import LoginCheck from "../common/LoginCheck";

const AccountChange = ({ user }) => {
  const [showcertification, setShowcertification] = useState(false);
  const [userco, setUserco] = useState(null);
  const [accountid, setAccountid] = useState(null);
  const usernameRef = useRef();
  const [token, setToken] = useState();
  const $ = (selector) => {
    return document.querySelector(selector);
  };
  const lengthcheck = (e) => {
    const value = e.target.value;
    const length = e.target.maxLength;
    if (value.length === length) {
      $(`#accountCallNum${length - 1}`).focus();
    }
  };
  // 휴대폰번호 칸 관련 함수
  const pwValue = useRef();
  const pwCheckValue = useRef();
  const emailCheck = useRef();

  // 비밀번호,비밀번호재입력,이메일 설정
  const inputRef = useRef(null);
  const inputRefTwo = useRef(null);
  const inputRefThree = useRef(null);
  function handleFocus() {
    inputRef.current.disabled = false;
    inputRef.current.focus();
    inputRefTwo.current.disabled = false;
    inputRefThree.current.disabled = false;
  }
  // 전화번호 설정

  const handleSubmit = (e) => {
    const inputValue = (i) => {
      return i.current.value;
    };
    if (inputValue(pwValue) !== inputValue(pwCheckValue)) {
      e.preventDefault();
      alert("비밀번호가 일치하지 않습니다");
      pwValue.current.focus();
      pwValue.current.value = "";
      pwCheckValue.current.value = "";
    }
  };
  // 일치, 이메일 함수

  const onClickCer = () => setShowcertification(true);
  // 번호 변경 시 인증번호 함수

  useEffect(() => {
    let userData = JSON.parse(sessionStorage.getItem("userData")) || null;
    if (userData) {
      emailCheck.current.value = userData.mail;
      setUserco(userData.userco);
      setAccountid(userData.accountid);
      usernameRef.current.value = userData.username;
      const phoneNumberArr = userData.phoneNumber.split("-");
      inputRef.current.value = phoneNumberArr[0];
      inputRefTwo.current.value = phoneNumberArr[1];
      inputRefThree.current.value = phoneNumberArr[2];
    }
  }, []);

  const createUser = useCallback((token) => {
    let url = "https://digitalzone1.herokuapp.com/api/user";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Allow-Control-Access-Origin": "*",
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify({
        accountpw: pwValue.current.value,
        checkpw: pwCheckValue.current.value,
        username: usernameRef.current.value,
        mail: emailCheck.current.value,
        phoneNumber:
          inputRef.current.value +
          "-" +
          inputRefTwo.current.value +
          "-" +
          inputRefThree.current.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        sessionStorage.removeItem("userData");
        sessionStorage.setItem("userData", JSON.stringify(res.data.user));
        alert(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const userDataAuthority = JSON.parse(
    sessionStorage.getItem("userData")
  ).authority;
  useEffect(() => {
    let accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || null;
    if (accessToken !== null) {
      setToken(accessToken);
    }
  }, []);
  // 백엔드 연결
  return (
    <div>
      <LoginCheck />
      <Gnb user={user} />
      <div className="account-wrapper">
        <div className="account-inner">
          <div className="account-step-box">
            <Link to="/accountchange">
              <p className="account-step" id="accountStepEnter">
                계정변경
              </p>
            </Link>
            {userDataAuthority === "2" ? null : (
              <Link to="/accountsetup">
                <p className="account-step">계정생성</p>
              </Link>
            )}
            {userDataAuthority === "2" ? null : (
              <Link to="/accountmanage">
                <p className="account-step">계정관리</p>
              </Link>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              createUser(token);
            }}
            action="/accountchange"
          >
            <div className="account-change-info">
              <div className="account-affiliate">
                <label>소속</label>
                <p className="account-info">{userco}</p>
              </div>
              <div className="account-id">
                <label>아이디</label>
                <p className="account-info">{accountid}</p>
              </div>
              <div className="account-password">
                <label>비밀번호</label>
                <input
                  type="password"
                  className=" account-input"
                  ref={pwValue}
                  maxLength="15"
                ></input>
              </div>
              <div className="account-password-check">
                <label>비밀번호 확인</label>
                <input
                  type="password"
                  className=" account-input"
                  ref={pwCheckValue}
                  maxLength="15"
                ></input>
              </div>
              <div className="account-email">
                <label>E-Mail</label>
                <input
                  type="email"
                  className=" account-input"
                  ref={emailCheck}
                ></input>
              </div>
              <div className="account-username">
                <label>사용자명</label>
                <input
                  className=" account-input"
                  maxLength="15"
                  ref={usernameRef}
                ></input>
              </div>
              <div className="account-call">
                <label>휴대폰 번호</label>
                <input
                  id="accountCallNum1"
                  type="number"
                  maxLength="3"
                  onKeyUp={lengthcheck}
                  required
                  className=" account-input"
                  disabled
                  ref={inputRef}
                  defaultValue="010"
                />
                <input
                  id="accountCallNum2"
                  type="number"
                  maxLength="4"
                  onKeyUp={lengthcheck}
                  required
                  className=" account-input"
                  disabled
                  ref={inputRefTwo}
                  defaultValue="1234"
                />
                <input
                  id="accountCallNum3"
                  type="number"
                  maxLength="4"
                  className=" account-input"
                  disabled
                  ref={inputRefThree}
                  defaultValue="5678"
                />
              </div>
              <button
                id="accountCallBtn"
                onClick={() => {
                  handleFocus();
                  onClickCer();
                }}
                type="button"
              >
                변경
              </button>
              {showcertification ? (
                <div>
                  <div className="accountCerBox">
                    <label>인증번호입력</label>
                    <input id="cerInput" required></input>
                  </div>
                  <button id="accountCerBtn" type="button">
                    확인
                  </button>
                </div>
              ) : null}
            </div>
            <div className="account-btn-box">
              <button className="account-btn" type="submit">
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountChange;
