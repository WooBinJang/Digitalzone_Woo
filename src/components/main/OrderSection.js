import React from "react";
import "./OrderSection.css";

const OrderSection = () => {
  return (
    <section className="order-section">
      <div className="main-inner">
        <h1 className="order-title">설문 발송 순서</h1>
        <img
          className="order-img"
          src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img/research_system_icon.png"
          alt="설문 발송 순서 이미지"
        />
        <div className="order-des-box">
          <span className="order-des1 order-des">신규설문등록</span>
          <span className="order-des2 order-des">설문 발송</span>
          <span className="order-des3 order-des">포인트 차감</span>
          <span className="order-des4 order-des">포인트 추가차감 & 복원</span>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
