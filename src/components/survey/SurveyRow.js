import React from "react";
import { Link } from "react-router-dom";
import { numberComma } from "../../util/NumberComma";
import "./SurveyRow.css";
const SurveyRow = ({
  num,
  surveyName,
  date,
  needSample,
  completeSample,
  state,
  registrant,
  affiliation,
  activation,
  setIndex,
  link,
  profile1,
  profile2,
  profile3,
  pointPerPerson,
  currentPage,
  record,
  modifiedBy,
  modifiedDate,
  sendStatus,
  reasons
}) => {
  return (
    <tr className={activation ? "survey-row-on" : "survey-row-off"}>
      <td>
        <input
          type="radio"
          className="survey-row-radio"
          name="survey-row-radio"
          onClick={(e) => {
            if (!activation) {
              alert("승인이 완료된 설문만 발송 할 수 있습니다.");
              e.preventDefault();
            } else {
              // setIndex(Number(e.target.parentElement.nextSibling.innerText));
              setIndex(num);
            }
          }}
        />
      </td>

      <td>{num}</td>
      <td>
        <Link
          to={{
            pathname: `/survey/SurveyDetail/${num}`,
            state: {
              num: num,
              date: date,
              surveyName: surveyName,
              needSample: needSample,
              completeSample: completeSample,
              state: state,
              registrant: registrant,
              affiliation: affiliation,
              link: link,
              profile1: profile1,
              profile2: profile2,
              profile3: profile3,
              pointPerPerson: pointPerPerson,
              activation: activation,
              currentPage: currentPage,
              record: record,
              modifiedBy: modifiedBy,
              modifiedDate: modifiedDate,
              sendStatus: sendStatus,
              reasons: reasons
            },
          }}
        >
          {surveyName}
        </Link>
      </td>
      <td>{date}</td>
      <td>{numberComma(needSample)}</td>
      <td>{numberComma(completeSample)}</td>
      <td>{state}</td>
      <td>{registrant}</td>
      <td>{affiliation}</td>
    </tr>
  );
};

export default SurveyRow;
