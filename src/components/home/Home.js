import React, { useEffect, useState } from "react";
import "./Home.css";
import Gnb from "../common/Gnb";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoginCheck from "../common/LoginCheck";

function Home({ user, posts }) {
  const history = useHistory();
  const filterPosts = posts.filter((item) => item.sendStatus === true); // 발송이 된 데이터
  const today = moment().format("YYYY-MM-DD");
  for (let x of filterPosts) {
    const dateData = x.date.replace(/\./gi, "-");
    const dateArr = dateData.split("~");
    x.sDate = dateArr[0].trim(); // 시작일
    x.eDate = dateArr[1].trim(); // 종료일
    if (today < x.sDate) {
      x.surveySendState = "설문예정";
    } else if (x.sDate <= today && today <= x.eDate) {
      x.surveySendState = "설문중";
    } else if (x.eDate < today) {
      x.surveySendState = "설문마감";
    }
  }
  // useEffect(() => {
  //   let accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || null;
  //   if (accessToken === null) {
  //     history.push("/login");
  //   }
  // }, []);

  const [radioValue, setRadioValue] = useState("설문예정");
  function changeRadioValue(e) {
    setRadioValue(e.target.value);
  }
  return (
    <div>
      <LoginCheck />
      <Gnb user={user} />
      <form className="select">
        <label>
          <input
            onClick={changeRadioValue}
            className="select-one"
            type="radio"
            name="설문"
            value="설문예정"
            defaultChecked
          />
          설문예정
        </label>
        <label>
          <input
            onClick={changeRadioValue}
            className="select-two"
            type="radio"
            name="설문"
            value="설문중"
          />
          설문중
        </label>
        <label>
          <input
            onClick={changeRadioValue}
            className="select-three"
            type="radio"
            name="설문"
            value="설문마감"
          />
          설문마감
        </label>
      </form>
      <table className="qa-table">
        <thead className="">
          <tr>
            <th id="num">설문번호</th>
            <th id="name">조사명</th>
            <th id="date">요청기간</th>
            <th id="re-sample">필요샘플 수</th>
            <th id="co-sample">완료샘플 수</th>
            <th id="state">상태</th>
            <th id="user">등록자</th>
            <th id="team">소속</th>
          </tr>
        </thead>
        <tbody>
          {filterPosts.map(function (data, index) {
            return radioValue === data.surveySendState ? (
              <tr key={index}>
                <td>{data.num}</td>
                <td>{data.surveyName}</td>
                <td>{data.date}</td>
                <td>{data.needSample}</td>
                <td>{data.completeSample}</td>
                <td>{data.surveySendState}</td>
                <td>{data.registrant}</td>
                <td>{data.affiliation}</td>
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
