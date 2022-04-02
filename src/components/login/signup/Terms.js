import React from "react";
import { useState } from "react";
import "./Terms.css";
import { Link } from "react-router-dom";

const Terms = () => {
  /*const history = useHistory();*/
  const [checkedInputs, setCheckedInputs] = useState([]);
  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  };

  const isAllChecked = checkedInputs.length === 2;
  const disabled = !isAllChecked;
  return (
    <div className="inner">
      <div className="termsInner">
        <div className="signupBox">
          <h4 id="termsTitle">회원가입</h4>
          <div className="stepBox">
            <p id="signupEnter">Step1. 약관 동의</p>
            <p>Step2. 정보 입력</p>
            <p>Step3. 가입 완료</p>
          </div>
        </div>
        <div className="termsBox">
          <div className="checkBox">
            <p>
              이용약관&nbsp;<span className="essential">&#40;필수&#41;</span>
            </p>
            <div className="agreeCheck">
              <input
                type="checkbox"
                id="termsCheck"
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "check");
                }}
                checked={checkedInputs.includes("check") ? true : false}
                required
              ></input>
              &nbsp;
              <label className="agree" htmlFor="check">
                동의합니다
              </label>
            </div>
          </div>
          <p className="termsContents">
            이용 약관 1. 개인정보보호법에 따라 디지털존에 회원가입 신청하시는
            분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적,
            개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에
            관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
            1. 수집하는 개인정보 이용자는 회원가입을 하지 않아도 정보 검색, 뉴스
            보기 등 대부분의 디지털존 서비스를 회원과 동일하게 이용할 수
            있습니다. 이용자가 메일, 캘린더, 카페, 블로그 등과 같이 개인화 혹은
            회원제 서비스를 이용하기 위해 회원가입을 할 경우, 디지털존는 서비스
            이용을 위해 필요한 최소한의 개인정보를 수집합니다. 회원가입 시점에
            디지털존가 이용자로부터 수집하는 개인정보는 아래와 같습니다. - 회원
            가입 시에 ‘아이디, 비밀번호, 이름, 생년월일, 성별, 휴대전화번호’를
            필수항목으로 수집합니다. 만약 이용자가 입력하는 생년월일이 만14세
            미만 아동일 경우에는 법정대리인 정보(법정대리인의 이름, 생년월일,
            성별, 중복가입확인정보(DI), 휴대전화번호)를 추가로 수집합니다.
            그리고 선택항목으로 이메일 주소를 수집합니다. - 단체아이디로
            회원가입 시 단체아이디, 비밀번호, 단체이름, 이메일주소,
            휴대전화번호를 필수항목으로 수집합니다. 그리고 단체 대표자명을
            선택항목으로 수집합니다. 서비스 이용 과정에서 이용자로부터 수집하는
            개인정보는 아래와 같습니다. - 회원정보 또는 개별 서비스에서 프로필
            정보(별명, 프로필 사진)를 설정할 수 있습니다. 회원정보에 별명을
            입력하지 않은 경우에는 마스킹 처리된 아이디가 별명으로 자동
            입력됩니다. - 디지털존 내의 개별 서비스 이용, 이벤트 응모 및 경품
            신청 과정에서 해당 서비스의 이용자에 한해 추가 개인정보 수집이
            발생할 수 있습니다. 추가로 개인정보를 수집할 경우에는 해당 개인정보
            수집 시점에서 이용자에게 ‘수집하는 개인정보 항목, 개인정보의 수집 및
            이용목적, 개인정보의 보관기간’에 대해 안내 드리고 동의를 받습니다.
            서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보,
            위치정보가 생성되어 수집될 수 있습니다. 또한 이미지 및 음성을 이용한
            검색 서비스 등에서 이미지나 음성이 수집될 수 있습니다. 구체적으로 1)
            서비스 이용 과정에서 이용자에 관한 정보를 자동화된 방법으로 생성하여
            이를 저장(수집)하거나, 2) 이용자 기기의 고유한 정보를 원래의 값을
            확인하지 못 하도록 안전하게 변환하여 수집합니다. 서비스 이용
            과정에서 위치정보가 수집될 수 있으며, 디지털존에서 제공하는 위치기반
            서비스에 대해서는 '디지털존 위치정보 이용약관'에서 자세하게 규정하고
            있습니다. 이와 같이 수집된 정보는 개인정보와의 연계 여부 등에 따라
            개인정보에 해당할 수 있고, 개인정보에 해당하지 않을 수도 있습니다.
          </p>
          <div className="checkBox" id="lastCheckTerms">
            <p>
              개인정보수집 및 이용에 대한 안내&nbsp;
              <span className="essential">&#40;필수&#41;</span>
            </p>
            <div className="agreeCheck">
              <input
                type="checkbox"
                id="termsCheck2"
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "check2");
                }}
                checked={checkedInputs.includes("check2") ? true : false}
                required
              ></input>
              &nbsp;
              <label className="agree" htmlFor="check2">
                동의합니다
              </label>
            </div>
          </div>
          <p className="termsContents">
            위치정보 이용약관에 동의하시면, 위치를 활용한 광고 정보 수신 등을
            포함하는 디지털존 위치기반 서비스를 이용할 수 있습니다. 제 1 조
            (목적) 이 약관은 디지털존 주식회사 (이하 “회사”)가 제공하는
            위치정보사업 또는 위치기반서비스사업과 관련하여 회사와
            개인위치정보주체와의 권리, 의무 및 책임사항, 기타 필요한 사항을
            규정함을 목적으로 합니다. 제 2 조 (약관 외 준칙) 이 약관에 명시되지
            않은 사항은 위치정보의 보호 및 이용 등에 관한 법률, 정보통신망
            이용촉진 및 정보보호 등에 관한 법률, 전기통신기본법, 전기통신사업법
            등 관계법령과 회사의 이용약관 및 개인정보처리방침, 회사가 별도로
            정한 지침 등에 의합니다. 제 3 조 (서비스 내용 및 요금) ①회사는 직접
            위치정보를 수집하거나 위치정보사업자인 이동통신사로부터 위치정보를
            전달받아 아래와 같은 위치기반서비스를 제공합니다. 1.Geo Tagging
            서비스: 게시물에 포함된 개인위치정보주체 또는 이동성 있는 기기의
            위치정보가 게시물과 함께 저장됩니다. 2.위치정보를 활용한 검색결과
            제공 서비스: 정보 검색을 요청하거나 개인위치정보주체 또는 이동성
            있는 기기의 위치정보를 제공 시 본 위치정보를 이용한 검색결과 및
            주변결과(맛집, 주변업체, 교통수단 등)를 제시합니다. 3.위치정보를
            활용한 친구찾기 및 친구맺기: 현재 위치를 활용하여 친구를 찾아주거나
            친구를 추천하여 줍니다. 4.연락처 교환하기: 위치정보를 활용하여
            친구와 연락처를 교환할 수 있습니다. 5.이용자 위치를 활용한 광고정보
            제공: 검색결과 또는 기타 서비스 이용 과정에서 개인위치정보주체 또는
            이동성 있는 기기의 위치를 이용하여 광고소재를 제시합니다. 6. 이용자
            보호 및 부정 이용 방지: 개인위치정보주체 또는 이동성 있는 기기의
            위치를 이용하여 권한없는 자의 비정상적인 서비스 이용 시도 등을
            차단합니다. 7. 위치정보 공유: 개인위치정보주체 또는 이동성 있는
            기기의 위치정보를 안심귀가 등을 목적으로 지인 또는
            개인위치정보주체가 지정한 제3자에게 공유합니다. 8. 길 안내 등
            생활편의 서비스 제공: 교통정보와 길 안내 등 최적의 경로를 지도로
            제공하며, 주변 시설물 찾기, 뉴스/날씨 등 생활정보, 긴급구조 서비스
            등 다양한 운전 및 생활 편의 서비스를 제공합니다. ②제1항
            위치기반서비스의 이용요금은 무료입니다.
          </p>
        </div>
        <button className="terms-btn-next" disabled={disabled} id="nextBtn">
          <Link to={disabled ? "#" : "/infoinput"}>
            <h2>다음</h2>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Terms;
