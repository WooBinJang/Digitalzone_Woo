import { React, useState, useEffect } from "react";
import "./ApproveBoard.css";
import ApproveList from "./ApproveList";
import Gnb from "../../common/Gnb";
import Pagination from "../../common/Pagination";
import { useLocation, useHistory } from "react-router-dom";
const ApproveBoard = ({ surveyApproveItems, user }) => {
  const [searchedItems, setSearchedItems] = useState(surveyApproveItems);
  const [currentPage, setCurrentPage] = useState(); //현재 페이지
  const [searchText, setSearchText] = useState();
  const postsPerPage = 10; //한 페이지에 글 갯수

  const indexOfLast = currentPage * postsPerPage; // 페이지를 글 갯수만큼 곱해서 보여준게 마지막 페이지넘버
  const indexOfFirst = indexOfLast - postsPerPage; // 마지막페이지 넘버 - 한 페이지의 글 갯수 = 첫번째 페이지 넘버
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.state === undefined) {
      setSearchedItems(surveyApproveItems);
      setCurrentPage(1);
    } else {
      setCurrentPage(location.state.currentPage);
      // setSearchedItems(location.state.searchedItems);
      history.replace();
    }
  }, []);

  const onSearchTextHandler = (e) => {
    setSearchText(e.target.value);
  };

  const onSearchHandler = (e) => {
    let tmpItems = [...surveyApproveItems];

    if (!isEmpty(searchText)) {
      tmpItems = tmpItems.filter((item) => {
        if (item.surveyName.indexOf(searchText) !== -1) {
          return item;
        }
      });
    }
    setSearchedItems(tmpItems);
    setCurrentPage(1);
  };
  const isEmpty = function (value) {
    if (
      value == "" ||
      value == null ||
      value == undefined ||
      (value != null && typeof value == "object" && !Object.keys(value).length)
    ) {
      return true;
    } else {
      return false;
    }
  };
  function currentPosts(posts) {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  const onSearchEnter = (e) => {
    if (e.key === "Enter") {
      onSearchHandler();
    }
  };

  return (
    <div className="inner">
      <Gnb user={user} />
      <div className="approve-board-box">
        <div className="approve-board-select-box">
          <span className="approve-board-search-box">
            <input
              type="text"
              id="search-box"
              onChange={onSearchTextHandler}
              onKeyPress={onSearchEnter}
            />
            <label htmlFor="search-box" onClick={onSearchHandler}>
              검색
            </label>
          </span>
        </div>
        <ApproveList
          surveyApproveItems={currentPosts(searchedItems)}
          currentPage={currentPage}
          searchedItems={searchedItems}
        />

        {!searchedItems.length ? (
          <div className="no-result">게시물이 없습니다.</div>
        ) : null}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={searchedItems.length > 0 ? searchedItems.length : 1}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ApproveBoard;
