import {Fragment, useEffect} from 'react';
import "material-components-web/dist/material-components-web.min.css";
import './styles/App.css';
import {Route, Routes} from "react-router-dom";
import DashboardPage from "./components/pages/DashboardPage";
import PoolPage from "./components/pages/PoolPage";
import PollCreationPage from "./components/pages/PollCreationPage";
import LeaderboardPage from "./components/pages/LeaderboardPage";
import {handleInitialData} from "./actions/shared";
import {connect} from "react-redux";
import LogInPage from "./components/pages/LogInPage";
import Progressbar from "./components/shared/Progressbar";

const App = ({dispatch, ready, authedUser}) => {
  useEffect(() => {
    handleInitialData()(dispatch);
  }, [dispatch]);
  if (!ready) return (<Progressbar/>);
  return (<div className="app">
    <Fragment>
      <Progressbar/>
      {!authedUser && (<LogInPage/>)}
      {authedUser && (<Routes>
        <Route exact path="/" element={<DashboardPage/>}/>
        <Route exact path="/add" element={<PollCreationPage/>}/>
        <Route path="/questions/:question_id" element={<PoolPage/>}/>
        <Route exact path="/leaderboard" element={<LeaderboardPage/>}/>
      </Routes>)}
    </Fragment>
  </div>);
};

const mapStateToProps = ({users, questions, authedUser}) => ({
  ready: Object.keys(users).length > 0 && Object.keys(questions).length > 0,
  authedUser,
});

export default connect(mapStateToProps)(App);
