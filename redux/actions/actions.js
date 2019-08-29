import constants from "./../../constants";
import axios from "axios";
import { format } from "date-fns";
import { PropTypes } from "prop-types";
import initialState from "../../redux/initialState";
export const setAssets = () => dispatch => {
  const url =
    "http://localhost/MES/CPM/UI/CPMRCAWebApi/api/RootCauseAnalysis/GetAssetHierarchy";
  axios(url, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    withCredentials: true
  })
    .then(respsonse => {
      let Assets = [];
      Assets.push(respsonse.data);
      dispatch({
        type: constants.ALLASSETS,
        payload: Assets
      });
    })
    .catch(error => {
      dispatch({
        type: constants.ADD_ERROR,
        payload: error
      });
    });
};

export const setSelectedUnit = unit => ({
  type: constants.SET_SELECTED_UNIT,
  payload: unit
});

export const SetSelectedUnitInModal = unit => ({
  type: constants.SELECTED_UNIT_MODAL,
  payload: unit
});

export const setSelectedTab = selectedTab => ({
  type: constants.SELECTED_TAB,
  payload: selectedTab
});

export const getSelectedCluster = () => ({
  type: constants.GET_SELECTED_CLUSTER,
  payload: ""
});
export const setLoops = Loops => ({
  type: constants.FETCH_LOOPS,
  payload: Loops
});
// export const getLoops = unitName => dispatch => {
//   const url = `http://localhost/MES/CPM/UI/CPMRCAWebApi/api/RootCauseAnalysis/GetLoopsforUnit?UnitName=${unitName}`;
//   axios(url, {
//     method: "GET",
//     mode: "no-cors",
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Content-Type": "application/json"
//     },
//     withCredentials: true
//   })
//     .then(respsonse => {
//       const Loops = respsonse.data.map(e => e);

//       dispatch({
//         type: constants.FETCH_LOOPS,
//         payload: Loops
//       });
//     })
//     .catch(error => {
//       dispatch({
//         type: constants.ADD_ERROR,
//         payload: error
//       });
//     });
// };
export const getLoops = unitName => dispatch => {
  const url = `http://localhost/MES/CPM/UI/CPMRCAWebApi/api/RootCauseAnalysis/GetLoopsforUnit?UnitName=${unitName}`;
  axios(url, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    withCredentials: true
  })
    .then(respsonse => {
      const Loops = respsonse.data.map(e => e);

      dispatch({
        type: constants.SET_HIERARCHY_LOOPS,
        payload: Loops
      });
    })
    .catch(error => {
      dispatch({
        type: constants.ADD_ERROR,
        payload: error
      });
    });
};
export const getCasesforUnit = unitName => dispatch => {
  const url = `http://localhost/MES/CPM/UI/CPMRCAWebApi/api/RootCauseAnalysis/GetCasesForUnit?UnitName=${unitName}`;
  axios(url, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    withCredentials: true
  })
    .then(respsonse => {
      const Cases = respsonse.data.map(e => e);

      dispatch({
        type: constants.FETCH_CASES,
        payload: Cases
      });
    })
    .catch(error => {
      dispatch({
        type: constants.ADD_ERROR,
        payload: error
      });
    });
};
export const getClusters = (Loops, startTime, endTime) => dispatch => {
  var Startdate = format(startTime, "MM/DD/YYYY HH:mm:ss");
  var endDate = format(endTime, "MM/DD/YYYY HH:mm:ss");
  dispatch({
    type: constants.FETCH_CLUSTER,
    payload: null
  });
  console.log("loops", Loops);
  const LoopNames = Loops.map(e => e);
  console.log("loops", LoopNames);
  axios
    .post(
      `http://localhost/MES/CPM/UI/CPMRCAWebApi/api/RootCauseAnalysis/GetClusters?startTime=${Startdate}&endTime=${endDate}`,
      LoopNames
    )
    .then(respsonse => {
      const Loops = respsonse.data;

      dispatch({
        type: constants.FETCH_CLUSTER,
        payload: Loops
      });
      dispatch({
        type: constants.SET_IDENTIFY_CLUSTER_LOADING,
        payload: false
      });
    })
    .catch(error => {
      dispatch({
        type: constants.ADD_ERROR,
        payload: error
      });
    });
};

// export const setIdentifyClusterLoading=status=>({
//   type: constants.SET_IDENTIFY_CLUSTER_LOADING,
//   payload: status
// });

export const getAttributesForLoops = (
  Loops,
  startTime,
  endTime
) => dispatch => {
  var Startdate = format(startTime, "MM/DD/YYYY HH:mm:ss");
  var endDate = format(endTime, "MM/DD/YYYY HH:mm:ss");
  const selectedLoops = Loops.join(",");
  var request = {
    Loops: selectedLoops,
    StartTime: Startdate,
    EndTime: endDate
  };

  axios
    .post(
      `http://localhost/MES/CPM/UI/CPMRCAWebApi/api/RootCauseAnalysis/GetAttributesForLoops`,
      request
    )
    .then(respsonse => {
      const data = respsonse.data;

      dispatch({
        type: constants.SET_HIERARCHY_LOOPS,
        payload: data
      });
    })
    .catch(error => {
      dispatch({
        type: constants.ADD_ERROR,
        payload: error
      });
    });
};

