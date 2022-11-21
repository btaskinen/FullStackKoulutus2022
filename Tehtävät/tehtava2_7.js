// Tehtävä 2.7
// Tee ohjelma, joka järjestää taulukon merkkijonot [“1”,”4”,”100”,”2”,”5”,”4”] aakkosjärjestykseen. Käytä JavaScriptin sort-funktiota oletustoteutuksella (ei omaa compare-funktiota)

const luvut = ["1", "4", "100", "2", "5", "4"];

const luvunJarjestaja = (lista) => {
  return lista.sort();
};

console.log(luvunJarjestaja(luvut));
