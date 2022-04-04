import React, { useCallback, useContext, useRef } from "react";
import "./AccountSetup.css";
import { Link } from "react-router-dom";
import Gnb from "../common/Gnb";
import { userDataStore } from "../Root";

const AccountSetup = ({ handleCreate, setUserList, user }) => {
  const { state } = useContext(userDataStore);
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
  // 전화번호 3칸 & 자동넘어감 함수

  const accountId = useRef();
  const accountPw = useRef();
  const accountEmail = useRef();
  const username = useRef();
  const inputRef = useRef();
  const inputRefTwo = useRef();
  const inputRefThree = useRef();
  // state

  const submitAccount = (e) => {
    e.preventDefault();
    accountId.current.value = "";
    accountPw.current.value = "";
    accountEmail.current.value = "";
    username.current.value = "";
    inputRef.current.value = "";
    inputRefTwo.current.value = "";
    inputRefThree.current.value = "";
    alert("계정 생성이 완료되었습니다.");
  };
  // 저장버튼 함수

  const createUser = useCallback((state) => {
    let url = "https://digitalzone1.herokuapp.com/api/auth/signup";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Allow-Control-Access-Origin": "*",
      },

      body: JSON.stringify({
        memcheck: "1",
        accountid: accountId.current.value,
        accountpw: accountPw.current.value,
        checkpw: accountPw.current.value,
        username: username.current.value,
        mail: accountEmail.current.value,
        phoneNumber:
          inputRef.current.value +
          "-" +
          inputRefTwo.current.value +
          "-" +
          inputRefThree.current.value,
        userco: state.userco,
        userconum: state.userconum,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // 계정생성 백엔드

  const checkUser = useCallback(() => {
    let url = "https://digitalzone1.herokuapp.com/api/auth/signup/check/id";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Allow-Control-Access-Origin": "*",
      },

      body: JSON.stringify({
        accountid: accountId.current.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Gnb user={user} />
      <div className="account-wrapper">
        <div className="account-inner">
          <div className="account-step-box">
            <Link to="/accountchange">
              <p className="account-step">계정변경</p>
            </Link>
            <Link to="/accountsetup">
              <p className="account-step" id="accountStepEnter">
                계정생성
              </p>
            </Link>
            <Link to="/accountmanage">
              <p className="account-step">계정관리</p>
            </Link>
          </div>
          <form
            action="/accountsetup"
            onSubmit={(e) => {
              e.preventDefault();
              createUser(state);
            }}
          >
            <div className="account-change-info">
              <div className="account-id">
                <label>아이디</label>
                <input
                  type="id"
                  ref={accountId}
                  className="account-input"
                  maxLength="20"
                  required
                ></input>
              </div>
              <div className="account-password">
                <label>비밀번호</label>
                <input
                  type="password"
                  ref={accountPw}
                  className=" account-input"
                  maxLength="15"
                  required
                ></input>
              </div>
              <div className="account-email">
                <label>E-Mail</label>
                <input
                  type="email"
                  ref={accountEmail}
                  className=" account-input"
                  required
                ></input>
              </div>
              <div className="account-username">
                <label>사용자명</label>
                <input
                  ref={username}
                  className=" account-input"
                  maxLength="15"
                  required
                ></input>
              </div>
              <div className="account-call">
                <label>휴대폰 번호</label>
                <input
                  id="accountCallNum1"
                  type="number"
                  minLength="1"
                  maxLength="3"
                  onKeyUp={lengthcheck}
                  required
                  className=" account-input"
                  ref={inputRef}
                />
                <input
                  id="accountCallNum2"
                  type="number"
                  maxLength="4"
                  onKeyUp={lengthcheck}
                  required
                  className=" account-input"
                  ref={inputRefTwo}
                />
                <input
                  id="accountCallNum3"
                  type="number"
                  maxLength="4"
                  className=" account-input"
                  ref={inputRefThree}
                />
              </div>
              <button
                id="accountIdBtn"
                type="button"
                onClick={checkUser}
                required
              >
                중복확인
              </button>
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

export default AccountSetup;
