const serverURL = 'https://4348005f-4254-4628-883a-40baa7dfdbea.mock.pstmn.io';

function getQueryString(q) {
  return new URLSearchParams(q).toString();
}

export function listIncidents(query) {
  return fetch(`${serverURL}/incidents?${getQueryString(query)}`).then(r => r.json());
}