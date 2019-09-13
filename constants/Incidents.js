import i18n from '../i18n'

export const types = [
  {
    type: '화재',
    title: i18n.t('화재'),
    safetyProtocol: 'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/fire.html',
  },
  {
    type: '가스',
    title: i18n.t('가스'),
    safetyProtocol:
      'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/electricGas.html',
  },
  {
    type: '화학물질 누출',
    title: i18n.t('화학물질 누출'),
    safetyProtocol:
      'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/chemical.html',
  },
  {
    type: '생물학적 유해물질 누출',
    title: i18n.t('생물학적 유해물질 누출'),
    safetyProtocol: 'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/CBR.html',
  },
  {
    type: '방사선',
    title: i18n.t('방사선'),
    safetyProtocol:
      'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/nuclearaccident.html',
  },
  {
    type: '지진',
    title: i18n.t('지진'),
    safetyProtocol:
      'http://m.safekorea.go.kr/idsiSFK/neo/main_m/nat/earthquake.html',
  },
]

export const typeMap = types.reduce((obj, el) => {
  obj[el.type] = el
  return obj
}, {})

export const getLocalData = type => typeMap[type]
