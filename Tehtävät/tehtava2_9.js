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
  arvojenLista = [];
  for (let i = 0; i < taulukko.length; i++) {
    let valiLista = Object.values(taulukko[i]);
    arvojenLista.push(valiLista[0]);
  }
  console.log(arvojenLista);
  arvojenLista.sort((a, b) => {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
  });
  return arvojenLista;
};
//return taulukko.sort((a, b) => b.value - a.value);

console.log(uusiTaulukko(objektienLista));

// const uusiTaulukko = (taulukko) => {
//     arvojenLista = [];
//     taulukko.sort((a, b) => {
//       if (Object.values(taulukko[a]) > Object.values(taulukko[b])) {
//         return 1;
//       }
//       if (Object.values(taulukko[a]) < Object.values(taulukko[b])) {
//         return -1;
//       }
//     });
//     return taulukko;
//   };
//   //return taulukko.sort((a, b) => b.value - a.value);

//   console.log(uusiTaulukko(objektienLista));

// Ascending
// lista.sort((a, b)) => {
//     if (a > b)
//     return 1;
//     if (a < b)
//     return -1;
//     });

// taulukko.sort((a, b) => {
//     for (let i = 0; i < taulukko.length; i++) {
//       arvojenLista.push(Object.values(taulukko[i]));
//     }
//   }
