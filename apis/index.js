import URLSearchParams from '@ungap/url-search-params';
import axios from 'axios';

// 개발 서버 설정해놓고 커밋에 올리지 말라고 해놓음
import { URL as serverURL } from '../constants/Server';

export function setAppToken(token) {
  axios.defaults.headers.common['Authorization'] = token;
}

function getQueryString(q) {
  return new URLSearchParams(q).toString();
}

export function listIncidents(query) {
  return axios
    .get(`${serverURL}/incidents?${getQueryString(query)}`)
    .then(response => response.data);
}

export function postIncident({ type, lat, lng, userId }) {
  return axios
    .post(`${serverURL}/incidents`, { userId, type, lat, lng })
    .then(response => response.data);
}

export function requestAuthentication(ssoToken, isAdmin, pushToken) {
  return axios
    .post(
      `${serverURL}/authenticate`,
      {
        isAdmin,
        expotoken: pushToken,
      },
      { headers: { Authorization: `Bearer ${ssoToken}` } }
    )
    .then(response => {
      const result = response.data;
      return {
        id: result.id,
        isAdmin,
        pushToken,
        appToken: result.appToken,
      };
    });
}

export function getIncidentComments(incidentId, userId, query) {
  let queryString = '';

  if (query) {
    queryString = `&${getQueryString(query)}`;
  }

  return axios.get(
    `${serverURL}/incidents/${incidentId}/comments?userId=${userId}${queryString}`
  );
}

export function postComment(incidentId, body) {
  return axios.post(`${serverURL}/incidents/${incidentId}/comments`, body);
}

export function postReply(commentId, body) {
  return axios.post(`${serverURL}/comments/${commentId}/reply`, body);
}

export function getRecentProgress(incidentId) {
  return axios.get(`${serverURL}/incidents/${incidentId}/progresses`);
}

export function getProgressList(incidentId) {
  return axios.get(`${serverURL}/incidents/${incidentId}/progresses`);
}

export function postProgress(incidentId, body) {
  return axios.post(`${serverURL}/incidents/${incidentId}/progresses`, body);
}

export function postLike(commentId, body) {
  return axios.post(`${serverURL}/comments/${commentId}/like`, body);
}

export function postUnlike(commentId, body) {
  return axios.post(`${serverURL}/comments/${commentId}/unlike`, body);
}

export function getIncidentState(incidentId) {
  return axios.get(`${serverURL}/incidents/${incidentId}`);
}

export function postIncidentState(incidentId, body) {
  return axios.post(`${serverURL}/incidents/${incidentId}`, body);
}
