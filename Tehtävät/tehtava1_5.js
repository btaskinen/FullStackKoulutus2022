// Tehtävä 1.5
// Tee funktio, jonka parametrit ovat viikonpäivän numeron ja joka palauttaa viikonpäivän,
// esim. jos argumentti on 1, palautetaan “maanantai”.

const paiva = (luku) => {
  switch (luku) {
    case 1:
      return "maanantai";
    case 2:
      return "tiistai";
    case 3:
      return "keskiviikko";
    case 4:
      return "torstai";
    case 5:
      return "perjantai";
    case 6:
      return "lauantai";
    case 7:
      return "sunnuntai";
    default:
      return "paivaa ei tunnistettu";
  }
};

console.log(paiva(1));
