import Nav from "../shared/Nav";
import {connect} from "react-redux";
import "../../styles/LeaderboardPage.css";
import Avatar from "../shared/Avatar";

const LeaderboardPage = ({users, authedUser}) => {
  const sortedUsers = Object.entries(users)
    .map(([userId, user]) => {
      return {
        ...user,
        score: Object.keys(user.answers ?? {}).length + (user.questions ?? []).length,
      };
    })
    .sort((a, b) => b.score - a.score);
  return (
    <div>
      <Nav/>
      <main className="mdc-top-app-bar--fixed-adjust">
        <div className="container">
          <div className="content-container">
            <div className="mdc-data-table container">
              <div className="mdc-data-table__table-container">
                <table className="mdc-data-table__table" aria-label="User Leaderboard">
                  <thead>
                  <tr className="mdc-data-table__header-row">
                    <th className="mdc-data-table__header-cell" role="columnheader" scope="col">Users</th>
                    <th className="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader"
                        scope="col">Answered
                    </th>
                    <th className="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader"
                        scope="col">Created
                    </th>
                  </tr>
                  </thead>
                  <tbody className="mdc-data-table__content">
                  {sortedUsers.map((user) => {
                    return (
                      <tr className={
                        user.id === authedUser
                          ? "mdc-data-table__row mdc-data-table__row--selected"
                          : "mdc-data-table__row"
                      } key={user.name}>
                        <th className="mdc-data-table__cell" scope="row">
                          <div className="leaderboard-user-item">
                            <Avatar url={user.avatarURL} alt={user.name}/>
                            <div className="leaderboard-user-item__content">
                              <span className="mdc-typography--subtitle1">{user.name}</span>
                              <span className="mdc-typography--caption">{user.id}</span>
                            </div>
                          </div>
                        </th>
                        <td
                          className="mdc-data-table__cell mdc-data-table__cell--numeric">{Object.keys(user.answers ?? {}).length}</td>
                        <td
                          className="mdc-data-table__cell mdc-data-table__cell--numeric">{(user.questions ?? []).length}</td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = ({users, authedUser}) => ({
  users,
  authedUser,
});
export default connect(mapStateToProps)(LeaderboardPage);
