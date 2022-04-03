import React, { useContext, useRef, useState } from "react";
import "./SurveyRegist.css";
import moment from "moment";
import { userDataStore } from "../Root";

function SurveyRegist({ modalClose, posts, setPosts }) {
  const date = moment().format("YYYY-MM-DD");

  const { state } = useContext(userDataStore);
  const fileInput = useRef();
  const fileName = useRef();
  const panelNum = useRef();
  const movefileName = () => {
    fileName.current.value = fileInput.current.value;
    panelNum.current.innerText = `8,545건`;
  };
  const [profile1, setProfile1] = useState();
  const [profile2, setProfile2] = useState();
  const [profile3, setProfile3] = useState();
  const [profile3_2, setProfile3_2] = useState();
  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options3, setOptions3] = useState([]);
  const addOption1btn = (e) => {
    const text = e.target.options[e.target.selectedIndex].text;
    if (e.target.value === "") {
      return;
    }
    let newOptions = [...options1];
    if (newOptions.includes(text)) {
      return;
    }
    newOptions.push(text);
    setOptions1(newOptions);
  };
  const option1Remove = (e) => {
    const text = e.target.previousSibling.innerText;
    let newOptions = [...options1].filter((value) => {
      return value !== text;
    });
    setOptions1(newOptions);
  };
  const addOption2btn = (e) => {
    const text = e.target.options[e.target.selectedIndex].text;
    if (e.target.value === "") {
      return;
    }
    let newOptions = [...options2];
    if (newOptions.includes(text)) {
      return;
    }
    newOptions.push(text);
    setOptions2(newOptions);
  };
  const option2Remove = (e) => {
    const text = e.target.previousSibling.innerText;
    let newOptions = [...options2].filter((value) => {
      return value !== text;
    });
    setOptions2(newOptions);
  };
  const addOption3btn = (e) => {
    const text = e.target.options[e.target.selectedIndex].text;
    if (e.target.value === "") {
      return;
    }
    let newOptions = [...options3];
    if (newOptions.includes(text)) {
      return;
    }
    newOptions.push(text);
    setOptions3(newOptions);
  };
  const option3Remove = (e) => {
    const text = e.target.previousSibling.innerText;
    let newOptions = [...options3].filter((value) => {
      return value !== text;
    });
    setOptions3(newOptions);
  };
  const surveyName = useRef();
  const link = useRef();
  const needSample = useRef();
  const pointPerPerson = useRef();
  const dateFrom = useRef();
  const dateTo = useRef();
  let newPost = {
    num: posts.length + 1,
    link: "",
    surveyName: "",
    date: "2021.10.28 ~ 2021.11.28",
    needSample: 0,
    completeSample: 0,
    pointPerPerson: 0,
    profile1: [],
    profile2: [],
    profile3: [],
    record: [],
    state: "승인대기",
    registrant: state.username,
    affiliation: state.userco ? state.userco : "개인",
    activation: false,
    modifiedBy: "",
    modifiedDate: "",
    sendStatus: false,
    accountid: state.accountid,
    phoneNumber: state.phoneNumber,
    mail: state.mail,
  };

  const setNewPost = (e) => {
    e.preventDefault();
    const value = (ref) => {
      return ref.current.value;
    };
    newPost.surveyName = value(surveyName);
    newPost.link = value(link);
    newPost.needSample = value(needSample);
    newPost.pointPerPerson = value(pointPerPerson);
    const date = value(dateFrom) + " ~ " + value(dateTo);
    newPost.date = date;
    newPost.profile1 = options1;
    newPost.profile2 = options2;
    newPost.profile3 = options3;
    const newPosts = [...posts];
    newPosts.unshift(newPost);
    setPosts(newPosts);
    alert("설문 등록이 완료되었습니다.");
    modalClose();
  };

  return (
    <div className="surveyRg">
      <div className="svRg-pageTitle-box">
        <h3 className="svRg-pageTitle">신규설문 등록</h3>
        <button className="svRg-btn-close" onClick={modalClose}>
          X
        </button>
      </div>
      <form className="svRg-form-box" action="/survey" onSubmit={setNewPost}>
        <ul className="svRg-form-lists">
          <li className="svRg-form-list">
            <label htmlFor="">조사명</label>
            <input id="svRgSurveyTitle" type="text" ref={surveyName} required />
          </li>
          <li className="svRg-form-list">
            <label htmlFor="svRgSurveyUrl">설문링크</label>
            <input
              id="svRgSurveyUrl"
              type="url"
              placeholder="설문 URL을 기입해주세요"
              ref={link}
              required
            />
          </li>
          <li className="svRg-form-list">
            <label htmlFor="svRgNeededSamples">필요샘플 수</label>
            <input
              id="svRgNeededSamples"
              type="number"
              min={0}
              placeholder="숫자만 입력가능합니다."
              ref={needSample}
              required
            />
            <label htmlFor="svRgPointPerPerson" className="svRg-label-point">
              참여 포인트
            </label>
            <input
              id="svRgPointPerPerson"
              type="number"
              min={0}
              placeholder="숫자만 입력가능합니다."
              ref={pointPerPerson}
              required
            />
          </li>
          <li className="svRg-form-list">
            <label htmlFor="svRgFileName">발송패널 등록</label>
            <input
              id="svRgFileRegister"
              type="file"
              ref={fileInput}
              onChange={movefileName}
              required
            />
            <label
              id="svRgFileBtn"
              className="btn-s btn-o"
              htmlFor="svRgFileRegister"
            >
              파일 등록
            </label>
            <input id="svRgFileName" ref={fileName} readOnly />
            <p id="svRGPanelNum" ref={panelNum}></p>
          </li>
          <li className="svRg-form-list">
            <label htmlFor="svRgDateFrom">요청기간</label>
            <input
              id="svRgDateFrom"
              min={date}
              type="date"
              ref={dateFrom}
              required
            />
            <label id="svRgWave" htmlFor="svRgDateTo">
              ~
            </label>
            <input
              id="svRgDateTo"
              min={date}
              type="date"
              ref={dateTo}
              required
            />
          </li>
          <li className="svRg-form-list">
            <div className="svRg-profile-title">설문 프로파일</div>
            <ul className="svRg-profile-lists">
              <li className="svRg-profile-list">
                <h6 className="svRg-profile-steps">1단계</h6>
                <div className="svRg-options-box">
                  <select
                    className="svRg-options-depth1"
                    onChange={(e) => setProfile1(e.target.value)}
                  >
                    <option value="">항목선택</option>
                    <option value="sex">성별</option>
                    <option value="age">나이</option>
                  </select>
                  {profile1 === "sex" ? (
                    <select
                      className="svRg-options-depth2"
                      onChange={addOption1btn}
                    >
                      <option value="">성별선택</option>
                      <option value="male">남성</option>
                      <option value="female">여성</option>
                    </select>
                  ) : null}
                  {profile1 === "age" ? (
                    <select
                      className="svRg-options-depth2"
                      onChange={addOption1btn}
                    >
                      <option value="">나이대 선택</option>
                      <option value="0~9">9세 이하</option>
                      <option value="10~19">10세~19세</option>
                      <option value="20~29">20세~29세</option>
                      <option value="30~39">30세~39세</option>
                      <option value="40~49">40세~49세</option>
                      <option value="50~59">50세~59세</option>
                      <option value="60~69">60세~69세</option>
                      <option value="70~79">70세~79세</option>
                      <option value="80~89">80세~89세</option>
                      <option value="90~199">90세 이상</option>
                    </select>
                  ) : null}
                  <div className="svRg-optionbtn-box">
                    {options1.map((item, index) => {
                      return (
                        <div className="svRg-optionbtn" key={index}>
                          <span>{item}</span>
                          <span
                            className="svRg-btn-optionRemove"
                            onClick={option1Remove}
                          >
                            x
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </li>
              <li className="svRg-profile-list">
                <h6 className="svRg-profile-steps">2단계</h6>
                <div className="svRg-options-box">
                  <select
                    className="svRg-options-depth1"
                    onChange={(e) => setProfile2(e.target.value)}
                  >
                    <option value="">항목선택</option>
                    <option value="mobileOpreator">통신사</option>
                  </select>
                  {profile2 === "mobileOpreator" ? (
                    <select
                      className="svRg-options-depth2"
                      onChange={addOption2btn}
                    >
                      <option value="">통신사 선택</option>
                      <option value="SKT">SKT</option>
                      <option value="KT">KT</option>
                      <option value="LG U+">LG U+</option>
                    </select>
                  ) : null}
                  <div className="svRg-optionbtn-box">
                    {options2.map((item, index) => {
                      return (
                        <div className="svRg-optionbtn" key={index}>
                          <span>{item}</span>
                          <span
                            className="svRg-btn-optionRemove"
                            onClick={option2Remove}
                          >
                            x
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </li>
              <li className="svRg-profile-list">
                <h6 className="svRg-profile-steps">3단계</h6>
                <div className="svRg-options-box">
                  <select
                    className="svRg-options-depth1"
                    onChange={(e) => setProfile3(e.target.value)}
                  >
                    <option value="">항목선택</option>
                    <option value="electricDevice">전자기기</option>
                  </select>
                  {profile3 === "electricDevice" ? (
                    <select
                      className="svRg-options-depth2"
                      onChange={(e) => setProfile3_2(e.target.value)}
                    >
                      <option value="">전자기기 선택</option>
                      <option value="cellphone">휴대폰</option>
                      <option value="notebook">노트북</option>
                    </select>
                  ) : null}
                  {profile3_2 === "cellphone" ? (
                    <select
                      className="svRg-options-depth3"
                      onChange={addOption3btn}
                    >
                      <option value="">휴대폰 선택</option>
                      <option value="갤럭시S20">갤럭시S20</option>
                      <option value="갤럭시S21">갤럭시S21</option>
                      <option value="아이폰12">아이폰12</option>
                      <option value="아이폰13">아이폰13</option>
                    </select>
                  ) : null}
                  {profile3_2 === "notebook" ? (
                    <select
                      className="svRg-options-depth3"
                      onChange={addOption3btn}
                    >
                      <option value="">노트북 선택</option>
                      <option value="맥북프로">맥북 프로</option>
                      <option value="삼성울트라">삼성 갤럭시북 프로</option>
                      <option value="LG 그램">LG 그램 2022</option>
                    </select>
                  ) : null}
                  <div className="svRg-optionbtn-box">
                    {options3.map((item, index) => {
                      return (
                        <div className="svRg-optionbtn" key={index}>
                          <span>{item}</span>
                          <span
                            className="svRg-btn-optionRemove"
                            onClick={option3Remove}
                          >
                            x
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <li className="svRg-form-list" id="svRgSubmitBtnList">
            <button className="svRg-btn-submit btn- btn-o" type="submit">
              저장
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default SurveyRegist;
