import React from "react";
import "./MyPage.css";
import { Link } from "react-router-dom";
import { useRef,useState } from "react";
import Gnb from "../common/Gnb";

const MyPage = ({user}) => {
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
    // 전화번호칸 함수

    const pwValue = useRef();
    const pwCheckValue = useRef();
    const emailCheck = useRef();
    // 비밀번호,비밀번호재입력,이메일 설정
    
    const inputRef = useRef(null);
    const inputRefTwo = useRef(null);
    const inputRefThree = useRef(null);
    function handleFocus() {
        inputRef.current.disabled = false;
        inputRef.current.focus();
        inputRefTwo.current.disabled = false;
        inputRefThree.current.disabled = false;
    };
    // 전화번호 설정
    
    const handleSubmit = (e) => {
        const inputValue = (i) => {
            return i.current.value
        }
        if(inputValue(pwValue) !== inputValue(pwCheckValue)){
            e.preventDefault();
            alert("비밀번호가 일치하지 않습니다");
            pwValue.current.focus();
            pwValue.current.value = "";
            pwCheckValue.current.value = "";
        };
    };
    // submit 함수

    const [showcertification, setShowcertification] = useState(false);
    const onClickCer = () => setShowcertification(true);
    // 번호인증 함수

    const cerBtn = () => {
        alert("번호인증이 완료되었습니다.")
    }
    // 번호인증 알람

    return (
        <div>
            <Gnb user={user}/>
            <div className="account-wrapper">
                <div className="account-inner">
                    <div className="mypage-step-box">
                        <p className="account-step" id="accountStepEnter"><Link to="/mypage">마이페이지</Link></p>
                    </div>
                    <form onSubmit={handleSubmit} action="/mypage">
                        <div className="account-change-info">
                            <div className="account-affiliate">
                                <label>소속</label>
                                <p className="account-info">개인</p>
                            </div>
                            <div className="account-id">
                                <label>아이디</label>
                                <p className="account-info">ADMIN</p>
                            </div>
                            <div className="account-password">
                                <label>비밀번호</label>
                                <input type="password" className=" account-input" ref={pwValue} maxLength="15"></input>
                            </div>
                            <div className="account-password-check">
                                <label>비밀번호 확인</label>
                                <input type="password" className=" account-input" ref={pwCheckValue} maxLength="15"></input>
                            </div>
                            <div className="account-email">
                                <label>E-Mail</label>
                                <input type="email" className=" account-input" ref={emailCheck}></input>
                            </div>
                            <div className="account-username">
                                <label>사용자명</label>
                                <input className=" account-input"  maxLength="15"></input>
                            </div>
                            <div className="account-call">
                                <label>휴대폰 번호</label>
                                <input
                                id="accountCallNum1"
                                type="text"
                                maxLength="3"
                                onKeyUp={lengthcheck}
                                required
                                className=" account-input"
                                disabled ref={inputRef}
                                defaultValue="010"
                                />
                                <input
                                id="accountCallNum2"
                                type="text"
                                maxLength="4"
                                onKeyUp={lengthcheck}
                                required
                                className=" account-input"
                                disabled ref={inputRefTwo}
                                defaultValue="1234"
                                />
                                <input id="accountCallNum3"
                                type="text"
                                maxLength="4"
                                className=" account-input"
                                disabled ref={inputRefThree}
                                defaultValue="5678"
                                />
                            </div>
                            <button id="accountCallBtn" onClick={()=>{handleFocus(); onClickCer()}} type="button">변경</button>
                            { showcertification ? 
                            <div>
                                <div className="accountCerBox">
                                    <label>인증번호입력</label>
                                    <input id="cerInput"  required></input>
                                </div>
                                <button id="accountCerBtn" type="button" onClick={cerBtn} required>확인</button>
                            </div>
                            : null }
                        </div>
                        <div className="account-btn-box">
                            <button className="account-btn" type="submit">저장</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyPage;