import React from "react";
import "./Pagination.css";
const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  /*  setIndex, */

  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  function minusCurrenntIndex(currentPage) {
    return new Promise(function (resolve, reject) {
      if (currentPage > 1) {
        const idx = currentPage - 1;
        paginate(idx);
      }
    });
  }

  function plusCurrenntIndex(currentPage) {
    return new Promise(function (resolve, reject) {
      if (currentPage < pageNumbers.length) {
        const idx = currentPage + 1;
        paginate(idx);
      }
    });
  }

  return (
    <div>
      <nav>
        <ul className="pagination-ul">
          <img
            className="pagination-list-previous"
            src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img/eva-arrow-ios-back-outline.png"
            alt="이전 목록 보기"
            onClick={() => {
              minusCurrenntIndex(currentPage);
            }}
          />
          {pageNumbers.map((number) => (
            <li key={number} className="pagination-item">
              <span
                className={currentPage === number ? "pagination-color" : ""}
                onClick={() => {
                  paginate(number);
                }}
              >
                {number}
              </span>
            </li>
          ))}
          <img
            className="pagination-list-next"
            src="https://raw.githubusercontent.com/Digitalzone-FrontEnd/Digitalzone/main/public/img/eva-arrow-ios-back-outline.png"
            alt="다음 목록 보기"
            onClick={() => {
              plusCurrenntIndex(currentPage);
              // setIndex(null);
            }}
          />
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;

/* 
페이징 
   root에서 내려줘야할 props 
    - posts={currentPosts(posts)}  10개씩 자른 데이터 
    - postsPerPage={postsPerPage}  한 화면에 볼 수 있는 설문 개수
    - totalPosts={posts.length} 데이터 수 
    - paginate={setCurrentPage} 현재 페이지 위치  
*/
