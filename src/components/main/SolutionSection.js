import React from "react";
import { Link } from "react-router-dom";
import "./SolutionSection.css";
const SolutionSection = () => {
  return (
    <section className="solution-section">
      <div className="main-inner">
        <h1 className="solution-title">
          <span>디지털존</span>의 설문조사 솔루션이 필요하십니까?
        </h1>
        <p className="solution-des">
          도입 관련하여 궁금한 점을 알아보고, 패널 시스템을 실행하세요.
        </p>
        <Link to="/panel">
          <button className="solution-btn">패널 인증 시스템 신청하기</button>
        </Link>
      </div>
    </section>
  );
};

export default SolutionSection;
