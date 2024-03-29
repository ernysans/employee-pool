import {connect} from "react-redux";
import {useEffect} from "react";
import * as linearProgress from "@material/linear-progress/dist/mdc.linearProgress.min";

const Progressbar = ({loading}) => {
  useEffect(() => {
    if (!loading) return;
    const element = document.querySelector('.mdc-linear-progress');
    const progressBar = new linearProgress.MDCLinearProgress(element);
    progressBar.open();
  }, [loading]);
  if (!loading) return (<div></div>);
  return (
    <div role="progressbar" className="mdc-linear-progress mdc-linear-progress--indeterminate"
         aria-label="Example Progress Bar" aria-valuemin="0"
         aria-valuemax="1" aria-valuenow="0">
      <div className="mdc-linear-progress__buffer">
        <div className="mdc-linear-progress__buffer-bar"></div>
        <div className="mdc-linear-progress__buffer-dots"></div>
      </div>
      <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
        <span className="mdc-linear-progress__bar-inner"></span>
      </div>
      <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
        <span className="mdc-linear-progress__bar-inner"></span>
      </div>
    </div>
  );
};
const mapStateToProps = ({loading}) => ({
  loading,
});
export default connect(mapStateToProps)(Progressbar);
