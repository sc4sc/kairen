export const types = [
  {
    type: '화재',
    title: '화재',
    safetyProtocol:
      'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/fire.html',
  },
  {
    type: '가스',
    title: '가스',
    safetyProtocol: 'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/electricGas.html',
  },
  {
    type: '화학물질 누출',
    title: '화학물질 누출',
    safetyProtocol:
      'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/chemical.html',
  },
  {
    type: '생물학적 유해물질 누출',
    title: '생물학적 유해물질 누출',
    safetyProtocol:
      'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/CBR.html',
  },
  {
    type: '방사선',
    title: '방사선',
    safetyProtocol:
      'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/nuclearaccident.html',
  },
  {
      type: '지진',
      title: '지진',
      safetyProtocol:
          'http://m.safekorea.go.kr/idsiSFK/neo/main_m/nat/earthquake.html',
  },
  {
      type: '엘레베이터 사고',
      title: '엘레베이터 사고',
      safetyProtocol:
          'http://m.safekorea.go.kr/idsiSFK/neo/main_m/lit/elevator.html',
  },
  {
      type: '정전',
      title: '정전',
      safetyProtocol:
          'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/blackout.html',
  },
];

export const typeMap = types.reduce((obj, el) => {
  obj[el.type] = el;
  return obj;
}, {});

export const getLocalData = type => typeMap[type];
