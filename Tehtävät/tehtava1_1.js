// Tehtävä 1.1
// Tee funktio, joka saa parametrina kokonaisluvun. Jos luku on suurempi kuin 100, funktio
// palauttaa: ”syötit luvun, joka on suurempi kuin 100”. Jos luku on 100 tai pienempi,
// palautetaan “”

const luvunTarkistaja = (luku) => {
  if (luku > 100) {
    return "syötit luvun, joka on suurempi kuin 100";
  } else if (luku <= 100) {
    return "";
  } else {
    return "Et syöttänyt lukua. Syötä luku!";
  }
};

console.log(luvunTarkistaja(4));
