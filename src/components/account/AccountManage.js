import React, { useCallback, useEffect, useRef, useState } from "react";
import "./AccountManage.css";
import { Link } from "react-router-dom";
import Gnb from "../common/Gnb";

const AccountManage = ({ userList, setUserList, user }) => {
  const [userId, setUserId] = useState("");

  const currentUserId = useRef();
  const currentPw = useRef();
  const currentEmail = useRef();
  const currentUsername = useRef();
  const currentPhone1 = useRef();
  const currentPhone2 = useRef();
  const currentPhone3 = useRef();
  const usercos = useRef();
  // useRef 사용해서 current 잡아주기

  const $ = (selector) => {
    return document.querySelector(selector);
  };
  const lengthcheck = (e) => {
    const value = e.target.value;
    const length = e.target.maxLength;
    if (value.length === length) {
      $(`#accountCallNum${length - 1}`).focus();
    }
  };
  // 핸드폰번호 글자수&자동넘김 함수
  const [userData, setUserData] = useState({
    id: "",
    accountid: "",
    accountpw: "",
    mail: "",
    username: "",
    usercall1: "",
    usercall2: "",
    usercall3: "",
  });
  // 기본 상태=>유저정보 불러오는 상태

  const removeBtn = (e) => {
    e.preventDefault();
    const confirmId = window.confirm(
      `${currentUserId.current.value} 계정을 삭제하시겠습니까?`
    );
    if (!confirmId) return;
    const copyList = [...userList];
    const filterList = copyList.filter((item) => item.id !== userId);
    setUserList(filterList);
    setSearchTerm(filterList);
    currentUserId.current.value = "";
    currentPw.current.value = "";
    currentEmail.current.value = "";
    currentUsername.current.value = "";
    currentPhone1.current.value = "";
    currentPhone2.current.value = "";
    currentPhone3.current.value = "";
  };
  // 삭제버튼 누르면 삭제되고 인풋값 비워지는 함수

  function click(id) {
    return new Promise(function (resolve, reject) {
      setUserId(Number(id));
      for (let x of userLists) {
        if (x.id === Number(id)) {
          currentUserId.current.value = x.accountid;

          currentEmail.current.value = x.mail;
          currentUsername.current.value = x.username;
          const phoneNumberArr = x.phoneNumber.split("-");
          currentPhone1.current.value = phoneNumberArr[0];
          currentPhone2.current.value = phoneNumberArr[1];
          currentPhone3.current.value = phoneNumberArr[2];
          usercos.current.value = x.userco;
        }
      }
    });
  }
  // 좌측 유저리스트의 유저 클릭시 값 물어오는 함수

  const changeBtn = () => {
    const copyList = [...userList];
    copyList.splice(userId, 1, {
      ...userData,
      userco: userList[userId].userco,
      userinfo: userList[userId].userinfo,
    });
    setUserList(copyList);
    alert("계정변경이 완료되었습니다.");
  };
  // 변경사항 저장하는 함수

  const onChange = () => {
    setUserData({
      id: userId,
      accountid: currentUserId.current.value,
      accountpw: currentPw.current.value,
      mail: currentEmail.current.value,
      username: currentUsername.current.value,
      usercall1: currentPhone1.current.value,
      usercall2: currentPhone2.current.value,
      usercall3: currentPhone3.current.value,
    });
  };
  // 인풋 상태값 변화 확인 함수

  const [userLists, setUserLists] = useState([]);

  const [searchTerm, setSearchTerm] = useState(userLists);
  const searchPoint = useRef();
  const searchFnc = () => {
    const userSelect = searchPoint.current.value;
    let userSearch = [...userLists];
    userSearch = userSearch.filter((findUser) => {
      if (
        findUser.accountid.indexOf(userSelect) !== -1 ||
        findUser.mail.indexOf(userSelect) !== -1 ||
        findUser.phoneNumber.indexOf(userSelect) !== -1 ||
        findUser.username.indexOf(userSelect) !== -1
      ) {
        return findUser;
      }
    });
    setSearchTerm(userSearch);
  };
  // search 함수

  const searchKey = (e) => {
    if (e.key === "Enter") {
      searchFnc();
    }
  };
  const [token, setToken] = useState();

  useEffect(() => {
    let accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || null;
    if (accessToken !== null) {
      findUser(accessToken);
      setToken(accessToken);
    }
  }, []);

  useEffect(() => {
    setSearchTerm(userLists);
  }, [userLists]);

  const findUser = useCallback((token) => {
    let url = "https://digitalzone1.herokuapp.com/api/user";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Allow-Control-Access-Origin": "*",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUserLists(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // 검색

  const deleteUser = useCallback((token, userId) => {
    let url = `https://digitalzone1.herokuapp.com/api/user/delete`;
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
        "Allow-Control-Access-Origin": "*",
      },
      body: JSON.stringify({
        id: userId,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setUserLists(res.data.users);
        alert("계정 삭제가 완료되었습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {}, []);
  const updateUser = useCallback((token, userId) => {
    let url = "https://digitalzone1.herokuapp.com/api/user";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Allow-Control-Access-Origin": "*",
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify({
        id: userId,
        accountpw: currentPw.current.value,
        checkpw: currentPw.current.value,
        username: currentUsername.current.value,
        mail: currentEmail.current.value,
        phoneNumber:
          currentPhone1.current.value +
          "-" +
          currentPhone2.current.value +
          "-" +
          currentPhone3.current.value,
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        alert("수정이 완료되었습니다.");
        setUserLists(data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Gnb user={user} />
      <div className="account-wrapper">
        <div className="account-inner">
          <form>
            <div className="account-manage-info">
              <div className="account-step-box">
                <Link to="/accountchange">
                  <p className="account-step">계정변경</p>
                </Link>
                <Link to="/accountsetup">
                  <p className="account-step">계정생성</p>
                </Link>
                <Link to="/accountmanage">
                  <p className="account-step" id="accountStepEnter">
                    계정관리
                  </p>
                </Link>
              </div>
              <div className="manage-box">
                <div className="account-manage-list">
                  <div className="search-box">
                    <input
                      id="searchBox"
                      type="text"
                      ref={searchPoint}
                      onKeyPress={searchKey}
                    ></input>
                    <button id="searchIcon" type="button" onClick={searchFnc}>
                      돋보기
                    </button>
                  </div>
                  <ul className="name-list">
                    {searchTerm.map((findUser) => (
                      <li
                        key={findUser.id}
                        onClick={() => {
                          click(findUser.id);
                        }}
                      >
                        {findUser.userco}&nbsp;{findUser.username}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="account-info-area" id="clickForm">
                  <div>
                    <label id="coLabel">소속</label>
                    <input
                      className=" account-input"
                      ref={usercos}
                      readOnly
                    ></input>
                  </div>
                  <div className="account-id">
                    <label>아이디</label>
                    <input
                      className=" account-input"
                      ref={currentUserId}
                      name="accountid"
                      maxLength="20"
                      onChange={onChange}
                      readOnly
                      //value,defaultValue로 넣어주면 input값 변경되지않음 ref 사용해서 변경
                    ></input>
                  </div>
                  <div className="account-password">
                    <label>비밀번호</label>
                    <input
                      type="text"
                      className=" account-input"
                      ref={currentPw}
                      name="accountpw"
                      maxLength="15"
                    ></input>
                  </div>
                  <div className="account-email">
                    <label>E-Mail</label>
                    <input
                      type="email"
                      className=" account-input"
                      ref={currentEmail}
                      name="mail"
                      onChange={onChange}
                    ></input>
                  </div>
                  <div className="account-username">
                    <label>사용자명</label>
                    <input
                      className=" account-input"
                      ref={currentUsername}
                      name="username"
                      onChange={onChange}
                      maxLength="15"
                    ></input>
                  </div>
                  <div className="account-call">
                    <label>휴대폰 번호</label>
                    <input
                      id="accountCallNum1"
                      type="number"
                      maxLength="3"
                      onKeyUp={lengthcheck}
                      ref={currentPhone1}
                      required
                      className=" account-input"
                      onChange={onChange}
                      name="usercall1"
                    />
                    <input
                      id="accountCallNum2"
                      type="number"
                      maxLength="4"
                      ref={currentPhone2}
                      onKeyUp={lengthcheck}
                      required
                      className=" account-input"
                      onChange={onChange}
                      name="usercall2"
                    />
                    <input
                      id="accountCallNum3"
                      type="number"
                      onChange={onChange}
                      maxLength="4"
                      ref={currentPhone3}
                      className=" account-input"
                      name="usercall3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="account-btn-box">
              <button
                type="button"
                className="account-manage-btn"
                id="accountDelBtn"
                onClick={() => deleteUser(token, userId)}
              >
                삭제
              </button>
              <button
                type="button"
                className="account-manage-btn"
                onClick={(e) => {
                  e.preventDefault();
                  updateUser(token, userId);
                }}
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountManage;
