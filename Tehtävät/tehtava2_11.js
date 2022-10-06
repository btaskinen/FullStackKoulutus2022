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
  uusiObjektienLista = [];
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
