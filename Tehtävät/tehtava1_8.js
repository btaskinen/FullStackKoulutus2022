// Tehtävä 1.8
// Tee funktio, joka saa syötteenä syntymävuoden ja suosikkinumeron. Jos syntymävuosi on
// 1970 ja suosikkinumero 77, niin palautetaan teksti: ”Olet onnenpekka”. Tee tehtävä
// yhdellä JOS (IF) lauseella.

const funktio = (syntymavuosi, suosikkinumero) => {
  if (syntymavuosi == 1970 && suosikkinumero == 77) return "Olet onnenpekka!";
};

console.log(funktio(1971, 76));
