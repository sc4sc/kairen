import URLSearchParams from '@ungap/url-search-params';
import axios from 'axios';

// const serverURL = 'http://66721670.ngrok.io';
const serverURL = 'http://6770ced5.ngrok.io';

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
  const body = JSON.stringify({ username, isAdmin, expotoken: pushToken });

  return fetch(`${serverURL}/authenticate`, {
    method: 'POST',
    headers,
    body,
  })
    .then(r => r.json())
    .then(result => ({ id: result.id, username, isAdmin, pushToken }));
}

export function getIncidentComments(incidentId) {
  return axios.get(`${serverURL}/incidents/${incidentId}/comments`);
}

export function postComment(incidentId, body) {
  return axios.post(`${serverURL}/incidents/${incidentId}/comments`, body);
}

export function getRecentProgress(incidentId) {
  return axios.get(`${serverURL}/incidents/${incidentId}/comments`);
}

export function getProgressList(incidentId) {
  return axios.get(`${serverURL}/incidents/${incidentId}/progresses`);
}
