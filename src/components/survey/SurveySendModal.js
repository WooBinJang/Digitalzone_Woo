import React, { useEffect } from "react";
import { numberComma } from "../../util/NumberComma";
import "./SurveySendModal.css";

const SurveySendModal = ({
  setPoint,
  point,
  modalClose,
  post,
  setPosts,
  posts,
}) => {
  useEffect(() => {
    if (post.sendStatus) {
      alert("전송이 완료된 설문입니다.");
      modalClose();
    }
  }, []);

  const updateSendStatus = () => {
    setPoint(point - post.pointPerPerson * post.needSample);
    const updatePosts = [...posts];
    for (let data of updatePosts) {
      if (data.num === post.num) {
        data.sendStatus = true;
      }
    }
    setPosts(updatePosts);
  };
  console.log(point);
  return (
    <div className="SurveySendModal-box">
      <div className="SurveySendModal-top-box">
        <h2 className="SurveySendModal-title">설문 전송</h2>
        <div className="SurveySendModal-button" onClick={modalClose}>
          X
        </div>
      </div>
      <div className="SurveySendModal-phrases-box">
        <p className="SurveySendModal-phrases-1">설문을 발송하시겠습니까?</p>
        <p className="SurveySendModal-phrases-2">[ 설문 명세서 ]</p>
      </div>
      <div className="SurveySendModal-list-box">
        <ul className="SurveySendModal-list">
          <li>조사명 : {post.surveyName}</li>
          <li>설문링크 : {post.link}</li>
          <li>필요샘플 수 : {numberComma(post.needSample)}</li>
          <li>참여포인트 : {numberComma(post.pointPerPerson)} point</li>
          <li>설문기간 : {post.date}</li>
          <li>발송패널 수 : {numberComma(post.completeSample)} 건</li>
          <li className="SurveySendModal-list-li">
            <div className="SurveySendModal-list-profile-title">
              설문 프로파일 :
            </div>
            <div className="SurveySendModal-list-profile-des">
              {post.profile1.map((item, index) => {
                return (
                  <span className="SurveySendModal-list-span" key={index}>
                    {item}
                  </span>
                );
              })}
              {post.profile2.map((item, index) => {
                return (
                  <span className="SurveySendModal-list-span" key={index}>
                    {item}
                  </span>
                );
              })}
              {post.profile3.map((item, index) => {
                return (
                  <span className="SurveySendModal-list-span" key={index}>
                    {item}
                  </span>
                );
              })}
            </div>
          </li>
        </ul>
      </div>
      <h3 className="SurveySendModal-point-deduction">
        총 {numberComma(post.pointPerPerson * post.needSample)} point가
        차감됩니다.
      </h3>
      <div className="SurveySendModal-footer-btn-box">
        <button
          className="SurveySendModal-btn btn-s btn-o"
          onClick={() => {
            updateSendStatus();
            alert("전송이 완료되었습니다.");
            modalClose();
          }}
        >
          확인
        </button>
        <button
          className="SurveySendModal-btn btn-s btn-o"
          onClick={modalClose}
        >
          취소
        </button>
      </div>
    </div>
  );
};
export default SurveySendModal;
