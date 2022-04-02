import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import "./Gnb.css";
const Gnb = ({ user }) => {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userGrade, setUserGrade] = useState(null);
  const sampleLocation = useLocation();
  const url = sampleLocation.pathname;
  useEffect(() => {
    let accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || null;
    if (accessToken) {
      setIsUserLogin(true);
    }
    let userData = JSON.parse(sessionStorage.getItem("userData")) || null;
    if (userData) {
      // 0 슈퍼관리자  1 일반관리자 2 일반회원
      setUserGrade(userData.authority);
    }
  }, []);
  return (
    <nav className="menu-nav">
      {isUserLogin ? (
        /* 로그인 시 Gnb 홈 화면은 로그인 비로그인  다름 */
        <ul>
          <li className={url === "/home" ? "on" : null}>
            <Link to="/home">홈</Link>
          </li>
          <li className={url === "/guide" ? "on" : null}>
            <Link to="/guide">이용안내</Link>
          </li>
          <li className={url === "/faq" ? "on" : null}>
            <Link to="/faq">FAQ</Link>
          </li>
          <li className={url.indexOf("/mainqa") !== -1 ? "on" : null}>
            <Link to="/mainqa">Q&amp;A</Link>
          </li>
          <li
            className={
              url === "/accountchange" ||
              url === "/mypage" ||
              url === "/accountsetup" ||
              url === "/accountmanage"
                ? "on"
                : null
            }
          >
            <Link to="/accountchange">계정설정</Link>
          </li>
          <li className={url.indexOf("/survey") !== -1 ? "on" : null}>
            <Link to="/survey">설문등록/현황조회</Link>
          </li>
          <li className={url === "/managepoint" ? "on" : null}>
            <Link to="/managepoint">포인트 관리</Link>
          </li>
          {userGrade === "0" ? ( // 등급별 처리하기
            <li
              className={`total-manage-box ${
                url.indexOf("/panel") !== -1 ||
                url.indexOf("/point") !== -1 ||
                url.indexOf("/approve") !== -1
                  ? "on"
                  : null
              }`}
            >
              통합관리
              <ul className="total-manage-list">
                <Link to="/panel/board">
                  <li>패널시스템 신청현황</li>
                </Link>
                <Link to="/point/board">
                  <li>포인트 현황</li>
                </Link>
                <Link to="/approve/board">
                  <li>설문승인 현황</li>
                </Link>
              </ul>
            </li>
          ) : null}
        </ul>
      ) : (
        <ul>
          <li className={url === "/" ? "on" : null}>
            <Link to="/">홈</Link>
          </li>
          <li className={url === "/guide" ? "on" : null}>
            <Link to="/guide">이용안내</Link>
          </li>
          <li className={url === "/faq" ? "on" : null}>
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Gnb;
