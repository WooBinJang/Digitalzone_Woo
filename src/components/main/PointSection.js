import React from "react";
import "./PointSection.css";
const PointSection = () => {
  return (
    <section className="point-section">
      <div className="main-inner">
        <h1 className="point-title">
          <span>디지털존</span>의 포인트 제도를 확인해보세요.
        </h1>
        <p className="point-des">
          필요한 사항에 꼭 맞는 기능을 갖춘 간편한 포인트 제도를 사용해보세요.
          <br />
          <span>
            (필요샘플수) X (1인당 지급 포인트) 만큼의 포인트가 필요합니다.
          </span>
        </p>
        <div className="point-content-box">
          <div className="point-content-detail-box point-content-detail-box-down ">
            <div className="point-content-step">STEP1</div>
            <div className="point-content-total-box">
              <div className="point-img-box">
                <img
                  className="point-img"
                  src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img/healthicons-money-bag-outline.png"
                  alt="포인트 충전 아이콘"
                />
              </div>
              <div className="point-img-des-box">
                <p className="point-img-des">포인트를 충전합니다.</p>
              </div>
            </div>
          </div>
          <div className="point-content-detail-box">
            <div className="point-content-step">STEP2</div>
            <div className="point-content-total-box">
              <div className="point-img-box">
                <img
                  className="point-img"
                  src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img//mdi-cash-minus.png"
                  alt="포인트 차감 아이콘"
                />
              </div>
              <div className="point-img-des-box">
                <p className="point-img-des">
                  필요한 포인트만큼
                  <br /> 선 차감 됩니다.
                </p>
              </div>
            </div>
          </div>
          <div className="point-content-detail-box point-content-detail-box-down">
            <div className="point-content-step">STEP3</div>
            <div className="point-content-total-box">
              <div className="point-img-box">
                <img
                  className="point-img"
                  src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img//mdi-account-cash.png"
                  alt="포인트 충전 아이콘"
                />
              </div>
              <div className="point-img-des-box">
                <p className="point-img-des font-small">
                  설문 종료 후 받은 설문응답 수 만큼 <br />
                  차감 포인트는 자동으로 계산되어 <br />
                  추가 차감이나 복원이 됩니다.
                </p>
              </div>
            </div>
          </div>
          <div className="point-content-detail-box">
            <div className="point-content-step">STEP4</div>
            <div className="point-content-total-box">
              <div className="point-img-box">
                <img
                  className="point-img"
                  src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img/mdi-cash-refund.png"
                  alt="포인트 충전 아이콘"
                />
              </div>
              <div className="point-img-des-box">
                <p className="point-img-des">
                  남은 포인트는 <br />
                  환불받을 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PointSection;
