// Tehtävä 1.2
// Muuta tehtävää 1 siten, että se palauttaa ”syötit luvun joka on pienempi kuin 100”
// tapauksessa, jossa käyttäjä argumentin arvo on pienempi kuin sata.

const luvunTarkistaja = (luku) => {
  if (luku > 100) {
    return "syötit luvun, joka on suurempi kuin 100";
  } else if (luku <= 100) {
    return "syötit luvun joka on pienempi kuin 100";
  } else {
    return "Et syöttänyt lukua. Syötä luku!";
  }
};

console.log(luvunTarkistaja(4));
