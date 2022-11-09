// Tehtävä 1.7
// Tee funktio, joka saa syötteenä etunimen, sukunimen ja iän. Funktio palauttaa
// merkkijonon muodossa ”Terve etunimi sukunimi, olet ikä vuotias”.

const funktio = (etunimi, sukunimi, ika) => {
  return `Terve ${etunimi} ${sukunimi}, olet ${ika} vuotias`;
};

const minunEtunimi = "Barbara";
const minunSukunimi = "Taskinen";
const minunIka = 37;

console.log(funktio(minunEtunimi, minunSukunimi, minunIka));
