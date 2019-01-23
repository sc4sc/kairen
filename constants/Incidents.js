export const types = [
  {
    type: 'chem',
    title: '화학물질사고',
    safetyProtocol:
      'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/chemical.html',
  },
  {
    type: 'fire',
    title: '불이야',
    safetyProtocol: 'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/fire.html',
  },
  {
    type: 'conflagration',
    title: '화재',
    safetyProtocol: 'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/fire.html',
  },
  {
    type: '가스유출',
    title: '가스유출',
    safetyProtocol:
      'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/electricGas.html#none',
  },
  {
    type: '독극물',
    title: '독극물',
    safetyProtocol:
      'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/CBR.html#none',
  },
  {
    type: '폭발',
    title: '폭발',
    safetyProtocol:
      'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/explosion.html',
  },
];

export const typeMap = types.reduce((obj, el) => {
  obj[el.type] = el;
  return obj;
}, {});

export const getLocalData = type => typeMap[type];
