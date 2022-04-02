import React from "react";
import "./SendSection.css";

const SendSection = () => {
  return (
    <section className="send-section">
      <div className="main-inner">
        <div className="send-content-box">
          <div className="send-contnet-box-left">
            <img
              className="solution-img"
              src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img/bx-mail-send.png"
              alt="메일전송 이미지"
            />
          </div>
          <div className="send-contnet-box-right">
            <h1 className="send-title">최고의 설문 조사 발송 시스템</h1>
            <p className="send-des1">
              디지털존 설문 조사 솔루션은 <br />
              <span>DID 패널자격인증 시스템</span>을 기반으로 하기 때문에
              <br />
              개인정보관리에 있어 사용자의 안정성이 확보됩니다.
            </p>
            <p className="send-des2">
              디지털존만의 특별한 설문조사 발송 시스템을 사용해보세요!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SendSection;
