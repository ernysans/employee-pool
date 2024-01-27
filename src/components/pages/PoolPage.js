import Nav from "../shared/Nav";
import {connect} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

const withRouter = (Component) => {
  return (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{location, navigate, params}}/>;
  };
};

const PoolPage = ({pool}) => {
  if (!pool) return NotFoundPage();
  return (
    <div>
      <Nav/>
      <main className="mdc-top-app-bar--fixed-adjust">
        <div className="container">
          <div className="content-container">
            <div className="mdc-card">
              <h1 className="mdc-typography--headline6">{pool.author.name} asks:</h1>
              <h2 className="mdc-typography--subtitle2">Would you rather</h2>
              <p className="mdc-typography--body2">{pool.optionOne.text}</p>
              <p className="mdc-typography--body2">or</p>
              <p className="mdc-typography--body2">{pool.optionTwo.text}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = ({questions, authedUser}, props) => {
  const {id} = props.router.params;
  const pool = questions && questions[id];

  return {
    pool: pool,
    authedUser
  }
}
export default withRouter(connect(mapStateToProps)(PoolPage));
