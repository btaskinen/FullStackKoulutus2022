// Tehtävä 2.6
// Tee ohjelma, joka järjestää taulukon luvut [1,4,100,2,5,4] suuruusjärjestykseen. Käytä JavaScriptin sort-funktiota oletustoteutuksella (ei omaa compare-funktiota)

const luvut = [1, 4, 100, 2, 5, 4];

const luvunJarjestaja = (lista) => {
  function compareNumbers(a, b) {
    return a - b;
  }
  return lista.sort(compareNumbers);
};

console.log(luvunJarjestaja(luvut));
