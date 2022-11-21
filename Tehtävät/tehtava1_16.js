// Tehtävä 1.16
// Tee funktio, joka saa syötteenä painon (kg), pituuden (m) ja palauttaa painoindeksin.
// Painoindeksin avulla voidaan arvioida painoa. Painoindeksi (BMI = Body Mass Index)
// suhteuttaa painon ja pituuden, ja se voidaan laskea jakamalla paino pituuden neliöllä
// (laskukaavassa paino ilmaistaan kiloina, pituus metreinä).
// Aikuisilla painoindeksin normaalialue on 20.0-24.9. Joskus tästä painoindeksin
// normaalialueesta käytetään käsitettä "ihannepaino". Mitä suurempi painoindeksi on, sitä
// suurempaan ylipainoon se viittaa

const painoIndeksi = (paino, pituus) => {
  let BMI = paino / (pituus * pituus);
  return BMI;
};

console.log(painoIndeksi(55, 1.8));
