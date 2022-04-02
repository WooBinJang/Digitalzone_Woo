import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Gnb from "../../common/Gnb";
import Pagination from "../../common/Pagination";
import "./MainQA.css";
import { useHistory } from "react-router-dom";

function MainQA({ location, tableInfo, user }) {
  const [username, setUsername] = useState(null);
  const [userDataId, setUserDataId] = useState(null);

  const history = useHistory();
  useEffect(() => {
    if (location.state === undefined) {
      setCurrentPage(1);
    } else {
      setCurrentPage(location.state.currentPage);
      history.replace();
    }
  }, []);
  const [searchedTables, setSearchedTables] = useState(tableInfo);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [isUserChecked, setIsUserChecked] = useState(false);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast); // 0 ~ 10 |  10 ~ 20
    return currentPosts;
  }
  const tableInputRef = useRef(0);
  const tableserachFnc = () => {
    let tmpItems = [...tableInfo];
    const val = tableInputRef.current.value;
    tmpItems = tmpItems.filter((item) => {
      if (item.user.indexOf(val) !== -1 || item.title.indexOf(val) !== -1) {
        return item;
      }
    });
    setSearchedTables(tmpItems);
    setCurrentPage(1);
  };

  const tableInputEnter = (e) => {
    if (e.key === "Enter") {
      tableserachFnc();
    }
  };
  const tableInputClick = () => {
    tableserachFnc();
  };
  useEffect(() => {
    let userData = JSON.parse(sessionStorage.getItem("userData")) || null;
    if (userData) {
      setUsername(userData.username);
      setUserDataId(userData.id);
    }
    if (userData.authority === "1" || userData.authority === "0") {
      setIsUserChecked(true);
    } else {
      setIsUserChecked(false);
    }
  }, []);
  return (
    <div className="mainqa">
      <Gnb user={user} />
      <div className="btn-head">
        <Link to={{ pathname: "/mainqa/publish" }}>
          <button className="btn-publish">신규등록</button>
        </Link>
        <div className="btn-search">
          <input
            type="text"
            onKeyPress={tableInputEnter}
            ref={tableInputRef}
          ></input>
          <button>
            <img
              src="/img/mdi-magnify.png"
              onClick={tableInputClick}
              alt="magnify"
            />
          </button>
        </div>
      </div>
      <table className="mainqa-table">
        <thead className="table-head">
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>등록일</th>
            <th>등록자</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts(searchedTables).map(function (a, index) {
            return (
              <tr key={index}>
                <td>{a.num}</td>
                <td>
                  {isUserChecked || a.id === userDataId ? (
                    <Link
                      to={{
                        pathname: `/mainqa/detailqa/${a.num}`,
                        state: {
                          num: a.num,
                          title: a.title,
                          date: a.date,
                          user: a.user,
                          content: a.content,
                          currentPage: currentPage,
                        },
                      }}
                    >
                      {a.title}
                    </Link>
                  ) : (
                    a.title
                  )}
                </td>
                <td>{a.date}</td>
                <td>{a.user} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={searchedTables.length > 0 ? searchedTables.length : 1}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}
export default MainQA;
