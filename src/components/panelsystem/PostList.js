import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PostList.css";
import Gnb from "../common/Gnb";
import Pagination from "../common/Pagination";
import { useHistory } from "react-router-dom";

const PostList = ({ posts, user, location }) => {
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (location.state === undefined) {
      setCurrentPage(1);
    } else {
      setCurrentPage(location.state.currentPage);
      history.replace();
    }
  }, []);

  //현재 페이지 위치

  const [postCopy, setPostCopy] = useState(posts);

  const searchPanel1 = useRef();

  const searchBtn = () => {
    const searchBtn1 = searchPanel1.current.value;
    let searchPanel = [...posts];
    searchPanel = searchPanel.filter((value) => {
      console.log(value);
      if (
        value.name.indexOf(searchBtn1) !== -1 ||
        value.number.indexOf(searchBtn1) !== -1 ||
        value.state.indexOf(searchBtn1) !== -1 ||
        value.statemanager.indexOf(searchBtn1) !== -1 ||
        value.email.indexOf(searchBtn1) !== -1 ||
        value.phone.indexOf(searchBtn1) !== -1
      ) {
        return value;
      }
    });
    setPostCopy(searchPanel);
    setCurrentPage(1);
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      searchBtn();
    }
  };

  const postsPerPage = 10; //한 페이지에 글 갯수

  const indexOfLast = currentPage * postsPerPage; // 페이지를 글 갯수만큼 곱해서 보여준게 마지막 페이지넘버
  const indexOfFirst = indexOfLast - postsPerPage; // 마지막페이지 넘버 - 한 페이지의 글 갯수 = 첫번째 페이지 넘버

  function currentPosts(posts) {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }
  //1부터 10까지의 페이지 포스트?

  return (
    <div className="inner">
      <Gnb user={user} />
      <div className="pannelsystem-content">
        <div className="pannelsystem-form">
          <div className="pannelsystem-input-box">
            <input
              ref={searchPanel1}
              onKeyPress={onKey}
              type="text"
              id="pannelsystem-input"
            />
            <button
              type="button"
              className="pannelsystem-input-btn"
              onClick={searchBtn}
            >
              <img
                src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img/mdi-magnify.png"
                alt="검색버튼"
              />
            </button>
          </div>
        </div>
      </div>
      <table className="pannelsystem-table">
        <thead className="pannelsystem-thead">
          <tr>
            <th>번호</th>
            <th>업체명</th>
            <th>연락처</th>
            <th>이메일</th>
            <th>신청일</th>
            <th>상태변경일</th>
            <th>상태</th>
            <th>상태변경자</th>
          </tr>
        </thead>
        {currentPosts(postCopy).map((item) => {
          return (
            <tbody className="pannelsystem-tbody" key={item.number}>
              <tr>
                <td>{item.number}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/panel/view/${item.number}`,
                      state: {
                        currentPage: currentPage,
                      },
                    }}
                  >
                    {item.name}
                  </Link>
                </td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.date}</td>
                <td>{item.statedate}</td>
                <td>{item.state}</td>
                <td>{item.statemanager}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={postCopy.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default PostList;
