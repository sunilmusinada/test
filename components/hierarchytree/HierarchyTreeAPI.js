import axios from "axios";
export default function getHierarchy() {
  const url = "http://localhost:58695/api/RootCauseAnalysis/GetAssetHierarchy";
  // axios.defaults.headers.post['Content-Type']='application/json;charset=utf-8';
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

  // axios.get(serviceUrl)

  // .then(json=>console.log(json));
  axios(url, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    withCredentials: true
  }).then(response => {
    return response.data;
  });
}
