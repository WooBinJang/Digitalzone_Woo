import { React, useState, useEffect, useContext } from "react";
import "./PointView.css";
import Gnb from "../common/Gnb";
import { Link, useParams, useLocation } from "react-router-dom";
import moment from "moment";
import { userDataStore } from "../Root";

const PointView = ({
  pointItems,
  setPointItems,
  user,
  addList,
  point,
  setPoint,
}) => {
  const { state } = useContext(userDataStore);

  const location = useLocation();
  const params = useParams();
  const id = Number(params.id);
  const pointItem = pointItems.find((item) => {
    return item.id === id;
  });
  const { currentPage, searchedItems } = location.state;

  const [prevSelectedValue, setPrevSelectValue] = useState("");
  const [selectValue, setSelectValue] = useState(pointItem.status);

  const onSaveClick = () => {
    var now = moment();
    var date = now.format("YYYY-MM-DD HH:mm:ss");
    let recordText = "";

    if (selectValue === pointItem.status) {
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

    setPointItems(
      pointItems.map((item) =>
        item.id === id
          ? {
              ...item,
              record: [recordText, ...item.record],
              status: selectValue,
              modifiedDate: now.format("YYYY.MM.DD"),
              modifiedBy: state.username,
            }
          : item
      )
    );
  };
  const addPointList = () => {
    if (pointItem.division === "환불신청" && selectValue === "완료") {
      pointItem.division = "환불완료";
      setPoint(Number(point) - Number(pointItem.pointAmount));
      addList(
        Number(point) - Number(pointItem.pointAmount),
        `-${pointItem.pointAmount}`
      );
    } else return;
  };

  const onSelectHandler = (e) => {
    setPrevSelectValue(selectValue);
    setSelectValue(e.target.value);
  };

  return (
    <div className="inner">
      <Gnb user={user} />
      <div className="pointDetails-box">
        <div className="point-details">
          <div className="point-details-inner">
            <div className="point-details-wrap">
              <div className="row">
                <span className="key">업체명</span>
                <span className="value">
                  {pointItem.companyName ? pointItem.companyName : "개인"}
                </span>
              </div>
              <div className="row">
                <span className="key">담당자명</span>
                <span className="value">{pointItem.managerName}</span>
              </div>
              <div className="row">
                <span className="key">연락처</span>
                <span className="value">{pointItem.phone}</span>
              </div>{" "}
              <div className="row">
                <span className="key">이메일</span>
                <span className="value">{pointItem.email}</span>
              </div>{" "}
              <div className="row">
                <span className="key">구분</span>
                <span className="value">{pointItem.division}</span>
              </div>{" "}
              <div className="row">
                <span className="key">포인트</span>
                <span className="value">{pointItem.pointAmount}</span>
              </div>
              <div className="row">
                <span className="key">계좌정보</span>
                <span className="value">
                  {pointItem.division === "충전"
                    ? null
                    : `${pointItem.bankName} | ${pointItem.bankAccountNumber} |
                  ${pointItem.bankUserName}`}
                </span>
              </div>
            </div>
          </div>{" "}
          <span className="point-details-select-menu">
            <span className="statusTitle">상태</span>
            <span className="select-wrap">
              <select
                name="status"
                onChange={(e) => {
                  onSelectHandler(e);
                }}
                value={selectValue}
                disabled={
                  pointItem.division === "충전" || pointItem.status === "완료"
                    ? true
                    : ""
                }
              >
                <option value="접수">접수</option>
                <option value="처리 중">처리 중</option>
                <option value="완료">완료</option>
              </select>
            </span>
            <button
              className="save-btn btn-o"
              onClick={() => {
                onSaveClick();
                addPointList();
              }}
            >
              저장
            </button>
            <Link
              to={{
                pathname: `/point/board`,
                state: {
                  currentPage: currentPage,
                  searchedItems: searchedItems,
                },
              }}
            >
              <button className="list-btn btn-o">목록</button>
            </Link>
          </span>
          <div className="status-record-container">
            <span className="status-record-title">[기록]</span>
            <ul className="record-list">
              {pointItem.record.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointView;
