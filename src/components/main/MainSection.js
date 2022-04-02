import React from "react";
import { Link } from "react-router-dom";
import "./MainSection.css";

const MainSection = () => {
  return (
    <section className="main-section">
      <div className="main-inner">
        <h1 className="survey-title">설문 조사로 해결책을 얻으세요!</h1>
        <div className="main-contnet-box">
          <div className="main-contnet-box-left">
            <h2 className="survey-subtitle">
              편리한 설문조사 시스템을 이용해보세요.
            </h2>
            <p className="survey-des">
              디지털존의 설문조사에서 실행 가능한 통찰력과 <br />
              신선한 관점을 확보할 수 있습니다. <br /> 어려운 설문조사 양식 등을
              쉽게 만들고 발송할 수 있습니다.
            </p>
            <Link to="/terms">
              <button className="sign-up-btn">회원가입</button>
            </Link>
          </div>

          <div className="main-contnet-box-right">
            <img
              className="survry-img"
              src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img/reserch_img 1.png"
              alt="설문조사 이미지"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
