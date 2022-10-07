// Tehtävä 2.11
// Sinulla on [{“ma”:44}, {“pe”:100}, {“ke”:21}, {“ti”: 66},{”la”:22}]. Luo taulukko, jossa on mukana objektit, joissa on parillinen arvo.

const objektienLista = [
  { ma: 44 },
  { pe: 100 },
  { ke: 21 },
  { ti: 66 },
  { la: 22 },
];

const parillinenArvot = (taulukko) => {
  let = uusiObjektienLista = [];
  taulukko.reduce((acc, arvo) => {
    if (Object.values(arvo) % 2 === 0) {
      return uusiObjektienLista.push(arvo);
    } else {
      return acc;
    }
  }, taulukko[0]);
  return uusiObjektienLista;
};
console.log(parillinenArvot(objektienLista));

// better version
const parillisetObjektit = (taulukko) => {
  return taulukko.reduce((acc, item) => {
    if (Object.values(item)[0] % 2 === 0) {
      return acc.concat([item]); // use concat since we start we empty list
      //return [...acc, item];
    } else {
      return acc;
    }
  }, []); // start with empty list. acc is empty list. Does not have to be defined seperately
};

console.log(parillisetObjektit(objektienLista));
