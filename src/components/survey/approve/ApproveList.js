import React from "react";
import Approve from "./Approve";
import "./ApproveList.css";
const ApproveList = ({ surveyApproveItems, currentPage, searchedItems }) => {
  return (
    <table className="approve-table">
      <thead>
        <tr>
          <th width="3%">번호</th>
          <th width="25%">조사명</th>
          <th width="25%">요청기간</th>
          <th width="10%">필요샘플 수</th>

          <th width="10%">완료샘플 수</th>
          <th width="10%">상태</th>
          <th width="9%">상태변경일</th>
          <th width="10%">상태변경자</th>
          <th>소속</th>
        </tr>
      </thead>
      {surveyApproveItems.map((item) => {
        return (
          <Approve
            key={item.num}
            post={item}
            currentPage={currentPage}
            searchedItems={searchedItems}
          />
        );
      })}
    </table>
  );
};

export default ApproveList;
