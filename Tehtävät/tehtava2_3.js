// Tehtävä 2.3
// Lisää ohjelmaan 2.2 minimin ja maksimin selvittävä osuus.

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
  min = tuntiLista[0];
  max = tuntiLista[0];
  for (let i = 0; i < tuntiLista.length; i++) {
    summa += tuntiLista[i];
    if (tuntiLista[i] < min) min = tuntiLista[i];
    if (tuntiLista[i] > max) max = tuntiLista[i];
  }
  taulukko.keskiArvo = summa / 5;
  taulukko.manimi = min;
  taulukko.maksimi = max;
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
  let min = tuntiLista.reduce((acc, tunti) => {
    if (acc < tunti) {
      return acc;
    } else {
      return tunti;
    }
  }, tuntiLista[0]);
  taulukko.manimi = min;
  let max = tuntiLista.reduce((acc, tunti) => {
    if (acc > tunti) {
      return acc;
    } else {
      return tunti;
    }
  }, tuntiLista[0]);
  taulukko.maksimi = max;
  return taulukko;
};

console.log(tunnitTaulukko2());
