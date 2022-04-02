import React, { useEffect, useRef, useState } from "react";
import Footer from "./common/Footer";
import { Route } from "react-router-dom";
import Faq from "./faq/Faq";
import Guide from "./guide/Guide";
import Login from "./login/Login";
import Panel from "./login/panel/Panel";
import FindId from "./login/find/FindId";
import FindPw from "./login/find/FindPw";
import Terms from "./login/signup/Terms";
import Complete from "./login/signup/Complete";
import InfoInput from "./login/signup/InfoInput";
import PointView from "./point/PointView";
import PointBoard from "./point/PointBoard";
import ApproveBoard from "./survey/approve/ApproveBoard";
import ApproveView from "./survey/approve/ApproveView";
import AccountChange from "./account/AccountChange";
import AccountSetup from "./account/AccountSetup";
import AccountManage from "./account/AccountManage";
import MyPage from "./account/MyPage";
import ManagePoint from "./managepoint/ManagePoint";
import PostView from "./panelsystem/PostView";
import PostList from "./panelsystem/PostList";
import Survey from "./survey/Survey";
import SurveyDetail from "./survey/SurveyDetail";
import SurveyRegist from "./survey/SurveyRegist";
import SurveyModify from "./survey/SurveyModify";
import Header from "./common/Header";
import Main from "./main/Main";
import surveyData from "../data/SurveyData";
import surveyApproveData from "../data/SurveyApproveData";
import pointData from "../data/pointData";
import panelData from "../data/panelData";
import userData from "../data/userData";
import qaData from "../data/qaData";
import Home from "./home/Home.js";
import MainQA from "./q&a/mainq&a/MainQA";
import PublishQA from "./q&a/publishq&a/PublishQA";
import DetailQA1 from "./q&a/detailq&a/DetailQA1";

