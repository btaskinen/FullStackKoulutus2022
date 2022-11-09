// Tehtävä 1.4
// a) Tee funktio, jonka parametreina ovat tunnit, minuutit ja sekunnit ja se palauttaa
// kokonaisajan sekunteina. Esimerkiksi, jos argumenteiksi annetaan 0 tunneiksi, 1
// minuuteiksi 1 ja 1 sekunneiksi, palauttaa funktio 61 sekuntia.
// Kokeile ohjelmaasi myös seuraavalla syötteellä: tunnit=20, minuutit=2 ja sekunnit=300.
// Jos ohjelmasi ei toimi, korjaa se.

const aikaFunktio = (tunti, minuutti, sekunti) => {
  let aikasSekunnissa = tunti * 3600 + minuutti * 60 + sekunti;
  return aikasSekunnissa;
};

// testidata 1
const tunnit1 = 0;
const minuutit1 = 1;
const sekunnit1 = 1;

// testidata 2
const tunnit2 = 20;
const minuutit2 = 2;
const sekunnit2 = 300;

console.log(aikaFunktio(tunnit1, minuutit1, sekunnit1));
console.log(aikaFunktio(tunnit2, minuutit2, sekunnit2));

// b) Tee funktio, jonka parametrina on valuutan määrä markoissa ja se palauttaa määrän
// euroissa.

const rahaVaihturi1 = (maaraMarkka) => {
  const vaihtoKurssiMarkkaEuro = 5.94573;
  let maaraEuro = maaraMarkka / vaihtoKurssiMarkkaEuro;
  return maaraEuro;
};

console.log(rahaVaihturi1(500));

// c) Tee funktio, jonka parametrina on valuutan määrä euroissa ja se palauttaa määrän
// markoissa.

const rahaVaihturi2 = (maaraEuro) => {
  const vaihtoKurssiMarkkaEuro = 5.94573;
  let maaraMarkka = maaraEuro * vaihtoKurssiMarkkaEuro;
  return maaraMarkka;
};

console.log(rahaVaihturi2(500));
