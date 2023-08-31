import axios from "axios";

function getHeaders() {
  return { "Content-Type": "application/json" };
}

function getHeadersWithToken() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

function apiGet(url) {
  const finalUrl = process.env.REACT_APP_BASE_API_PATH + url;
  console.log(finalUrl);
  return axios.get(finalUrl, { headers: getHeaders() });
}

function apiGetWithToken(url) {
  const finalUrl = process.env.REACT_APP_BASE_API_PATH + url;
  console.log(finalUrl);
  return axios.get(finalUrl, { headers: getHeadersWithToken() });
}

function apiPost(url, body) {
  const finalUrl = process.env.REACT_APP_BASE_API_PATH + url;
  return axios.post(finalUrl, body, {
    headers: getHeaders(),
  });
}

function apiPostWithToken(url, body) {
  const finalUrl = process.env.REACT_APP_BASE_API_PATH + url;
  return axios.post(finalUrl, body, {
    headers: getHeadersWithToken(),
  });
}

function apiPutWithToken(url, body = {}) {
  const finalUrl = process.env.REACT_APP_BASE_API_PATH + url;
  return axios.put(finalUrl, body, {
    headers: getHeadersWithToken(),
  });
}

function apiDeleteWithToken(url) {
  const finalUrl = process.env.REACT_APP_BASE_API_PATH + url;
  return axios.delete(finalUrl, {
    headers: getHeadersWithToken(),
  });
}

export {
  apiGet,
  apiGetWithToken,
  apiPost,
  apiPostWithToken,
  apiPutWithToken,
  apiDeleteWithToken,
};
