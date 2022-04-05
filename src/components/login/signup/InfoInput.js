import React, { useState, useRef, useCallback } from "react";
import "./InfoInput.css";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const InfoInput = () => {
  const history = useHistory();
  const [showCorp, setShowCorp] = useState(false);
  const onClick = () => setShowCorp(true);
  const onClicked = () => setShowCorp(false);
  /*const isCheckBoxClicked = () => {
        setShowCorp(!showCorp);
    };*/

  const [openModal, setopenModal] = useState(false);

  const [switchOn, switchChange] = useState(false);
  const onClickEmail = () => switchChange(true);

  const [passwordType, setPasswordType] = useState({
    type: "password",
    name: "password",
    visible: false,
  });
  const handlePasswordType = (e) => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  const [pwType, setPwType] = useState({
    type: "password",
    name: "passwordCheck",
    visible: false,
  });
  const handlePwType = (e) => {
    setPwType(() => {
      if (pwType.type !== "text") {
        return { type: "text" };
      }
      return { type: "password" };
    });
  };
  const cellNum = useRef();
  const cellNum2 = useRef();
  const cellNum3 = useRef();

  const hasValue = (element) => {
    if (element.current.value !== undefined && element.current.value !== "") {
      return true;
    } else {
      return false;
    }
  };
  const alertSendCertNum = () => {
    if (hasValue(cellNum)) {
      alert("인증번호가 발송되었습니다.");
    } else {
      alert("휴대폰 번호를 입력해 주세요!");
    }
  };
  const pwValue = useRef();
  const pwCheckValue = useRef();
  const emailCheck = useRef();

  // 지금은 submit이랑 백엔드랑 할 수 없으니 일단은 action="/complete"로 하고 추후수정

  const accountid = useRef();
  const username = useRef();
  const mail = useRef();
  const [userco, setUserco] = useState(null);
  const [userconum, setUserconum] = useState(null);

  const inputValue = (i) => {
    return i.current.value;
  };
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
  const maxlengthCheck = (e) => {
    const value = e.target.value;
    const length = e.target.maxLength;
    if (value.length > length) {
      $(`#sendAuth`).focus();
    }
  };

  const createUser = useCallback(() => {
    if (inputValue(pwValue) !== inputValue(pwCheckValue)) {
      alert("비밀번호가 일치하지 않습니다");
      pwValue.current.focus();
      pwValue.current.value = "";
      pwCheckValue.current.value = "";
      return;
    } else if (!switchOn) {
      // alert("이메일인증을 완료해주세요");
      // emailCheck.current.focus();
    }

    let url = "https://digitalzone1.herokuapp.com/api/auth/signup";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Allow-Control-Access-Origin": "*",
      },

      body: JSON.stringify({
        accountid: accountid.current.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showCorp, userco, userconum]);

  const checkUser = useCallback(() => {
    let url = "https://digitalzone1.herokuapp.com/api/auth/signup/check/id";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Allow-Control-Access-Origin": "*",
      },

      body: JSON.stringify({
        accountid: accountid.current.value,
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
    <div className="inner">
      <div className="termsInner">
        {openModal && <Modal closeModal={setopenModal} />}
        <div className="signupBox">
          <h4 id="termsTitle">회원가입</h4>
          <div className="stepBox">
            <p>Step1. 약관 동의</p>
            <p id="signupEnter">Step2. 정보 입력</p>
            <p>Step3. 가입 완료</p>
          </div>
        </div>
        <form
          className="registerBox"
          // action="/complete"
          onSubmit={(e) => {
            e.preventDefault();
            createUser();
          }}
        >
          <p id="registerTitle">
            기본정보 입력 <span className="essential">&#40;필수&#41;</span>
          </p>
          <div className="registerPer">
            <div className="membership">
              <label id="checkMbs">
                회원구분
                <button
                  type="button"
                  onClick={() => {
                    setopenModal(true);
                  }}
                >
                  <p id="transferGuideBtn">?</p>
                </button>
              </label>
              <input
                type="radio"
                name="memRadio"
                onClick={onClicked}
                required
                defaultChecked
              ></input>
              <label>개인회원</label>
              <input type="radio" name="memRadio" onClick={onClick}></input>
              <label>법인회원</label>
            </div>
            <div>
              <div className="corporationBox">
                {showCorp ? (
                  <div className="corporation">
                    <div className="corName">
                      <label>법인명</label>
                      <input
                        required
                        onBlur={(e) => {
                          setUserco(e.target.value);
                        }}
                      ></input>
                    </div>
                    <div className="corNum">
                      <label>사업자등록번호</label>
                      <input
                        required
                        onBlur={(e) => {
                          setUserconum(e.target.value);
                        }}
                      ></input>
                      <button type="button">
                        <p>법인 조회</p>
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="perInfo">
              <div className="idBox">
                <label>아이디</label>
                <input type="id" name="userId" required ref={accountid}></input>
                <button type="button" onClick={checkUser}>
                  중복확인
                </button>
              </div>
              <div className="userNameBox">
                <label>사용자 이름</label>
                <input
                  type="text"
                  name="userName"
                  ref={username}
                  required
                ></input>
              </div>
              <div className="pwBox">
                <label htmlFor="infoInputPw">비밀번호 입력</label>
                <input
                  id="infoInputPw"
                  type={passwordType.type}
                  placeholder="영문 대소문자/숫자 혼합 10~15자리 내로 입력해주세요."
                  name="password"
                  ref={pwValue}
                  maxLength="15"
                  required
                ></input>
                <button
                  className="eyesIcon"
                  type="button"
                  name="password2"
                  onClick={handlePasswordType}
                >
                  비밀번호 문자 표시
                </button>
              </div>
              <div className="pwCheckBox">
                <label htmlFor="infoInputPwCheck">비밀번호 확인</label>
                <input
                  id="infoInputPwCheck"
                  type={pwType.type}
                  name="passwordCheck"
                  ref={pwCheckValue}
                  maxLength="15"
                  required
                ></input>
                <button
                  className="eyesIcon"
                  type="button"
                  name="passwordCheck2"
                  onClick={handlePwType}
                >
                  비밀번호 문자 표시
                </button>
              </div>
              <div className="callBox">
                <label>휴대폰 번호</label>
                <input
                  id="accountCallNum1"
                  className="inifinput-phonenumber"
                  type="number"
                  name="phoneNumber"
                  required
                  ref={cellNum}
                  onKeyUp={lengthcheck}
                  min={0}
                  maxLength="3"
                ></input>
                <input
                  id="accountCallNum2"
                  className="inifinput-phonenumber"
                  type="number"
                  name="phoneNumber"
                  required
                  ref={cellNum2}
                  onKeyUp={lengthcheck}
                  min={0}
                  maxLength="4"
                ></input>
                <input
                  id="accountCallNum3"
                  className="inifinput-phonenumber"
                  type="number"
                  name="phoneNumber"
                  required
                  ref={cellNum3}
                  min={0}
                  maxlength={4}
                  onKeyUp={maxlengthCheck}
                ></input>
                <button id="sendAuth" type="button" onClick={alertSendCertNum}>
                  인증번호 발송
                </button>
              </div>
              <div className="numInput">
                <label>인증번호 입력</label>
                <input type="text" name="certificationNumber" required></input>
                <button type="button">확인</button>
              </div>
              <div className="emailBox">
                <label>이메일 입력</label>
                <input type="email" name="email" required ref={mail} />
                <button type="button" onClick={onClickEmail} ref={emailCheck}>
                  {switchOn ? <div>인증완료</div> : <div>인증</div>}
                </button>
              </div>
            </div>
          </div>
          <div className="historyBtn">
            <button>
              <Link to="/terms">
                <h2 id="backBtn">이전페이지</h2>
              </Link>
            </button>
            <button type="submit">
              <h2 id="joinBtn">회원가입</h2>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoInput;
