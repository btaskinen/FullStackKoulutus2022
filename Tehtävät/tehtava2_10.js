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
  viikonPaivat = ["ma", "ti", "ke", "to", "pe", "la", "su"];
  uusiObjektienLista = [];
  for (let i = 0; (i = viikonPaivat.length); i++) {
    taulukko.reduce((acc, objekti) => {
      if (Object.keys(objekti)[0] === viikonPaivat[i]) acc.push(objekti);
    }, []);
  }
  return uusiObjektienLista;
};

console.log(uusiTaulukko(objektienLista));
