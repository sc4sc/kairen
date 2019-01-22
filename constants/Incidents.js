export const types = [
  {
    type: 'chem',
    title: '화학물질사고',
  },
  {
    type: 'fire',
    title: '불이야',
  },
  {
    type: 'conflagration',
    title: '화재',
  },
  { type: '가스유출', title: '가스유출' },
  { type: '독극물', title: '독극물' },
  { type: '폭발', title: '폭발' },
];

export const typeMap = types.reduce((obj, el) => {
  obj[el.type] = el;
  return obj;
}, {});
