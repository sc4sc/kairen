const serverURL = 'https://4348005f-4254-4628-883a-40baa7dfdbea.mock.pstmn.io';

export function listIncidents() {
  return fetch(`${serverURL}/incidents`);
}
