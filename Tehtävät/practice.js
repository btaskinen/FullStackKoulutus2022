const objektienLista = [
  { ma: 44 },
  { pe: 100 },
  { ke: 21 },
  { ti: 66 },
  { la: 22 },
];

objektienLista.sort((a, b) => {
  if (Object.values(Number(a)) > Object.values(Number(b))) return 1;
  if (Object.values(Number(a)) < Object.values(Number(b))) return -1;
});

console.log(objektienLista);

objektienLista.sort((a, b) => {
  if (Object.keys(a) > Object.keys(b)) return 1;
  if (Object.keys(a) < Object.keys(b)) return -1;
});

console.log(objektienLista);

// console.log(Object.values(objektienLista[0]));

// const kvArray = [
//   { key: 1, value: 10 },
//   { key: 2, value: 20 },
//   { key: 3, value: 30 },
// ];

// const reformattedArray = kvArray.map(({ key, value }) => ({ [key]: value }));

// objektienLista.sort(({ key, value }) => {
//   if (Object.values(taulukko[a]) > Object.values(taulukko[b])) {
//     return 1;
//   }
//   if (Object.values(taulukko[a]) < Object.values(taulukko[b])) {
//     return -1;
//   }
// });

// reformattedArray is now [{1: 10}, {2: 20}, {3: 30}],

// kvArray is still:
// [{key: 1, value: 10},
//  {key: 2, value: 20},
//  {key: 3, value: 30}]
