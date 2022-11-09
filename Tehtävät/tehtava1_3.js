// Tehtävä 1.3
// Muuta tehtävää 2 siten, että funktio palauttaa tekstin ”luku on 100” jos käyttäjä syöttää
// luvun 100.

const luvunTarkistaja = (luku) => {
  if (luku > 100) {
    return "syötit luvun, joka on suurempi kuin 100";
  } else if (luku < 100) {
    return "syötit luvun joka on pienempi kuin 100";
  } else if (luku == 100) {
    return "luku on 100";
  } else {
    return "Et syöttänyt lukua. Syötä luku!";
  }
};

console.log(luvunTarkistaja(100));
