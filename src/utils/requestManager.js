import axios from "axios";

function getHeaders() {
  return { "Content-Type": "application/json" };
}

function getHeadersFormData() {
  return { "Content-Type": "multipart/form-data" };
}

function getHeadersWithToken() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

function getHeadersWithTokenFormData() {
  return {
    "Content-Type": "multipart/form-data",
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

function apiPostFormData(url, body) {
  const finalUrl = process.env.REACT_APP_BASE_API_PATH + url;
  return axios.post(finalUrl, body, {
    headers: getHeadersFormData(),
  });
}

function apiPostWithToken(url, body) {
  const finalUrl = process.env.REACT_APP_BASE_API_PATH + url;
  return axios.post(finalUrl, body, {
    headers: getHeadersWithToken(),
  });
}

function apiPutWithTokenFormData(url, body) {
  const finalUrl = process.env.REACT_APP_BASE_API_PATH + url;
  return axios.put(finalUrl, body, {
    headers: getHeadersWithTokenFormData(),
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
  apiPostFormData,
  apiPutWithTokenFormData,
  apiPostWithToken,
  apiPutWithToken,
  apiDeleteWithToken,
};
