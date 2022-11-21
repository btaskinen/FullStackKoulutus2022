// Tehtävä 2.2
// Tee tehtävän 2.1 ohjelmaan lisäominaisuus, joka laskee työtuntien keskiarvon

// a) for-rakenteen (forEach, for-silmukka tai for of) avulla
const tunnitTaulukko1 = () => {
  const taulukko = {};
  taulukko.maanantai = 8;
  taulukko.tiistai = 7.5;
  taulukko.keskiviikko = 9;
  taulukko.torstai = 7;
  taulukko.perjantai = 7.5;

  const tuntiLista = Object.values(taulukko);
  summa = 0;
  for (let i = 0; i < 5; i++) {
    summa += tuntiLista[i];
  }
  taulukko.keskiArvo = summa / 5;
  return taulukko;
};

console.log(tunnitTaulukko1());

// b) reduce -funktiolla
const tunnitTaulukko2 = () => {
  const taulukko = {};
  taulukko.maanantai = 8;
  taulukko.tiistai = 7.5;
  taulukko.keskiviikko = 9;
  taulukko.torstai = 7;
  taulukko.perjantai = 7.5;

  const tuntiLista = Object.values(taulukko);

  let summa = tuntiLista.reduce((acc, tunti) => acc + tunti);
  taulukko.keskiArvo = summa / 5;
  return taulukko;
};

console.log(tunnitTaulukko2());
