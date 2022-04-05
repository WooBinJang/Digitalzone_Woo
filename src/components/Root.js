import React, { createContext, useEffect, useState } from "react";
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
import pointData from "../data/pointData";
import panelData from "../data/panelData";
import qaData from "../data/qaData";
import Home from "./home/Home.js";
import MainQA from "./q&a/mainq&a/MainQA";
import PublishQA from "./q&a/publishq&a/PublishQA";
import DetailQA1 from "./q&a/detailq&a/DetailQA1";

export const accessTokenStore = createContext({
  token: {},
  action: {
    setToken: () => {},
  },
});
export const userDataStore = createContext({
  state: {},
  action: {
    setUserData: () => {},
  },
});

const Root = () => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectPointItem, setSelectPointItem] = useState({});
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [pointItems, setPointItems] = useState(pointData);
  const [panelPosts, setPanelPosts] = useState(panelData);
  const [point, setPoint] = useState(0); //아직 초기 데이터 값을 모르기 때문에 0으로 처리했다.
  const [list, setList] = useState([]);
  let [tableInfo, setTableInfo] = useState(qaData);
  const [posts, setPosts] = useState(surveyData);
  const [user, setUser] = useState({
    id: "",
    login: false,
    grade: 0,
  });

  const userDatavalue = {
    state: JSON.parse(sessionStorage.getItem("userData")),
    action: { setUserData },
  };

  const tokenDatavalue = {
    token: JSON.parse(sessionStorage.getItem("accessToken")),
    action: { setToken },
  };

  useEffect(() => {
    setUserData(JSON.parse(sessionStorage.getItem("userData")));
    let accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || null;
    if (accessToken) {
      setIsUserLogin(true);
    } else {
      setIsUserLogin(false);
    }
  }, []);

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

  return (
    <div>
      <userDataStore.Provider value={userDatavalue}>
        <accessTokenStore.Provider value={tokenDatavalue}>
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
                totalIndexPosts={posts}
                setPosts={setPosts}
                totalPosts={posts.length}
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
          <Route
            path="/home"
            render={() => <Home user={user} posts={posts} />}
          />
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
            render={() => (
              <AccountChange user={user} setUserData={setUserData} />
            )}
          />
          <Route
            path="/accountsetup"
            render={() => <AccountSetup user={user} />}
          />
          <Route
            path="/accountmanage"
            render={(props) => <AccountManage user={user} />}
          />
          <Route path="/mypage" render={(props) => <MyPage user={user} />} />
          <Footer isUserLogin={isUserLogin} />
        </accessTokenStore.Provider>
      </userDataStore.Provider>
    </div>
  );
};

export default Root;
