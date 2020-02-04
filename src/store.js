import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";

import appReducer from "./reducer";

// export default createStore(combineReducers({ reducer }));

export default createStore(
	combineReducers({ appReducer }),
	{},
	applyMiddleware(logger)
);
