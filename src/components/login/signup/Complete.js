import React from "react";
import './Complete.css';
import { Link } from "react-router-dom";

const Complete = () => {
  return <div className="inner">
    <div className="completeInner">
      <div className="signupBox">
              <h4 id="completeTitle">회원가입</h4>
              <div className="stepBox">
                  <p>Step1. 약관 동의</p>
                  <p>Step2. 정보 입력</p>
                  <p id="signupEnter">Step3. 가입 완료</p>
              </div>
      </div>
      <div className="completeBox">
        <div className="completeContents">
          <h2>가입완료</h2>
          <p>환영합니다.</p>
          <p>회원 가입이 성공적으로 완료되었습니다.</p>
        </div>
        <div className="historyBtn">
          <button>
            <Link to="/">
              <h2 id="mainBtn">메인으로</h2>
            </Link>
          </button>
        </div>
      </div>
    </div>
  </div>;
};

export default Complete;
