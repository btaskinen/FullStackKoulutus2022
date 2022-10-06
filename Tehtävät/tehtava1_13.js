// Tehtävä 1.13
// Tee funktio, joka palauttaa parillisten kulujen summan lukuväliltä 0-1000.
// Tee tehtävä käyttäen joko for-rakennetta tai reduce-funktiota.

// for-rakennetta
const parillisetLuvunSumma1 = () => {
  summa = 0;
  for (let i = 0; i <= 1000; i++) {
    if (i % 2 === 0) summa += i;
  }
  return summa;
};

console.log(parillisetLuvunSumma1());

// reduce-funktio
const parillisetLuvunSumma2 = () => {
  let lista = [];
  for (let i = 1; i <= 100; i++) {
    lista.push(i);
  }
  let summa = lista.reduce((acc, luku) => {
    if (luku % 2 === 0) {
      return acc + luku;
    } else {
      return acc;
    }
  });
  return summa;
};

console.log(parillisetLuvunSumma2());
