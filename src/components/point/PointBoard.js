import React, { useState, useEffect } from "react";
import "./PointBoard.css";
import Gnb from "./../common/Gnb";
import PointList from "./PointList";
import Pagination from "./../common/Pagination";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

const PointBoard = ({ pointItems, setSelectPointItem, user }) => {
  const onPointClick = (item) => {
    setSelectPointItem(item);
  };

  const [searchedItems, setSearchedItems] = useState([]);
  const [selectState, setSelectState] = useState();
  const [selectStartDate, setSelectStartDate] = useState();
  const [selectEndDate, setSelectEndDate] = useState();
  const [searchText, setSearchText] = useState();
  const [currentPage, setCurrentPage] = useState(); //현재 페이지
  const postsPerPage = 10; //한 페이지에 글 갯수
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.state === undefined) {
      setSearchedItems(pointItems);
      setCurrentPage(1);
    } else {
      setCurrentPage(location.state.currentPage);
      // setSearchedItems(location.state.searchedItems);
      setSearchedItems(pointItems);
      history.replace();
    }
  }, []);
  const indexOfLast = currentPage * postsPerPage; // 페이지를 글 갯수만큼 곱해서 보여준게 마지막 페이지넘버
  const indexOfFirst = indexOfLast - postsPerPage; // 마지막페이지 넘버 - 한 페이지의 글 갯수 = 첫번째 페이지 넘버

  function currentPosts(posts) {
    let currentPosts = 0;

    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
    // 주석
  }

  const onChangeHandler = (e) => {
    setSelectState(e.target.value);
    if (e.target.value === "선택") return;
    else {
      setSelectState(e.target.value);
    }
  };

  const onSearchHandler = (e) => {
    let tmpItems = [...pointItems];
    if (!isEmpty(selectStartDate)) {
      tmpItems = tmpItems.filter((item) => {
        if (new Date(item.applyDate) >= new Date(selectStartDate)) {
          return item;
        }
      });
    }
    if (!isEmpty(selectEndDate)) {
      tmpItems = tmpItems.filter((item) => {
        if (new Date(item.applyDate) <= new Date(selectEndDate)) {
          return item;
        }
      });
    }

    if (!isEmpty(selectState)) {
      tmpItems = tmpItems.filter((item) => {
        if (item.division === selectState) {
          return item;
        }
      });
    }
    if (!isEmpty(searchText)) {
      tmpItems = tmpItems.filter((item) => {
        if (item.companyName.indexOf(searchText) !== -1) {
          return item;
        }
      });
    }
    setSearchedItems(tmpItems);
    setCurrentPage(1);
  };
  const onStartDateHandler = (e) => {
    setSelectStartDate(e.target.value);
  };
  const onEndDateHandler = (e) => {
    setSelectEndDate(e.target.value);
  };

  const onSearchTextHandler = (e) => {
    setSearchText(e.target.value);
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

  const onSearchEnter = (e) => {
    if (e.key === "Enter") {
      onSearchHandler();
    }
  };

  return (
    <div className="inner">
      <Gnb user={user} />

      <div className="point-board-box">
        <span className="point-board-select-box">
          <span className="input_date_box">
            <span className="input_date_title">일시</span>
            <input
              className="start-date"
              type="date"
              onChange={onStartDateHandler}
            />
            <span className="between-char">~</span>
            <input
              className="end-date"
              type="date"
              onChange={onEndDateHandler}
            />
            <span className="point-refund-select-box">구분</span>
          </span>
          <span className="select-wrap">
            <select
              name="division"
              onChange={onChangeHandler}
              value={selectState}
            >
              <option value=""> 선택 </option>
              <option value="환불">환불</option>
              <option value="환불신청">환불신청</option>
              <option value="충전">충전</option>
              <option value="환불완료">환불완료</option>
            </select>
          </span>
          <span className="point-board-search-box">
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
          {/* <button id="search-btn" onClick={onSearchHandler} className="btn-o">
            검색
          </button> */}
        </span>
        <PointList
          pointItems={currentPosts(searchedItems)}
          onPointClick={onPointClick}
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

export default PointBoard;
