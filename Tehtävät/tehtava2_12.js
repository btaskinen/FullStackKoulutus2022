// Tehtävä 2.12
// Sinulla on [{“ma”:44}, {“pe”:100}, {“ke”:21}, {“ti”: 66},{”la”:22}]. Luo taulukko, jossa on mukana objektit, joiden avaimen toinen kirjain on e.

const objektienLista = [
  { ma: 44 },
  { pe: 100 },
  { ke: 21 },
  { ti: 66 },
  { la: 22 },
];

const avainElla = (taulukko) => {
  uusiObjektienLista = [];
  taulukko.reduce((acc, arvo) => {
    if (Object.keys(arvo)[0].includes("e", 1)) {
      return uusiObjektienLista.push(arvo);
    } else {
      return acc;
    }
  }, taulukko[0]);
  return uusiObjektienLista;
};
console.log(avainElla(objektienLista));
