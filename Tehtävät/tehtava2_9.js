// Tehtävä 2.9
// Sinulla on [{“ma”:44}, {“pe”:100}, {“ke”:21}, {“ti”: 66},{”la”:22}]. Luo taulukko, jossa taulukon objektit on järjestetty arvojen(values) mukaiseen järjestykseen.

const objektienLista = [
  { ma: 44 },
  { pe: 100 },
  { ke: 21 },
  { ti: 66 },
  { la: 22 },
];

const uusiTaulukko = (taulukko) => {
  taulukko.sort((a, b) => {
    if (Object.values(a)[0] > Object.values(b)[0]) {
      return 1;
    }
    if (Object.values(a)[0] < Object.values(b)[0]) {
      return -1;
    }
  });
  return taulukko;
};

console.log(uusiTaulukko(objektienLista));
