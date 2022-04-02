import React, { useCallback, useRef } from "react";
import "./FindPw.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const FindPw = () => {
  const emailRef = useRef();
  const accountIdRef = useRef();
  const certifyNumRef = useRef();
  const cellNum1 = useRef();
  const cellNum2 = useRef();
  const cellNum3 = useRef();
  const history = useHistory();
  const $ = (selector) => {
    return document.querySelector(selector);
  };
  const emailcheck = (e) => {
    const checkValue = e.target.value;
    if (checkValue.includes("@") && checkValue.includes(".")) {
      $("#findPwNoAt").classList.add("trans");
    } else {
      $("#findPwNoAt").classList.remove("trans");
    }
  };
  const lengthcheck = (e) => {
    const value = e.target.value;
    const length = e.target.maxLength;
    if (value.length === length) {
      $(`#findPwCellNum${length - 1}`).focus();
    }
  };

  const hasValue = (element) => {
    if (element.current.value !== undefined && element.current.value !== "") {
      return true;
    } else {
      return false;
    }
  };
  const alertSendCertNum = () => {
    if (hasValue(cellNum1) && hasValue(cellNum2) && hasValue(cellNum3)) {
      alert("인증번호가 발송되었습니다.");
    } else {
      alert("휴대폰 번호를 입력해 주세요!");
    }
  };

  /*  */

  const authNumFnc = useCallback(() => {
    let url = "https://digitalzone1.herokuapp.com/api/help/find/authnum";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Allow-Control-Access-Origin": "*",
      },
      body: JSON.stringify({
        mail: emailRef.current.value,
        accountid: accountIdRef.current.value,
        phoneNumber:
          cellNum1.current.value +
          "-" +
          cellNum2.current.value +
          "-" +
          cellNum3.current.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 400) {
          alert("정보가 정확하지 않습니다.");
        } else {
          alert("인증번호 발급 완료하였습니다.");
          certifyNumRef.current.value = res.data.authnum;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const chekAuthNumFnc = useCallback(() => {
    let url = "https://digitalzone1.herokuapp.com/api/help/find/check-authnum";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Allow-Control-Access-Origin": "*",
      },
      body: JSON.stringify({
        authnum: certifyNumRef.current.value,
        mail: emailRef.current.value,
        accountid: accountIdRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 400) {
          alert(res.message);
        } else {
          alert("인증번호 확인 완료");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const findPwFnc = useCallback(() => {
    let url = "https://digitalzone1.herokuapp.com/api/help/find/pw";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Allow-Control-Access-Origin": "*",
      },
      body: JSON.stringify({
        mail: emailRef.current.value,
        accountid: accountIdRef.current.value,
        phoneNumber:
          cellNum1.current.value +
          "-" +
          cellNum2.current.value +
          "-" +
          cellNum3.current.value,
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        alert(`${data.accountpw}으로 임시 비밀번호가 발급 되었습니다.`);
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  /*  */
  return (
    // <div className="findPw-box">
    <div className="inner">
      <h2 className="page-title">비밀번호 찾기</h2>
      <form
        className="findPw-form-area"
        onSubmit={(e) => {
          e.preventDefault();
          findPwFnc();
        }}
      >
        <ul className="findPw-form-list">
          <li>
            <label htmlFor="findPwUserEmail">이메일</label>
            <input
              id="findPwUserEmail"
              type="email"
              onKeyUp={emailcheck}
              autoFocus
              ref={emailRef}
              required
            />
            <p className="warn">
              <span id="findPwNoAt" className="trans">
                잘못된 메일형식입니다.
              </span>
            </p>
          </li>
          <li>
            <label htmlFor="findPwUserId">사용자 아이디</label>
            <input id="findPwUserId" type="text" required ref={accountIdRef} />
          </li>
          <li>
            <label htmlFor="findPwCellNum1">휴대폰번호</label>
            <div className="findPw-cellNum-box">
              <input
                id="findPwCellNum1"
                type="number"
                maxLength="3"
                onKeyUp={lengthcheck}
                ref={cellNum1}
                required
              />
              <input
                id="findPwCellNum2"
                type="number"
                maxLength="4"
                onKeyUp={lengthcheck}
                ref={cellNum2}
                required
              />
              <input
                id="findPwCellNum3"
                type="number"
                maxLength="4"
                ref={cellNum3}
              />
              <button
                className="findPw-btn-send-certifyNum btn-s btn-o"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  authNumFnc();
                }}
              >
                인증번호 발송
              </button>
            </div>
          </li>
          <li>
            <label htmlFor="findPwCertifyNum">인증번호</label>
            <div className="findPw-certify-box">
              <input
                id="findPwCertifyNum"
                type="text"
                required
                ref={certifyNumRef}
              />
              <button
                className="findPw-btn-confirm btn-s btn-o"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  chekAuthNumFnc();
                }}
              >
                확인
              </button>
            </div>
          </li>
        </ul>
        <div className="findPw-btn-box">
          <button className="findPw-btn-id-send btn-r btn-o" type="submit">
            임시 비밀번호 발송
          </button>
          <Link to="/login">
            <button className="findPw-btn-cancel btn-r btn-g" type="button">
              취소
            </button>
          </Link>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default FindPw;
