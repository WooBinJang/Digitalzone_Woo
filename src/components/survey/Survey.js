import React, { useEffect, useRef, useState } from "react";
import "./Survey.css";
import SurveyRow from "./SurveyRow";
import Pagination from "../common/Pagination";
import Modal from "../common/Modal";
import Gnb from "../common/Gnb";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Survey = ({
  point,
  totalIndexPosts,
  setPosts,
  user,
  AllDataPosts,
  location,
  setPoint,
}) => {
  const history = useHistory();
  const surveyInputRef = useRef();

  const [searchedSurveys, setSearchedSurveys] = useState(AllDataPosts);
  const [surveyRegistModal, setSurveyRegistModal] = useState(false);
  const [surveyModalOpen, surveySetModalOpen] = useState(false);
  const [index, setIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 10;
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  useEffect(() => {
    setSearchedSurveys(AllDataPosts);
  }, [AllDataPosts]);

  useEffect(() => {
    if (location.state === undefined) {
      setCurrentPage(1);
    } else {
      setCurrentPage(location.state.currentPage);
      history.replace();
    }
  }, []);

  const modalClose = () => {
    surveySetModalOpen(!surveyModalOpen);
  };

  const surveyRegistModalClose = () => {
    setSurveyRegistModal(!surveyRegistModal);
  };

  const checkIndexFnc = (index) => {
    if (index == null) {
      alert("설문을 선택 해주세요.");
      return false;
    } else {
      return true;
    }
  };
  const checkSendStatusFnc = () => {
    if (totalIndexPosts[totalIndexPosts.length - index].sendStatus) {
      alert("발송 완료된 설문입니다.");
      return;
    } else {
      surveySetModalOpen(true);
    }
  };
  const currentPosts = (tmp) => {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast); // 0 ~ 10 |  10 ~ 20
    return currentPosts;
  };

  const surveySerachFnc = () => {
    let tmpItems = [...AllDataPosts];
    const val = surveyInputRef.current.value;
    tmpItems = tmpItems.filter((item) => {
      if (item.surveyName.indexOf(val) !== -1) {
        return item;
      }
    });
    setSearchedSurveys(tmpItems);
    setCurrentPage(1);
  };

  const surveyInputEnter = (e) => {
    if (e.key === "Enter") {
      surveySerachFnc();
    }
  };

  const surveyInputClick = () => {
    surveySerachFnc();
  };
  return (
    <div className="survey-box">
      <Gnb user={user} />
      <div className="inner-800">
        {surveyModalOpen && (
          <Modal
            modalClose={modalClose}
            post={totalIndexPosts[totalIndexPosts.length - index]}
            setPosts={setPosts}
            posts={totalIndexPosts}
            point={point}
            setPoint={setPoint}
            component="SurveySendModal"
          />
        )}
        {surveyRegistModal && (
          <Modal
            modalClose={surveyRegistModalClose}
            posts={totalIndexPosts}
            setPosts={setPosts}
            component="SurveyRegist"
          />
        )}
        <div className="survey-top-box">
          <div className="survey-top-box-btnbox">
            <button
              className="survey-registration-btn  btn-o btn-r"
              onClick={surveyRegistModalClose}
            >
              신규등록
            </button>
            <button
              className="survey-send-btn  btn-o btn-r"
              onClick={(e) => {
                if (checkIndexFnc(index)) {
                  checkSendStatusFnc();
                }
              }}
            >
              발송
            </button>
          </div>
          <div className="survey-input-box">
            <input
              type="text"
              className="survey-input"
              onKeyPress={surveyInputEnter}
              ref={surveyInputRef}
            />
            <button className="survey-input-btn">
              <img
                src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img/mdi-magnify.png"
                alt="검색버튼"
                onClick={surveyInputClick}
              />
            </button>
          </div>
        </div>
        <table className="survey-table">
          <thead className="survey-table-thead">
            <tr>
              <th id="surveyChoice">선택</th>
              <th id="surveyNum">번호</th>
              <th id="surveyName">조사명</th>
              <th id="surveyRequestDate">요청기간</th>
              <th id="surveyNeedSample">필요샘플 수</th>
              <th id="surveyCompleteSample">완료샘플 수</th>
              <th id="surveyStatus">상태</th>
              <th id="surveyRegister">등록자</th>
              <th id="surveyClass">소속</th>
            </tr>
          </thead>
          <tbody className="survey-table-tbody">
            {currentPosts(searchedSurveys).map((data) => {
              return (
                <SurveyRow
                  setPosts={setPosts}
                  key={data.num}
                  num={data.num}
                  surveyName={
                    data.surveyName.length < 15
                      ? data.surveyName
                      : data.surveyName.substring(0, 15) + "..."
                  }
                  date={data.date}
                  needSample={data.needSample}
                  completeSample={data.completeSample}
                  state={data.state}
                  registrant={data.registrant}
                  affiliation={data.affiliation}
                  activation={data.activation}
                  setIndex={setIndex}
                  link={data.link}
                  profile1={data.profile1}
                  profile2={data.profile2}
                  profile3={data.profile3}
                  pointPerPerson={data.pointPerPerson}
                  currentPage={currentPage}
                  record={data.record}
                  modifiedBy={data.modifiedBy}
                  modifiedDate={data.modifiedDate}
                  sendStatus={data.sendStatus}
                  reasons={data.reasons}
                />
              );
            })}
          </tbody>
        </table>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={searchedSurveys.length}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Survey;
