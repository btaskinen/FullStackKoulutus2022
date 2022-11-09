// Tehtävä 1.17
// Kirjoita funktio, joka saa syötteenä vuosiluvun ja palauttaa merkkijonon “on” tai “ei” sen
// mukaan onko vuosi karkausvuosi.
// Karkausvuosia ovat pääsääntöisesti 4:llä jaolliset vuosiluvut. Vuosi ei kuitenkaan ole
// karkausvuosi, jos vuosiluku on jaollinen 100:lla. Mutta, jos vuosiluku on jaollinen 400:lla,
// vuosi on aina karkausvuosi.
// Ohje: Vuodet 1996 ja 2000 ovat karkausvuosia, vuodet 1800 ja 1997 eivät.
// Jakojäännösoperaattori on %.

const karkausVuosi = (vuosiluku) => {
  if (vuosiluku % 100 === 0 && !(vuosiluku % 400 === 0)) return "ei";
  else if (vuosiluku % 4 === 0) return "on";
  else return "ei";
};

console.log(karkausVuosi(1996));
console.log(karkausVuosi(2000));
console.log(karkausVuosi(1800));
console.log(karkausVuosi(1997));
console.log(karkausVuosi(2020));
