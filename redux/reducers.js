import C from "./../constants";
import { combineReducers } from "redux";
import initialState from "./initialState";
export const SelectedUnit = (state = "", action) => {
  switch (action.type) {
    case C.SET_SELECTED_UNIT:
      return action.payload;
    default:
      return state;
  }
};

export const AllAssets = (state = [], action) => {
  switch (action.type) {
    case C.ALLASSETS:
      return [...action.payload];
    default:
      return state;
  }
};
export const SelectedUnitInModal = (state = "", action) => {
  switch (action.type) {
    case C.SELECTED_UNIT_MODAL:
      return action.payload;
    default:
      return state;
  }
};
export const SelectedCluster = (state = [], action) => {
  return action.type === C.SELECTED_CLUSTER ? action.payload : state;
};
export const SelectedLoops = (state = [], action) => {
  return action.type === C.SET_SELECTED_LOOPS ? action.payload : state;
};
export const Tabs = (state = [], action) => {
  switch (action.type) {
    case C.TABS:
      return [...state, action.payload];

    default:
      return state;
  }
};
export const SelectedTab = (state = "", action) => {
  return action.type === C.SELECTED_TAB ? action.payload : state;
};
export const errors = (state = [], action) => {
  switch (action.type) {
    case C.ADD_ERROR:
      return [...state, action.payload];

    case C.CLEAR_ERROR:
      return state.filter((message, i) => i !== action.payload);

    default:
      return state;
  }
};
export const Loops = (state = [], action) => {
  return action.type === C.FETCH_LOOPS ? action.payload : state;
};
export const HierarchyLoops = (state = [], action) => {
  return action.type === C.SET_HIERARCHY_LOOPS ? action.payload : state;
};
export const SelectedHierarchyLoops = (state = [], action) => {
  return action.type === C.SET_SELECTED_HIERARCHY_LOOPS
    ? action.payload
    : state;
};

export const Clusters = (state = null, action) => {
  return action.type === C.FETCH_CLUSTER ? action.payload : state;
};
export const Cases = (state = [], action) => {
  return action.type === C.FETCH_CASES ? action.payload : state;
};

export const RootCauses = (state = [], action) => {
  return action.type === C.FETCH_ROOT_CAUSE ? action.payload : state;
};

export const TimeRanges = (state = [], action) => {
  switch (action.type) {
    // case C.GET_TIME_RANGES:
    //   return state;
    case C.SET_TIME_RANGES:
      return action.payload;
    default:
      return state;
  }
};
export const IdentifyClusterLoading = (state = false, action) => {
  return action.type === C.SET_IDENTIFY_CLUSTER_LOADING
    ? action.payload
    : state;
};
export const IdentifyRootCauseLoading = (state = false, action) => {
  return action.type === C.SET_IDENTIFY_ROOTCAUSE_LOADING
    ? action.payload
    : state;
};
export const SelectedChart = (state = "", action) => {
  return action.type === C.SET_SELECTED_CHART ? action.payload : state;
};
export const SelectedCase = (state = null, action) => {
  return action.type === C.SET_SELECTED_CASE ? action.payload : state;
};
export const SelectedClusterForChart = (state = "", action) => {
  return action.type === C.SET_SELECTED_CLUSTERFOR_CHART
    ? action.payload
    : state;
};
export const ModalOpened = (state = false, action) => {
  return action.type === C.OPEN_MODAL ? action.payload : state;
};
export const EnableTimeControl = (state = true, action) => {
  return action.type === C.TOGGLE_TIME_CONTROL ? action.payload : state;
};
export const SaveRCAStatus = (state = false, action) => {
  return action.type === C.SAVE_RCA_STATUS ? action.payload : state;
};

export const SaveAsClicked = (state = false, action) => {
  return action.type === C.SAVE_AS_CLICKED ? action.payload : state;
};
export const DefaultCase = (state = false, action) => {
  return action.type === C.DEFAULT_CASE ? action.payload : state;
};
export const SaveSuccess = (state = false, action) => {
  return action.type === C.SAVE_SUCCESS ? action.payload : state;
};
export default combineReducers({
  AllAssets,
  Loops,
  SelectedUnit,
  SelectedCluster,
  Tabs,
  errors,
  SelectedLoops,
  SelectedTab,
  Clusters,
  RootCauses,
  TimeRanges,
  IdentifyClusterLoading,
  IdentifyRootCauseLoading,
  SelectedChart,
  SelectedClusterForChart,
  Cases,
  ModalOpened,
  HierarchyLoops,
  SelectedUnitInModal,
  SelectedHierarchyLoops,
  EnableTimeControl,
  SelectedCase,
  SaveRCAStatus,
  SaveAsClicked,
  DefaultCase,
  SaveSuccess
});
