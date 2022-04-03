import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Gnb from "../../common/Gnb";
import Pagination from "../../common/Pagination";
import "./MainQA.css";
import { useHistory } from "react-router-dom";
import { userDataStore } from "../../Root";

function MainQA({ location, tableInfo, user }) {
  const tableInputRef = useRef(0);
  const { state } = useContext(userDataStore);
  const history = useHistory();
  const [searchedTables, setSearchedTables] = useState(tableInfo);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [isUserChecked, setIsUserChecked] = useState(false);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  useEffect(() => {
    if (location.state === undefined) {
      setCurrentPage(1);
    } else {
      setCurrentPage(location.state.currentPage);
      history.replace();
    }

    if (state.authority === "1" || state.authority === "0") {
      setIsUserChecked(true);
    } else {
      setIsUserChecked(false);
    }
  }, []);

  const currentPosts = (tmp) => {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };
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
          {currentPosts(searchedTables).map(function (item, index) {
            return (
              <tr key={index}>
                <td>{item.num}</td>
                <td>
                  {isUserChecked || item.id === state.id ? (
                    <Link
                      to={{
                        pathname: `/mainqa/detailqa/${item.num}`,
                        state: {
                          num: item.num,
                          title: item.title,
                          date: item.date,
                          user: item.user,
                          content: item.content,
                          currentPage: currentPage,
                        },
                      }}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </td>
                <td>{item.date}</td>
                <td>{item.user} </td>
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
