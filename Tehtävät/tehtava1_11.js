// Tehtävä 1.11
// Tee funktio, joka palauttaa luvun 10 kertoman. Esimerkiksi 5 kertoma tarkoittaa 1*2*3*4*5.
// Tee tehtävä käyttäen sekä for-rakennetta että reduce-funktiota.

// for-rakennetta
const luvunKertoma1 = () => {
  let kertoma = 1;
  for (let i = 1; i <= 10; i++) {
    kertoma *= i;
  }
  return kertoma;
};

console.log(luvunKertoma1());

// reduce-funktiota
const luvunKertoma2 = () => {
  let lista = [];
  for (let i = 1; i <= 10; i++) {
    lista.push(i);
  }
  const kertoma = lista.reduce(
    (previousValue, currentValue) => previousValue * currentValue
  );
  return kertoma;
};

console.log(luvunKertoma2());
