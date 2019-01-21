const serverURL = 'https://4348005f-4254-4628-883a-40baa7dfdbea.mock.pstmn.io';

import URLSearchParams from '@ungap/url-search-params';

function getQueryString(q) {
  return new URLSearchParams(q).toString();
}

export function listIncidents(query) {
  return fetch(`${serverURL}/incidents?${getQueryString(query)}`).then(r =>
    r.json()
  );
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
