import React, { useContext, useEffect, useRef, useState } from "react";
import "./PublishQA.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { userDataStore } from "../../Root";

function PublishQA({ tableInfo, setTableInfo }) {
  const [publishTitle, setPublishTitle] = useState("");
  const [publishText, setPublishText] = useState("");
  const publishTitleInput = useRef();
  const publishTextInput = useRef();
  const history = useHistory();
  const created_date = new Date();
  const { state } = useContext(userDataStore);

  const publishInfo = () => {
    if (publishTitle.length < 1) {
      alert("제목을 입력해주세요.");
      publishTitleInput.current.focus();
      return;
    } else {
      const newPublishTitle = [...tableInfo];
      newPublishTitle.unshift({
        id: state.id,
        num: tableInfo.length + 1,
        title: publishTitleInput.current.value,
        date: created_date.toLocaleDateString().slice(0, -1),
        user: state.username,
        content: publishTextInput.current.value,
      });
      setTableInfo(newPublishTitle);
      alert("질문이 등록되었습니다.");
      history.push("/mainqa");
    }
  };
  return (
    <div className="publish-qa">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          publishInfo();
        }}
      >
        <h1 className="qa-head1">Q&amp;A등록</h1>
        <h2 className="qa-head2">
          설문 관련하여 궁금하신 점을 아래에 작성해주시면
          <br />
          최대한 빠른 시간 내 답변을 등록하겠습니다.
        </h2>
        <div className="publishInput">
          <div>제목</div>
          <input
            className="publishInput-name"
            onChange={(e) => {
              setPublishTitle(e.target.value);
            }}
            ref={publishTitleInput}
            value={publishTitle}
            required
          ></input>
          <div>신청/문의내용</div>
          <input
            className="publishInput-text"
            onChange={(e) => {
              setPublishText(e.target.value);
            }}
            ref={publishTextInput}
            required
          ></input>
        </div>
        <div className="publishbtn">
          <button className="publishbtn-publish" type="submit">
            등록
          </button>
          <Link to="/mainqa">
            <button className="publishbtn-cancel">취소</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
export default PublishQA;
