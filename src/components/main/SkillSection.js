import React from "react";
import "./SkillSection.css";

const SkillSection = () => {
  return (
    <section className="skill-section">
      <div className="main-inner">
        <h1 className="skill-title"> 주요 기능들</h1>
        <div className="skill-content-box">
          <div className="skill-content-des-box">
            <img
              className="skill-content-img"
              src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img/la-hand-point-up-solid.png"
              alt="아주 쉬운 사용법 아이콘"
            />
            <h2 className="skill-content-title">아주 쉬운 사용법</h2>
            <p className="skill-content-des">
              직관적인 UI를 이용해 처음 사용하는 사용자도
              <br /> 쉽게 온라인 설문을 만들고 발송할 수 있습니다.
            </p>
          </div>
          <div className="skill-content-des-box">
            <img
              className="skill-content-img"
              src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img/bi-clipboard-check.png"
              alt="설문 수 제한 없음 아이콘"
            />
            <h2 className="skill-content-title">설문 수 제한 없음</h2>
            <p className="skill-content-des">
              회원 구분에 관계없이 발송할 수 있는 설문의
              <br />
              개수, 질문의 개수에 전혀 제한이 없습니다.
            </p>
          </div>
          <div className="skill-content-des-box">
            <img
              className="skill-content-img"
              src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img/bi-person-check.png"
              alt="패널선정에 대한 수고 불필요 아이콘"
            />
            <h2 className="skill-content-title">패널선정에 대한 수고 불필요</h2>
            <p className="skill-content-des">
              직관적인 UI를 이용해 처음 사용하는 사용자도
              <br /> 쉽게 온라인 설문을 만들고 발송할 수 있습니다.
            </p>
          </div>
          <div className="skill-content-des-box">
            <img
              className="skill-content-img"
              src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img/cil-mood-good.png"
              alt="편리한 이용 아이콘"
            />
            <h2 className="skill-content-title">편리한 이용</h2>
            <p className="skill-content-des">
              직관적인 UI를 이용해 처음 사용하는 사용자도
              <br />
              쉽게 온라인 설문을 만들고 발송할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
