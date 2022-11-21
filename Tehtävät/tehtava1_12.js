// Tehtävä 1.12
// Tee funktio, joka palauttaa parilliset luvut väliltä 0-100.
// Tee tehtävä käyttäen for-rakennetta tai reduce-funktiota.

// for-rakennetta
const parillisetLuvut1 = () => {
  lista = [];
  for (let i = 0; i <= 100; i++) {
    if (i % 2 === 0) lista.push(i);
  }
  return lista;
};

console.log(parillisetLuvut1());

// reduce-funktio
const parillisetLuvut2 = () => {
  let listaAlku = [];
  for (let i = 0; i <= 100; i++) {
    listaAlku.push(i);
  }
  return listaAlku.reduce((acc, luku) => {
    if (luku % 2 === 0) {
      return acc.concat([luku]); // use concat since we start we empty list
    } else {
      return acc;
    }
  }, []); // start with empty list. acc is empty list. Does not have to be defined seperately
};
console.log(parillisetLuvut2());
