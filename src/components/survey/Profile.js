import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
const Profile = ({ params }) => {
  return (
    <div className="profile-box">
      <div className="inner-800">
        <div className="profile-main-box">
          <h2 className="profile-title">설문 프로파일</h2>
          <div className=" profile-profile-box">
            <div className="profile-box-level">
              <span className="profile-box-level-text">1단계 :</span>
              <div className="profile-box-level-des">
                {params.profile1.map((item, index) => {
                  return (
                    <span className="profile-box-level-detail" key={index}>
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className=" profile-profile-box">
            <div className="profile-box-level">
              <span className="profile-box-level-text">2단계 :</span>
              <div className="profile-box-level-des">
                {params.profile2.map((item, index) => {
                  return (
                    <span className="profile-box-level-detail" key={index}>
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className=" profile-profile-box">
            <div className="profile-box-level">
              <span className="profile-box-level-text">3단계 :</span>
              <div className="profile-box-level-des">
                {params.profile3.map((item, index) => {
                  return (
                    <span className="profile-box-level-detail" key={index}>
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="profile-sub-title-box">
          <h3 className="profile-sub-title">재전송 시도 내역</h3>
          <div className="profile-sub-des-box">
            <span className="profile-sub-des"> 21.10.01 13:38 </span>
            <span className="profile-sub-des">3,000 건</span>
          </div>
          <h3 className="profile-sub-title">설문 승인 여부</h3>
          <div className="profile-sub-des-box">
            <span className="profile-sub-des">21.10.01 13:38 </span>
            <span className="profile-sub-des">
              {params.state}
              {params.state === "승인거부" ? `(${params.reasons})` : null}
            </span>
          </div>
        </div>
        <div className="profile-footer-btn-box">
          <Link
            to={{
              pathname: `/survey/surveymodify`,
              state: {
                params: params,
              },
            }}
          >
            {params.state === "승인완료" ? null : (
              <button className="profile-footer-btn btn-o  btn-s">수정</button>
            )}
          </Link>

          <Link
            to={{
              pathname: `/survey/`,
              state: {
                currentPage: params.currentPage,
              },
            }}
          >
            <button className="profile-footer-btn btn-o  btn-s">목록</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
