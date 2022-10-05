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
  for (let i = 1; i <= 100; i++) {
    listaAlku.push(i);
  }
  let listaTulo = [];
  let pariLuku = listaAlku.reduce((acc, luku) => {
    if (luku % 2 === 0) {
      listaTulo.push(luku);
    } else {
      return acc;
    }
  });
  return listaTulo;
};
console.log(parillisetLuvut2());
