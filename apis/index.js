import URLSearchParams from '@ungap/url-search-params';
import axios from 'axios';

const serverURL = 'https://2dbaa704.ngrok.io';

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

export function getIncidentComments(incidentId, body) {
  return axios.post(`${serverURL}/incidents/${incidentId}/comments`, body);
}

export function postComment(incidentId, body) {
  return axios.post(`${serverURL}/incidents/${incidentId}/comment`, body);
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
