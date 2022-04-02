import React from "react";
import Gnb from "../common/Gnb";
import "./Guide.css";

const Guide = ({ user }) => {
  return (
    <div className="inner">
      <Gnb user={user} />
      <div className="guide-inner">
        <h3 className="guide-section-title">설문발송순서</h3>
        <ol className="guide-section-list">
          <li>신규설문을 등록해주세요.</li>
          <li>
            설문현황 페이지에서 발송을 원하는 설문에 체크 후 발송버튼을 클릭해
            주세요.
          </li>
          <li>발송내역 명세서를 꼼꼼히 확인해주세요.</li>
          <li>
            (필요 샘플 수) X (1인당 지급 포인트) 만큼 포인트가 선 차감됩니다.
          </li>
          <li>
            설문 종료 후 받은 설문응답 수 만큼 실제 차감 포인트는 자동으로
            계산되어 추가 차감이나 복원이 됩니다.
          </li>
        </ol>
        <h3 className="guide-section-title">포인트 충전/사용/환불 안내</h3>
        <ol className="guide-section-list">
          <li>
            포인트 관리 페이지에서는 포인트 사용현황 조회와 충전 및 환불을 할 수
            있어요.
          </li>
          <li>포인트 충전은 '카드결제'만 가능합니다.</li>
          <li>포인트 환불은 2~3일 후 입력한 계좌로 입금됩니다.</li>
        </ol>
      </div>
    </div>
  );
};

export default Guide;
