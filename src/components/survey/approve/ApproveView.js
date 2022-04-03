import { React, useContext, useRef, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Gnb from "../../common/Gnb";
import "./ApproveView.css";
import moment from "moment";
import { userDataStore } from "../../Root";
import { numberComma } from "../../../util/NumberComma";

const ApproveView = ({ surveyApproveItems, setPosts, user }) => {
  const params = useParams();
  const reasonRef = useRef();
  const id = Number(params.id);
  const surveyApproveItem = surveyApproveItems.find((item) => {
    return item.num === id;
  });
  const surveyProfiles = surveyApproveItem.profile1; //.concat(surveyApproveItems.profile2,surveyApproveItems.profile3)
  const [prevSelectedValue, setPrevSelectValue] = useState("");
  const [selectValue, setSelectValue] = useState(surveyApproveItem.state);
  const location = useLocation();
  const { currentPage, searchedItems } = location.state;
  const { state } = useContext(userDataStore);
  const onSaveClick = () => {
    var now = moment();
    var date = now.format("YYYY-MM-DD HH:mm:ss");
    let recordText = "";

    if (selectValue === surveyApproveItem.state) {
      alert("변경하려는 상태 값이 같습니다.");
      return;
    }
    if (prevSelectedValue === "") {
      recordText = `· ${date}  ${state.username}님이 상태를  ${selectValue} 로 변경하였습니다. `;
    } else {
      recordText = `· ${date}  ${
        state.username
      }님이 상태를 ${prevSelectedValue}에서 ${
        selectValue === "처리중" ? `${selectValue} 으로` : `${selectValue} 로`
      }   변경하였습니다. `;
    }
    setPosts(
      surveyApproveItems.map((item) =>
        item.num === id
          ? {
              ...item,
              record: [recordText, ...item.record],
              state: selectValue,
              modifiedDate: now.format("YYYY.MM.DD"),
              modifiedBy: "관리자",
              activation: selectValue === "승인완료" ? true : false,
              reasons: reasonRef.current.value,
            }
          : item
      )
    );
  };
  const onSelectHandler = (e) => {
    setPrevSelectValue(selectValue);
    setSelectValue(e.target.value);
  };

  return (
    <div className="inner">
      <Gnb user={user} />
      <div className="surveyApproveDetails-box">
        <div className="details-container">
          <div className="details-wrap">
            <div className="details-left">
              <div className="details-left-inner">
                <div className="row">
                  <span className="key">업체명</span>
                  <span className="value">{surveyApproveItem.affiliation}</span>
                </div>
                <div className="row">
                  <span className="key">사용자명</span>
                  <span className="value">{surveyApproveItem.registrant}</span>
                </div>
                <div className="row">
                  <span className="key">아이디</span>
                  <span className="value">{surveyApproveItem.accountid}</span>
                </div>

                <div className="row">
                  <span className="key">연락처</span>
                  <span className="value">{surveyApproveItem.phoneNumber}</span>
                </div>
                <div className="row">
                  <span className="key">이메일</span>
                  <span className="value">{surveyApproveItem.mail}</span>
                </div>
              </div>
            </div>
            <div className="details-right">
              <ul>
                <li>· 조사명 : {surveyApproveItem.surveyName}</li>
                <li>· 설문링크 :{surveyApproveItem.link}</li>
                <li>
                  · 필요샘플 수 : {numberComma(surveyApproveItem.needSample)}
                </li>
                <li>
                  · 참여포인트 : {numberComma(surveyApproveItem.pointPerPerson)}
                  point
                </li>
                <li>· 설문기간 : {surveyApproveItem.date}</li>
                <li>· 발송패널 수 : 8,545건</li>
                <li>
                  <span>· 설문 프로파일 </span>
                  <span className="survey-profile-container">
                    {surveyProfiles.map((profile, index) => {
                      return (
                        <span className="survey-profile-text" key={index}>
                          {profile}
                        </span>
                      );
                    })}
                  </span>
                </li>
              </ul>
              <span className="payment-point">
                {`· 결제 포인트 : ${numberComma(
                  surveyApproveItem.needSample *
                    surveyApproveItem.pointPerPerson
                )} point`}
              </span>
              <div className="select-container">
                <ul>
                  <li>
                    {" "}
                    <span className="status-title">
                      상태
                      <span className="select-wrap">
                        <select
                          name="status"
                          onChange={(e) => {
                            onSelectHandler(e);
                          }}
                          value={selectValue}
                          disabled={
                            surveyApproveItem.state === "승인완료" ? "true" : ""
                          }
                        >
                          <option value="승인대기" color="#0000ff">
                            승인대기
                          </option>
                          <option value="승인완료">승인완료</option>
                          <option value="승인거부">승인거부</option>
                          <option value="설문종료">설문종료</option>
                        </select>
                      </span>
                    </span>
                  </li>
                  <li className={selectValue !== "승인거부" ? "blind" : null}>
                    <span className="reason-title">사유</span>
                    <input
                      id="reason"
                      type="text"
                      placeholder="사유를 입력해주세요"
                      ref={reasonRef}
                    ></input>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="btn-container">
            <div className="btn-container-wrap">
              <button className="save-btn btn-o" onClick={onSaveClick}>
                저장
              </button>

              <Link
                to={{
                  pathname: `/approve/board`,
                  state: {
                    currentPage: currentPage,
                    searchedItems: searchedItems,
                  },
                }}
              >
                <button className="list-btn btn-o">목록</button>
              </Link>
            </div>
          </div>
          <div className="status-record">
            <span className="status-record-title">[기록]</span>
            <ul className="record-list">
              {surveyApproveItem.record.map((item) => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveView;