export const getRootCause = clusterLoopDetails => dispatch => {
  //var date = format(new Date(), "MM/DD/YYYY");

  axios
    .post(
      `http://localhost/MES/CPM/UI/CPMRCAWebApi/api/RootCauseAnalysis/GetRootCause`,
      clusterLoopDetails
    )
    .then(respsonse => {
      const RootCauses = respsonse.data.map(e => e);

      dispatch({
        type: constants.FETCH_ROOT_CAUSE,
        payload: RootCauses
      });
      dispatch({
        type: constants.SET_IDENTIFY_ROOTCAUSE_LOADING,
        payload: false
      });
    })
    .catch(error => {
      dispatch({
        type: constants.ADD_ERROR,
        payload: error
      });
    });
};

export const setSelectedLoops = Loops => ({
  type: constants.SET_SELECTED_LOOPS,
  payload: Loops
});
export const setHierarcyLoops = Loops => ({
  type: constants.SET_HIERARCHY_LOOPS,
  payload: Loops
});
export const setSelectedHierarchyLoops = Loops => ({
  type: constants.SET_SELECTED_HIERARCHY_LOOPS,
  payload: Loops
});
export const setSelectedClusters = Clusters => ({
  type: constants.SELECTED_CLUSTER,
  payload: Clusters
});

export const finishedTab = tabName => ({
  type: constants.TAB_FINISHED,
  payload: tabName
});

export const getTimeRanges = () => ({
  type: constants.GET_TIME_RANGES
});
export const setTimeRanges = timeRanges => ({
  type: constants.SET_TIME_RANGES,
  payload: timeRanges
});
export const setIdentifyClusterLoading = loading => ({
  type: constants.SET_IDENTIFY_CLUSTER_LOADING,
  payload: loading
});
export const setIdentifyRootCauseLoading = loading => ({
  type: constants.SET_IDENTIFY_ROOTCAUSE_LOADING,
  payload: loading
});
export const setSelectedChart = selectedChart => ({
  type: constants.SET_SELECTED_CHART,
  payload: selectedChart
});
export const setSelectedClusterforChart = selectedCluster => ({
  type: constants.SET_SELECTED_CLUSTERFOR_CHART,
  payload: selectedCluster
});
export const ModalOpened = status => ({
  type: constants.OPEN_MODAL,
  payload: status
});
export const ToggleTimeControl = status => ({
  type: constants.TOGGLE_TIME_CONTROL,
  payload: status
});
export const setSelectedCase = CaseName => ({
  type: constants.SET_SELECTED_CASE,
  payload: CaseName
});

export const resetState = () => dispatch => {
  dispatch({
    type: constants.SET_IDENTIFY_CLUSTER_LOADING,
    payload: true
  });
  dispatch({
    type: constants.SET_IDENTIFY_ROOTCAUSE_LOADING,
    payload: true
  });
  dispatch({
    type: constants.SET_SELECTED_CHART,
    payload: "Line"
  });
  dispatch({
    type: constants.SELECTED_CLUSTER,
    payload: null
  });
  dispatch({
    type: constants.FETCH_ROOT_CAUSE,
    payload: []
  });
  dispatch({
    type: constants.SET_SELECTED_CLUSTERFOR_CHART,
    payload: ""
  });
  dispatch({
    type: constants.FETCH_CLUSTER,
    payload: null
  });
  dispatch({
    type: constants.SET_SELECTED_CASE,
    payload: null
  });

  dispatch({
    type: constants.SET_SELECTED_LOOPS,
    payload: []
  });
};
export const SaveAsClicked = SaveAsState => ({
  type: constants.SAVE_AS_CLICKED,
  payload: SaveAsState
});

export const SaveSuccess = status => ({
  type: constants.SAVE_SUCCESS,
  payload: status
});
export const DefaultCasSelected = Default => ({
  type: constants.DEFAULT_CASE,
  payload: Default
});
export const saveRootCause = saveRCA => dispatch => {
  //var date = format(new Date(), "MM/DD/YYYY");
  console.log(saveRCA);
  axios
    .post(
      `http://localhost/MES/CPM/UI/CPMRCAWebApi/api/RootCauseAnalysis/SaveRootCauseResult`,
      saveRCA
    )
    .then(respsonse => {
      const RootCausesStatus = respsonse.data;

      dispatch({
        type: constants.SAVE_RCA_STATUS,
        payload: RootCausesStatus
      });
      // dispatch({
      //   type: constants.SET_IDENTIFY_ROOTCAUSE_LOADING,
      //   payload: false
      // });
    })
    .catch(error => {
      dispatch({
        type: constants.SAVE_RCA_STATUS,
        payload: false
      });
      dispatch({
        type: constants.ADD_ERROR,
        payload: error
      });
    });
};
