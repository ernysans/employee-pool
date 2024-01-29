import Nav from "../shared/Nav";
import {connect} from "react-redux";
import {useState} from "react";
import {handleAddQuestion} from "../../actions/questions";
import {useNavigate} from "react-router-dom";
import Footer from "../shared/Footer";

const PollCreationPage = ({loading, dispatch}) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const handleQuestionOneChange = (e) => {
    e.preventDefault();
    setOptionOne(e.target.value);
  }
  const handleQuestionTwoChange = (e) => {
    e.preventDefault();
    setOptionTwo(e.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (loading) return;
    dispatch(handleAddQuestion({
      optionOneText: optionOne, optionTwoText: optionTwo,
    })).then(() => {
      setOptionOne('');
      setOptionTwo('');
      navigate('/');
    });
  }
  return (
    <div>
      <Nav/>
      <main className="mdc-top-app-bar--fixed-adjust" id="pool-creation-page">
        <div className="container">
          <div className="content-container">
            <h1 className="mdc-typography--headline4">Would You Rather</h1>
            <h3 className="mdc-typography--headline6">Create Your Own Pool</h3>
            <div className="mdc-card">
              <div className="content-container">
                <div className="mdc-card__content">
                  <form onSubmit={handleSubmit}>
                    <h2 className="mdc-typography--subtitle2">Complete the First Options:</h2>
                    <div className="mdc-form-field mdc-text-field mdc-text-field--filled">
                      <input type="text"
                             id="optionOne"
                             className="mdc-text-field__input"
                             value={optionOne}
                             autoComplete="off"
                             onChange={handleQuestionOneChange}/>
                      <div className="mdc-notched-outline">
                        <div className="mdc-notched-outline__leading"></div>
                        <div className="mdc-notched-outline__notch">
                          <label htmlFor="optionOne"
                                 className="mdc-floating-label mdc-floating-label--float-above	mdc-floating-label--required">First
                            Option</label>
                        </div>
                        <div className="mdc-notched-outline__trailing"></div>
                      </div>
                    </div>
                    <h3 className="mdc-typography--subtitle2">Complete the Second Option:</h3>
                    <div className="mdc-form-field mdc-text-field mdc-text-field--filled">
                      <input type="text"
                             id="optionTwo"
                             className="mdc-text-field__input"
                             value={optionTwo}
                             autoComplete="off"
                             onChange={handleQuestionTwoChange}/>
                      <div className="mdc-notched-outline">
                        <div className="mdc-notched-outline__leading"></div>
                        <div className="mdc-notched-outline__notch">
                          <label htmlFor="optionTwo"
                                 className="mdc-floating-label mdc-floating-label--float-above	mdc-floating-label--required">Second
                            Option</label>
                        </div>
                        <div className="mdc-notched-outline__trailing"></div>
                      </div>
                    </div>
                    <button className="mdc-button mdc-button--raised" type="submit"
                            disabled={!(optionOne.length > 0 && optionTwo.length > 0 && !loading)}>
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

const mapStateToProps = ({loading}) => {
  return {
    loading,
  }
}

export default connect(mapStateToProps)(PollCreationPage);
