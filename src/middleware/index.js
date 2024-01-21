import {thunk} from "redux-thunk";
import logger from "./logger";
import {Tuple} from "@reduxjs/toolkit";

// export default applyMiddleware(thunk, logger);
const middleware = () => new Tuple(thunk, logger);
export default middleware;
