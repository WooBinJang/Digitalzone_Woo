import React, { useState, useRef, useEffect, useContext } from "react";
import moment from "moment";
import "./ManegePoint.css";
import Gnb from "../common/Gnb";
import { userDataStore } from "../Root";

const ManagePoint = ({
  point,
  setPoint,
  list,
  setList,
  user,
  pointItems,
  setPointItems,
  addList,
}) => {
  const [inputPoint, setInputPoint] = useState("");
  /* 충전포인트 input 값 */
  const [refundPoint, setRefundPoint] = useState("");
  /* 환불포인트 input 값 */
  const [accountName, setAccountName] = useState("");
  /* 계좌명 input 값 */
  const [refundAccount, setRefundAccount] = useState("");
  /* 환불계좌번호 input 값 */

  const { state } = useContext(userDataStore);

  const refundPoint1 = useRef(); //환불 input
  const inputPoint1 = useRef(); //충전 input
  const accountName1 = useRef(); //계좌명 input
  const refundAccount1 = useRef(); // 환불 계좌 input

  const [select, setSelect] = useState("");
  /* 드랍박스 메뉴 */

  let date = moment().format("YYYY-MM-DD");
  /* 날짜 */

  const onSubmit = (e) => {
    e.preventDefault(); //새로고침방지
    if (inputPoint1.current.value === "") {
      alert("포인트 값을 입력해주세요.");
    } else {
      chargeRequest();
      setPoint(Number(inputPoint1.current.value) + Number(point)); //number 처리를 해야 point 가 추가된다.
      addList(
        Number(inputPoint1.current.value) + Number(point),
        `+${inputPoint1.current.value}`
      );
      inputPoint1.current.value = ""; //빈값처리
    }
  };
  /* 포인트충전 버튼 함수 */
  const selectChg = (e) => {
    setSelect(e.target.value);
  };

  const refundRequest = () => {
    const pDataList = [...pointItems];
    pDataList.unshift({
      id: pDataList.length + 1,
      companyName: state.userco,
      managerName: state.username,
      phone: state.phoneNumber,
      email: state.mail,
      pointAmount: refundPoint1.current.value,
      division: "환불신청",
      applyDate: date,
      modifiedDate: "",
      status: "접수",
      modifiedBy: "해당없음",
      record: [],
      bankName: select,
      bankAccountNumber: refundAccount1.current.value,
      bankUserName: accountName1.current.value,
    });
    setPointItems(pDataList);
    alert("환불신청이 완료되었습니다.");
  };
  /* 포인트 환불 신청 함수 */
  const chargeRequest = () => {
    const pDataList = [...pointItems];
    pDataList.unshift({
      id: pDataList.length + 1,
      companyName: state.userco,
      managerName: state.username,
      phone: state.phoneNumber,
      email: state.mail,
      pointAmount: inputPoint1.current.value,
      division: "충전",
      applyDate: date,
      modifiedDate: date,
      status: "완료",
      modifiedBy: "해당없음",
      record: [],
    });
    setPointItems(pDataList);
  };
  /* 포인트 충전 리스트 함수 */

  const refund = (e) => {
    e.preventDefault(); //새로고침방지
    if (point < refundPoint1.current.value) {
      alert("환불 포인트가 기존 포인트 값보다 많습니다.");
      setRefundPoint("");
    } else if (select === "") {
      alert("은행을 선택해주세요");
    } else if (refundPoint1.current.value === "") {
      alert("환불 포인트를 적어주세요");
    } else if (refundAccount1.current.value === "") {
      alert("환불 가능한 계좌를 입력해주세요");
    } else if (accountName1.current.value === "") {
      alert("계좌명을 입력해주세요");
    } else {
      refundRequest();
    }
  };
  /* 포인트 환불 함수 */

  return (
    <div className="inner_box Manage-inner">
      <Gnb user={user} />
      <div className="head-refund-wrap">
        <div className="managePoint-header">
          <h1>[보유포인트]</h1>
          <span>{point} point</span>
        </div>{" "}
        {/* 헤드 */}
        <div className="managePoint-refund-box">
          <form className="refund-input">
            <span className="bank-option">
              <select name="banktitle" id="bankTitle" onChange={selectChg}>
                <option value="none">은행</option>
                <option value="shinhan">신한은행</option>
                <option value="kb">국민은행</option>
                <option value="nh">농협은행</option>
                <option value="기업">기업은행</option>
                <option value="하나">하나은행</option>
                <option value="카카오">카카오</option>
                <option value="우리">우리은행</option>
              </select>
            </span>
            <span>
              <input
                ref={refundAccount1}
                type="number"
                className="backaccount-input"
                name="backAccountInput"
                placeholder="환불계좌 입력(-빼고)"
              />
            </span>
            <span>
              <input
                ref={accountName1}
                type="text"
                className="backaccount-title-input"
                name="backaccountTitleInput"
                placeholder="계좌명 입력"
              />
            </span>
            <span>
              <input
                ref={refundPoint1}
                className="refund-point-input"
                name="refundPointInput"
                type="number"
                placeholder="환불포인트 입력"
              />
            </span>
            <button onClick={refund} className="btn-refund">
              환불신청
            </button>
            <div className="text-refund">
              <p>* 보유 포인트 이하만 환불신청이 가능합니다.</p>
            </div>
          </form>
        </div>{" "}
        {/* 환불 박스 */}
      </div>

      <div className="managePoint-log-box">
        <h2>[사용내역]</h2>
        <ul className="managePoint-log-list">
          {list.map((item, i) => (
            <li key={i}>
              <span>{date}</span>
              <span>{item.title}</span>
              <span>{item.state}</span>
              <span>잔여:{item.point}point </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="managePoint-charge-point">
        <form className="form-charge-point">
          <input
            ref={inputPoint1}
            type="number"
            name="chargePointInput"
            id="inputPoint"
            placeholder="충전포인트 입력"
          />
          <p>* 카드결제만 가능합니다.</p>
          <button onClick={onSubmit} className="btn-charge">
            충전하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagePoint;
