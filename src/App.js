import {Fragment, useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import DashboardPage from "./components/pages/DashboardPage";
import PoolPage from "./components/pages/PoolPage";
import PollCreationPage from "./components/pages/PollCreationPage";
import LeaderboardPage from "./components/pages/LeaderboardPage";
import {connect} from "react-redux";
import LogInPage from "./components/pages/LogInPage";
import {handleInitialData} from "./actions/shared";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, [props]);
  if (!props.authedUser) return (<LogInPage/>);
  return (<div className="app">
    <Fragment>
      <Routes>
        <Route exact path="/" element={<DashboardPage/>}/>
        <Route exact path="/new" element={<PollCreationPage/>}/>
        <Route path="/pool/:id" element={<PoolPage/>}/>
        <Route exact path="/leaderboard" element={<LeaderboardPage/>}/>
      </Routes>
    </Fragment>
  </div>);
};

const mapStateToProps = ({authedUser}) => ({
  authedUser,
});

export default connect(mapStateToProps)(App);
