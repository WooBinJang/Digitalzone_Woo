import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Gnb from "../common/Gnb";
import "./SurveyModify.css";
import moment from "moment";

function SurveyModify({ posts, setPosts, location, user }) {
  const date = moment().format("YYYY-MM-DD");

  const history = useHistory();
  const params = location.state;
  const dateData = params.params.date.replace(/\./gi, "-");
  const dateArr = dateData.split("~");
  dateArr[0] = dateArr[0].trim();
  dateArr[1] = dateArr[1].trim();
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
  const [options1, setOptions1] = useState([...params.params.profile1]);
  const [options2, setOptions2] = useState([...params.params.profile2]);
  const [options3, setOptions3] = useState([...params.params.profile3]);
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
  const surveyName = useRef(params.params.surveyName);
  const link = useRef(params.params.link);
  const needSample = useRef(params.params.needSample);
  const pointPerPerson = useRef(params.params.pointPerPerson);
  const dateFrom = useRef(dateArr[0]);
  const dateTo = useRef(dateArr[1]);

  const modifyPost = () => {
    let arrPost = [...posts];
    // const post = arrPost.filter((x) => x.num === params.params.num);
    for (let i = 0; i < arrPost.length; i++) {
      if (i === params.params.num - 1) {
        arrPost.splice(arrPost.length - 1 - i, 1, {
          num: params.params.num,
          link: link.current.value,
          surveyName: surveyName.current.value,
          date: `${dateFrom.current.value} ~ ${dateTo.current.value}`,
          needSample: needSample.current.value,
          completeSample: params.params.completeSample,
          pointPerPerson: pointPerPerson.current.value,
          profile1: [...options1],
          profile2: [...options2],
          profile3: [...options3],
          state: "승인대기",
          registrant: params.params.registrant,
          affiliation: params.params.affiliation,
          activation: params.params.activation,
          record: params.params.record,
          modifiedBy: params.params.modifiedBy,
          modifiedDate: params.params.modifiedDate,
          sendStatus: params.params.sendStatus,
        });
      }
    }
    setPosts(arrPost);
    alert("수정이 완료되었습니다");
    history.push(`/survey`);
  };
  return (
    <div className="surveyModify-box">
      <Gnb user={user} />
      <div className="surveyModify">
        <div className="surveyModify-pageTitle-box">
          <h3 className="surveyModify-pageTitle">설문 수정</h3>
        </div>
        <form className="surveyModify-form-box" action="/">
          <ul className="surveyModify-form-lists">
            <li className="surveyModify-form-list">
              <label htmlFor="">조사명</label>
              <input
                id="surveyModifySurveyTitle"
                type="text"
                defaultValue={params.params.surveyName}
                ref={surveyName}
                required
              />
            </li>
            <li className="surveyModify-form-list">
              <label htmlFor="surveyModifySurveyUrl">설문링크</label>
              <input
                id="surveyModifySurveyUrl"
                type="url"
                placeholder="설문 URL을 기입해주세요"
                defaultValue={params.params.link}
                ref={link}
                required
              />
            </li>
            <li className="surveyModify-form-list">
              <label htmlFor="surveyModifyNeededSamples">필요샘플 수</label>
              <input
                id="surveyModifyNeededSamples"
                type="number"
                min={0}
                placeholder="숫자만 입력가능합니다."
                defaultValue={params.params.needSample}
                ref={needSample}
                required
              />
              <label
                htmlFor="surveyModifyPointPerPerson"
                className="surveyModify-label-point"
              >
                참여 포인트
              </label>
              <input
                id="surveyModifyPointPerPerson"
                type="number"
                min={0}
                placeholder="숫자만 입력가능합니다."
                defaultValue={params.params.pointPerPerson}
                ref={pointPerPerson}
                required
              />
            </li>
            <li className="surveyModify-form-list">
              <label htmlFor="surveyModifyFileName">방송패널 등록</label>
              <input
                id="surveyModifyFileRegister"
                type="file"
                ref={fileInput}
                onChange={movefileName}
                required
              />
              <label
                id="surveyModifyFileBtn"
                className="btn-s btn-o"
                htmlFor="surveyModifyFileRegister"
              >
                파일 등록
              </label>
              <input id="surveyModifyFileName" ref={fileName} readOnly />
              <p id="surveyModifyPanelNum" ref={panelNum}></p>
            </li>
            <li className="surveyModify-form-list">
              <label htmlFor="surveyModifyDateFrom">요청기간</label>
              <input
                id="surveyModifyDateFrom"
                type="date"
                ref={dateFrom}
                defaultValue={dateArr[0]}
                min={date}
                required
              />
              <label id="surveyModifyWave" htmlFor="surveyModifyDateTo">
                ~
              </label>
              <input
                id="surveyModifyDateTo"
                type="date"
                ref={dateTo}
                min={date}
                defaultValue={dateArr[1]}
                required
              />
            </li>
            <li className="surveyModify-form-list">
              <div className="surveyModify-profile-title">설문 프로파일</div>
              <ul className="surveyModify-profile-lists">
                <li className="surveyModify-profile-list">
                  <h6 className="surveyModify-profile-steps">1단계</h6>
                  <div className="surveyModify-options-box">
                    <select
                      className="surveyModify-options-depth1"
                      onChange={(e) => setProfile1(e.target.value)}
                    >
                      <option value="">항목선택</option>
                      <option value="sex">성별</option>
                      <option value="age">나이</option>
                    </select>
                    {profile1 === "sex" ? (
                      <select
                        className="surveyModify-options-depth2"
                        onChange={addOption1btn}
                      >
                        <option value="">성별선택</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                      </select>
                    ) : null}
                    {profile1 === "age" ? (
                      <select
                        className="surveyModify-options-depth2"
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
                    <div className="surveyModify-optionbtn-box">
                      {options1.map((item, index) => {
                        return (
                          <div className="surveyModify-optionbtn" key={index}>
                            <span>{item}</span>
                            <span
                              className="surveyModify-btn-optionRemove"
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
                <li className="surveyModify-profile-list">
                  <h6 className="surveyModify-profile-steps">2단계</h6>
                  <div className="surveyModify-options-box">
                    <select
                      className="surveyModify-options-depth1"
                      onChange={(e) => setProfile2(e.target.value)}
                    >
                      <option value="">항목선택</option>
                      <option value="mobileOpreator">통신사</option>
                    </select>
                    {profile2 === "mobileOpreator" ? (
                      <select
                        className="surveyModify-options-depth2"
                        onChange={addOption2btn}
                      >
                        <option value="">통신사 선택</option>
                        <option value="SKT">SKT</option>
                        <option value="KT">KT</option>
                        <option value="LG U+">LG U+</option>
                      </select>
                    ) : null}
                    <div className="surveyModify-optionbtn-box">
                      {options2.map((item, index) => {
                        return (
                          <div className="surveyModify-optionbtn" key={index}>
                            <span>{item}</span>
                            <span
                              className="surveyModify-btn-optionRemove"
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
                <li className="surveyModify-profile-list">
                  <h6 className="surveyModify-profile-steps">3단계</h6>
                  <div className="surveyModify-options-box">
                    <select
                      className="surveyModify-options-depth1"
                      onChange={(e) => setProfile3(e.target.value)}
                    >
                      <option value="">항목선택</option>
                      <option value="electricDevice">전자기기</option>
                    </select>
                    {profile3 === "electricDevice" ? (
                      <select
                        className="surveyModify-options-depth2"
                        onChange={(e) => setProfile3_2(e.target.value)}
                      >
                        <option value="">전자기기 선택</option>
                        <option value="cellphone">휴대폰</option>
                        <option value="notebook">노트북</option>
                      </select>
                    ) : null}
                    {profile3_2 === "cellphone" ? (
                      <select
                        className="surveyModify-options-depth3"
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
                        className="surveyModify-options-depth3"
                        onChange={addOption3btn}
                      >
                        <option value="">노트북 선택</option>
                        <option value="맥북프로">맥북 프로</option>
                        <option value="삼성울트라">삼성 갤럭시북 프로</option>
                        <option value="LG 그램">LG 그램 2022</option>
                      </select>
                    ) : null}
                    <div className="surveyModify-optionbtn-box">
                      {options3.map((item, index) => {
                        return (
                          <div className="surveyModify-optionbtn" key={index}>
                            <span>{item}</span>
                            <span
                              className="surveyModify-btn-optionRemove"
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
            <li
              className="surveyModify-form-list"
              id="surveyModifySubmitBtnList"
            >
              <div>
                <button
                  className="surveyModify-btn-submit btn-s btn-o"
                  onClick={() => {
                    modifyPost();
                  }}
                >
                  수정
                </button>
                <button
                  className="surveyModify-btn-submit btn-s btn-o"
                  onClick={() => {
                    alert("수정이 취소되었습니다.");
                    history.push(`/survey`);
                  }}
                >
                  취소
                </button>
              </div>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default SurveyModify;
