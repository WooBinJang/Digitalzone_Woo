import React, { useCallback, useRef } from "react";
import "./FindId.css";
import { Link } from "react-router-dom";

const FindId = () => {
  const $ = (selector) => {
    return document.querySelector(selector);
  };
  const emailcheck = (e) => {
    const checkValue = e.target.value;
    if (checkValue.includes("@") && checkValue.includes(".")) {
      $("#findIdNoAt").classList.add("trans");
    } else {
      $("#findIdNoAt").classList.remove("trans");
    }
  };

  const mailRef = useRef();
  const usernameRef = useRef();
  const findUserId = useCallback(() => {
    let url = "https://digitalzone1.herokuapp.com/api/help/find/id";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Allow-Control-Access-Origin": "*",
      },
      body: JSON.stringify({
        mail: mailRef.current.value,
        username: usernameRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        alert(
          `${usernameRef.current.value}님의 아이디는 ${data.accountid} 입니다.`
        );
      })
      .then(() => {
        usernameRef.current.value = "";
        mailRef.current.value = "";
      })

      .catch((err) => {
        alert("해당하는 이메일 혹은 사용자명이 없거나 일치하지 않습니다.");
      });
  }, []);

  return (
    <div className="findId-box">
      <div className="inner">
        <h2 className="page-title">아이디 찾기</h2>
        <form
          className="findId-form-area"
          action="/login"
          onSubmit={(e) => {
            e.preventDefault();
            findUserId();
          }}
        >
          <ul className="findId-form-list">
            <li>
              <label htmlFor="findIdUserEmail">이메일</label>
              <input
                id="findIdUserEmail"
                type="email"
                onKeyUp={emailcheck}
                autoFocus
                required
                ref={mailRef}
              />
              <p className="warn">
                <span id="findIdNoAt" className="trans">
                  잘못된 메일형식입니다.
                </span>
              </p>
            </li>
            <li>
              <label htmlFor="findIdUserName">사용자명</label>
              <input
                id="findIdUserName"
                type="text"
                ref={usernameRef}
                required
              />
            </li>
          </ul>
          <div className="findId-btn-box">
            <button className="findId-btn-id-send btn-r btn-o" type="submit">
              아이디 발송
            </button>
            <Link to="/login">
              <button className="findId-btn-cancel btn-r btn-g" type="button">
                취소
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindId;
