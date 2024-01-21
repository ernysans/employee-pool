import Nav from "../shared/Nav";

const DashboardPage = () => {
  return (
    <div>
      <Nav/>
      <main className="mdc-top-app-bar--fixed-adjust">
        App content
        <button className="mdc-button mdc-button--icon-leading">
          <span className="mdc-button__ripple"></span>
          <i className="material-icons mdc-button__icon" aria-hidden="true"
          >bookmark</i
          >
          <span className="mdc-button__label">Text Button plus icon</span>
        </button>
      </main>
    </div>
  );
}

export default DashboardPage;
