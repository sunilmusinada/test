import appReducer from "./../reducers";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
const consoleMessages = store => next => action => {
  let result;

  console.groupCollapsed(
    `dispatching action => ${action.type} and payload ${action.payload}`
  );

  result = next(action);

  let {
    AllAssets,
    SelectedUnit,
    SelectedCluster,
    Tabs,
    errors
  } = store.getState();

  console.log(`

		AllAssets: ${AllAssets.length}
		selected Unit: ${SelectedUnit}
		SelectedCluster: ${SelectedCluster}
		Tabs: ${Tabs}
		errors: ${errors.length}

	`);

  console.groupEnd();

  return result;
};
export default (initialState = {}) => {
  return applyMiddleware(thunk)(createStore)(appReducer, initialState);
};
