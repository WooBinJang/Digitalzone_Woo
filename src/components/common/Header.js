import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { numberComma } from "../../util/NumberComma";
import "./Header.css";

const Header = ({ point, isUserLogin, setIsUserLogin }) => {
  const history = useHistory();
  const logoutFnc = () => {
    setIsUserLogin(false);
    sessionStorage.clear();
    history.push("/");
  };

  return (
    <header>
      <div className="header-box">
        <div className="logo">
          <Link to={isUserLogin ? "/home" : "/"}>
            <img
              className="header_logo"
              src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img/CI-Digitalzone.png"
              alt="디지털존 로고"
            />
          </Link>
        </div>
        <nav className="info-nav">
          <ul className={isUserLogin === false ? "" : "user-login"}>
            {isUserLogin === false ? (
              <li>
                <Link to="/guide">
                  <img
                    className="header-info"
                    src="img/ant-design-customer-service-filled.png"
                    alt="고객상담"
                  />
                </Link>
              </li>
            ) : null}
            {isUserLogin === false ? (
              <li className="faq">
                <Link to="/faq">FAQ</Link>
              </li>
            ) : (
              <li className="point">
                <Link to="/managepoint">{numberComma(point)}&nbsp;point</Link>
              </li>
            )}
            {isUserLogin === false ? (
              <li className="login">
                <Link to="/login">로그인</Link>
              </li>
            ) : (
              <li className="logout" onClick={logoutFnc}>
                로그아웃
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
