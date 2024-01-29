import Nav from "../shared/Nav";
import Footer from "../shared/Footer";

const NotFoundPage = () => (
  <div>
    <Nav/>
    <main className="mdc-top-app-bar--fixed-adjust">
      <div className="container">
        <div className="content-container">
          <h1 className='mdc-typography--headline4'>404 - Page Not Found</h1>
        </div>
      </div>
    </main>
    <Footer/>
  </div>
)
export default NotFoundPage
