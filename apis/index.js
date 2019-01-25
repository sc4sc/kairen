import URLSearchParams from '@ungap/url-search-params';
import axios from 'axios';

// 개발 서버 설정해놓고 커밋에 올리지 말라고 해놓음
import { URL as serverURL } from '../constants/Server';

function getQueryString(q) {
  return new URLSearchParams(q).toString();
}

export function listIncidents(query) {
  return fetch(`${serverURL}/incidents?${getQueryString(query)}`).then(r =>
    r.json()
  );
}

export function postIncident({ type, lat, lng, userId }) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const body = JSON.stringify({ userId, type, lat, lng });

  return fetch(`${serverURL}/incidents`, {
    method: 'POST',
    headers,
    body,
  }).then(r => {
    if (!r.ok) {
      throw r;
    }
    return r.json();
  });
}

export function requestAuthentication(username, isAdmin, pushToken) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const body = JSON.stringify({
    userId: username,
    isAdmin,
    expotoken: pushToken,
  });

  return fetch(`${serverURL}/authenticate`, {
    method: 'POST',
    headers,
    body,
  })
    .then(r => r.json())
    .then(result => ({ id: result.id, username, isAdmin, pushToken }));
}

export function getIncidentComments(incidentId, userId, query) {
  let queryString = '';
  if (query) {
    queryString = `&${getQueryString(query)}`;
  }
  return axios.get(
    // `${serverURL}/incidents/${incidentId}/comments?userId=${userId}${queryString}`
    `${serverURL}/incidents/${incidentId}/comments`
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