const Root = () => {
  const [selectPointItem, setSelectPointItem] = useState({});
  const [isUserLogin, setIsUserLogin] = useState(false);
  useEffect(() => {
    let accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || null;
    if (accessToken) {
      setIsUserLogin(true);
    } else {
      setIsUserLogin(false);
    }
  }, [isUserLogin]);
  const [userList, setUserList] = useState([
    {
      id: 0,
      userco: "(주) A",
      accountid: "juri42",
      accountpw: 123456789,
      mail: "juri42@gmail.com",
      username: "김주리",
      usercall1: "010",
      usercall2: "1234",
      usercall3: "5678",
    },
    {
      id: 1,
      userco: "(주) B",
      accountid: "perfume22",
      accountpw: 987654321,
      mail: "perfume22@naver.com",
      username: "전선향",
      usercall1: "010",
      usercall2: "9876",
      usercall3: "5432",
    },
    {
      id: 2,
      userco: "(주) C",
      accountid: "asd2",
      accountpw: 246246446,
      mail: "egseg5@naver.com",
      username: "정규대",
      usercall1: "010",
      usercall2: "3958",
      usercall3: "3643",
    },
    {
      id: 3,
      userco: "(주) D",
      accountid: "sav",
      accountpw: 34646477,
      mail: "eljif074@naver.com",
      username: "김지영",
      usercall1: "010",
      usercall2: "4446",
      usercall3: "2978",
    },
    {
      id: 4,
      userco: "(주) E",
      accountid: "z412",
      accountpw: 6768971,
      mail: "alie97@naver.com",
      username: "배예린",
      usercall1: "010",
      usercall2: "1037",
      usercall3: "3094",
    },
    {
      id: 5,
      userco: "(주) F",
      accountid: "dfh5",
      accountpw: 79634634,
      mail: "wjgid7444@naver.com",
      username: "양준혁",
      usercall1: "010",
      usercall2: "4686",
      usercall3: "2677",
    },
  ]);
  // userList
  const [pointItems, setPointItems] = useState(pointData);
  const [surveyApproveItems, setSurveyApproveItems] =
    useState(surveyApproveData);

  const handleCreate = (
    accountid,
    accountpw,
    mail,
    username,
    usercall1,
    usercall2,
    usercall3
  ) => {
    const userArray = [...userList];
    userArray.push({
      id: userList[userList.length - 1].id + 1,
      userco: "(주) o",
      accountid: `${accountid}`,
      accountpw: `${accountpw}`,
      mail: `${mail}`,
      username: `${username}`,
      usercall1: `${usercall1}`,
      usercall2: `${usercall2}`,
      usercall3: `${usercall3}`,
      userinfo: `(주) o ${username}`,
    });
    setUserList(userArray);
  };
  // userList에 push 해주는 함수

  const [panelPosts, setPanelPosts] = useState([
    {
      number: "16",
      name: "(주)디지털존",
      phone: "010-9983-3321",
      email: "asd@qwe.com",
      date: "2022-02-04",
      statedate: "2022-02-04",
      state: "접수",
      statemanager: "홍길동",
      record: [],
      panelContent: "패널신청 합니다.",
    },
    {
      number: "15",
      name: "(주)디지털존",

      phone: "010-2232-4544",
      email: "yog@gmail.com",
      date: "2022-02-04",
      statedate: "2022-02-04",
      state: "접수",
      statemanager: "홍길동",
      record: [],
      panelContent: "신청합니다 ~ :)",
    },
    {
      number: "14",
      name: "(주)아이아라",
      phone: "010-2232-4544",
      email: "oeoe@gmail.com",
      date: "2022-01-22",
      statedate: "2022-01-22",
      state: "접수",
      statemanager: "김병철",
      record: [],
      panelContent: "Sincheong hapnida",
    },
    {
      number: "13",
      name: "(주)아이아라",
      phone: "010-9930-2993",
      email: "wooBin21@gmail.com",
      date: "2022-01-15",
      statedate: "2022-01-15",
      state: "접수",
      statemanager: "홍길동",
      record: [],
      panelContent: "신청13",
    },
    {
      number: "12",
      name: "(주)엑스퍼트",
      phone: "010-9930-2993",
      email: "wooBin21@gmail.com",
      date: "2021-12-28",
      statedate: "2021-12-28",
      state: "접수",
      statemanager: "홍길동",
      record: [],
      panelContent: "신청12",
    },
    {
      number: "11",
      name: "(주)엑스퍼트",
      phone: "010-2993-2883",
      email: "asda@sadas.com",
      date: "2021-11-28",
      statedate: "2021-11-28",
      state: "접수",
      statemanager: "홍길동",
      record: [],
      panelContent: "신청신청해요",
    },
    {
      number: "10",
      name: "(주)파이퀀트",
      phone: "010-2993-2883",
      email: "asda@sadas.com",
      date: "2021-10-28",
      statedate: "2021-10-28",
      state: "접수",
      statemanager: "홍길동",
      record: [],
      panelContent: "신청! ",
    },
    {
      number: "9",
      name: "(주)파이퀀트",
      phone: "010-3884-9920",
      email: "141241@nslekf.com",
      date: "2021-09-04",
      statedate: "2021-09-05",
      state: "접수",
      statemanager: "해당없음",
      record: [],
      panelContent: "패널신청합니다",
    },
    {
      number: "8",
      name: "(주)대흥정보",
      phone: "010-9803-0408",
      email: "silstar48@ddd.dd",
      date: "2021-08-04",
      statedate: "2021-08-05",
      state: "접수",
      statemanager: "홍길동",
      record: [],
      panelContent: "패널신청이요",
    },
    {
      number: "7",
      name: "(주)대흥정보",
      phone: "010-9803-0408",
      email: "silstar48@ddd.dd",
      date: "2021-07-10",
      statedate: "2021-07-11",
      state: "접수",
      statemanager: "홍길동",
      record: [],
      panelContent: "신청",
    },
    {
      number: "6",
      name: "(주)디지털존",
      phone: "010-2212-3432",
      email: "mjh9461@hanmail.com",
      date: "2021-07-04",
      statedate: "2021-07-05",
      state: "접수",
      statemanager: "해당없음",
      record: [],
      panelContent: "패널 신청",
    },
    {
      number: "5",
      name: "(주)디지털존",
      phone: "010-2212-3432",
      email: "mjh9461@hanmail.com",
      date: "2021-06-04",
      statedate: "2021-06-05",
      state: "접수",
      statemanager: "홍길동",
      record: [],
      panelContent: "패널5",
    },
    {
      number: "4",
      name: "(주)트레이드월드",
      phone: "010-6958-0493",
      email: "JC01@daum.net",
      date: "2021-05-10",
      statedate: "2021-05-10",
      state: "접수",
      statemanager: "김주리",
      record: [],
      panelContent: "패널 신청 합니다.",
    },
    {
      number: "3",
      name: "(주)트레이드월드",
      phone: "010-6958-0493",
      email: "JC01@daum.net",
      date: "2021-05-04",
      statedate: "2021-05-05",
      state: "접수",
      statemanager: "김주리",
      record: [],
      panelContent: "패널신청합니다!",
    },
    {
      number: "2",
      name: "한터글로벌",
      phone: "010-6958-0493",
      email: "JC01@daum.net",
      date: "2021-04-05",
      statedate: "2021-04-05",
      state: "접수",
      statemanager: "해당없음",
      record: [],
      panelContent: "패널 신청해요",
    },
    {
      number: "1",
      name: "한터글로벌",
      phone: "010-6958-0493",
      email: "JC01@daum.net",
      date: "2021-03-04",
      statedate: "2021-03-05",
      state: "접수",
      statemanager: "홍길동",
      record: [],
      panelContent: "신청 하겠습니다",
    },
  ]);
  const [point, setPoint] = useState(0); //아직 초기 데이터 값을 모르기 때문에 0으로 처리했다.
  const [list, setList] = useState([]);
  /* 사용내역 로그 */

  const addList = (totalPoint, point) => {
    const pointList = [...list];
    pointList.unshift({
      id: 2,
      title: "포인트변경",
      state: point + "point",
      point: totalPoint,
    });
    setList(pointList);
  };
  /* 사용내역 리스트 추가 함수 */

  /* 패널시스템 현황 데이터 */
  let [tableInfo, setTableInfo] = useState([
    {
      id: 11,
      num: "11",
      title: "Q&A 게시판",
      date: "2021.10.15",
      user: "홍길동",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    },
    {
      id: 10,
      num: "10",
      title: "Q&A 게시판",
      date: "2021.10.10",
      user: "전선향",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    },
    {
      id: 9,
      num: "9",
      title: "Q&A 게시판",
      date: "2021.10.03",
      user: "안소향",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    },
    {
      id: 8,
      num: "8",
      title: "Q&A 게시판",
      date: "2021.09.30",
      user: "전선향",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    },
    {
      id: 7,
      num: "7",
      title: "Q&A 게시판",
      date: "2021.09.28",
      user: "고승원",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.  ",
    },
    {
      id: 6,
      num: "6",
      title: "Q&A 게시판",
      date: "2021.09.17",
      user: "안소향",
      content: "Many desktop publishing packages",
    },
    {
      id: 5,
      num: "5",
      title: "Q&A 게시판",
      date: "2021.09.08",
      user: "황유희",
      content:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it",
    },
    {
      id: 4,
      num: "4",
      title: "Q&A 게시판",
      date: "2021.08.28",
      user: "홍길동",
      content: "Many desktop publishing packages",
    },
    {
      id: 3,
      num: "3",
      title: "Q&A 게시판",
      date: "2021.08.13",
      user: "고승원",
      content: "Many desktop publishing packages",
    },
    {
      id: 2,
      num: "2",
      title: "Q&A 게시판",
      date: "2021.07.28",
      user: "고승원",
      content: "Many desktop publishing packages",
    },
    {
      id: 1,
      num: "1",
      title: "Q&A 게시판",
      date: "2021.07.10",
      user: "황유희",
      content: "Many desktop publishing packages",
    },
  ]);
  /* Q&A 데이터 */

  const [posts, setPosts] = useState(surveyData);
  // 설문 테스트 데이터

  const [currentPage, setCurrentPage] = useState(1);
  //현재 페이지 위치
  const postsPerPage = 10;
  // 한 화면에 볼 수 있는 설문 개수
  const [user, setUser] = useState({
    id: "",
    login: false,
    grade: 0,
  });
  // 로그인 비로그인
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast); // 0 ~ 10 |  10 ~ 20
    return currentPosts;
  }
  /* 현재 포스트 */

  const surveySerachFnc = (ref) => {
    return new Promise(function (resolve, reject) {
      const value = ref.current.value;
      const searchPosts = [...posts];
      const result = searchPosts.filter(
        (post) => post.surveyName.indexOf(value) !== -1
      );
      if (result.length <= 0) {
        alert("입력하신 조사명은 존재 하지 않습니다.");
        return false;
      }
      setPosts(result);
      setCurrentPage(1);
    });
  };
  /* 설문조사 검색 */

  return (
    <div>
      <Header
        user={user}
        point={point}
        setUser={setUser}
        isUserLogin={isUserLogin}
        setIsUserLogin={setIsUserLogin}
      />
      <Route exact path="/" component={Main} />
      <Route
        exact
        path="/mainqa"
        render={(props) => (
          <MainQA
            tableInfo={tableInfo}
            setTableInfo={setTableInfo}
            {...props}
            user={user}
          />
        )}
      />
      <Route path="/faq" render={() => <Faq user={user} />} />
      <Route path="/guide" render={() => <Guide user={user} />} />
      <Route
        path="/login"
        render={() => (
          <Login setUser={setUser} setIsUserLogin={setIsUserLogin} />
        )}
      />
      <Route path="/terms" component={Terms} />
      <Route path="/findId" component={FindId} />
      <Route path="/findPw" component={FindPw} />
      <Route
        exact
        path="/panel"
        render={() => (
          <Panel panelPosts={panelPosts} setPanelPosts={setPanelPosts} />
        )}
      />
      <Route path="/infoinput" component={InfoInput} />
      <Route path="/complete" component={Complete} />
      <Route
        exact
        path="/point/board"
        render={() => (
          <PointBoard
            pointItems={pointItems}
            setSelectPointItem={setSelectPointItem}
            selectPointItem={selectPointItem}
            user={user}
            setPointItems={setPointItems}
          />
        )}
      ></Route>
      <Route
        path="/point/view/:id"
        render={() => (
          <PointView
            pointItems={pointItems}
            setPointItems={setPointItems}
            user={user}
            addList={addList}
            point={point}
            setPoint={setPoint}
          />
        )}
      />
      <Route
        path="/approve/board"
        render={() => (
          <ApproveBoard
            surveyApproveItems={posts}
            setSurveyApproveItems={setPosts}
            user={user}
          />
        )}
      ></Route>
      <Route
        exact
        path="/approve/view/:id"
        render={() => (
          <ApproveView
            surveyApproveItems={posts}
            setPosts={setPosts}
            user={user}
          />
        )}
      ></Route>

      <Route
        exact
        path="/panel/board"
        render={(props) => (
          <PostList
            posts={panelPosts}
            setPosts={setPanelPosts}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            user={user}
            {...props}
          />
        )}
      />
      <Route
        exact
        path="/panel/view/:no"
        render={(props) => (
          <PostView
            posts={panelPosts}
            setPosts={setPanelPosts}
            user={user}
            {...props}
          />
        )}
      />

      <Route
        path="/managepoint"
        render={() => (
          <ManagePoint
            point={point}
            setPoint={setPoint}
            list={list}
            setList={setList}
            user={user}
            pointItems={pointItems}
            setPointItems={setPointItems}
            addList={addList}
          />
        )}
      />
      <Route
        exact={true}
        path="/survey"
        render={(props) => (
          <Survey
            {...props}
            totalIndexPosts={
              posts
            } /* 전체 데이터 (라디오 버튼에서 사용함으로 다른 컴포넌트에서 필요 X) */
            posts={currentPosts(posts)} /* 10개씩 자른 데이터 */
            setPosts={setPosts}
            postsPerPage={postsPerPage} /* 한 화면에 볼 수 있는 설문 개수 */
            totalPosts={posts.length} /* 데이터 수 */
            paginate={setCurrentPage} /* 현재 페이지 위치  */
            surveySerachFnc={surveySerachFnc}
            currentPage={currentPage}
            user={user}
            AllDataPosts={posts}
            point={point}
            setPoint={setPoint}
          />
        )}
      />
      <Route
        path="/survey/surveydetail/:num"
        component={(props) => (
          <SurveyDetail setPosts={setPosts} {...props} user={user} />
        )}
      />
      <Route
        path="/survey/surveymodify"
        component={(props) => (
          <SurveyModify
            posts={posts}
            setPosts={setPosts}
            {...props}
            user={user}
          />
        )}
      />
      <Route path="/surveyregist" component={SurveyRegist} />
      <Route path="/home" render={() => <Home user={user} posts={posts} />} />
      <Route
        path="/mainqa/publish"
        render={(props) => (
          <PublishQA
            tableInfo={tableInfo}
            setTableInfo={setTableInfo}
            {...props}
          />
        )}
      />
      <Route
        path={`/mainqa/detailqa/:num`}
        render={(props) => (
          <DetailQA1
            tableInfo={tableInfo}
            setTableInfo={setTableInfo}
            user={user}
            {...props}
          />
        )}
      />
      <Route
        path="/accountchange"
        render={() => <AccountChange user={user} />}
      />
      <Route
        path="/accountsetup"
        render={() => (
          <AccountSetup
            handleCreate={handleCreate}
            setUserList={setUserList}
            user={user}
          />
        )}
      />
      <Route
        path="/accountmanage"
        render={(props) => (
          <AccountManage
            userList={userList}
            handleCreate={handleCreate}
            setUserList={setUserList}
            user={user}
          />
        )}
      />
      <Route path="/mypage" render={(props) => <MyPage user={user} />} />
      <Footer isUserLogin={isUserLogin} />
    </div>
  );
};

export default Root;
