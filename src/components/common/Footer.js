import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = ({ isUserLogin }) => {
  const privacyModal = () => {
    alert("개인정보처리방침");
  };

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-box">
          <div className="footer-info-box">
            <Link to={isUserLogin ? "/home" : "/"}>
              <div className="footer-logo">
                <img
                  src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img/CI-Digitalzone-kor.png"
                  alt="logo"
                />
              </div>
            </Link>
            <div className="footer-info">
              <span>
                ㈜디지털존 | 서울특별시 마포구 성암로 330,
                521호(DMC첨단산업센터)
                <br />
                연락처 : 00-000-0000 | 팩스 : 000-0000-0000 | 이메일 :
                00@0000.00
              </span>
            </div>
          </div>
          <div className="privacy_policy">
            <span onClick={privacyModal}>개인정보처리방침</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
