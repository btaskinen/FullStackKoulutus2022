// Tehtävä 2.10
// Sinulla on [{“ma”:44}, {“pe”:100}, {“ke”:21}, {“ti”: 66},{”la”:22}]. Luo taulukko, jossa taulukon kentät on järjestetty päivien(avaimet) mukaiseen järjestykseen periaatteella ma<ti<ke<to<pe<la<su.

const objektienLista = [
  { ma: 44 },
  { pe: 100 },
  { ke: 21 },
  { ti: 66 },
  { la: 22 },
];

const uusiTaulukko = (taulukko) => {
  taulukko.sort((a, b) => {
    if (Object.keys(a) > Object.keys(b)) return 1;
    if (Object.keys(a) < Object.keys(b)) return -1;
  });
  return taulukko;
};

console.log(objektienLista);
