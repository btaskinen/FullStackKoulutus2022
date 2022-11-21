// Basic base of React
// JavaScript Objekti malli
// Koulu, Luokat, Oppilaat, objekteja, funktioita, <html></html>

let oppilas1 = {
  nimi: "Olli Oppilas",
};

let oppilas2 = {
  nimi: "Mikko Mallikas",
};

let oppilas3 = {
  nimi: "Kalle Korhonen",
};

let luokka1 = {
  nimi: "3A",
  oppilaidenMaara: 27,
  oppilaat: [oppilas1],
};

let luokka2 = {
  nimi: "2B",
  oppilaidenMaara: 24,
  oppilaat: [oppilas2, oppilas3],
};

let koulu = {
  oppilaidenMaara: 100,
  nimi: "Kangasalan ala-aste",
  luokat: [luokka1, luokka2],
};

console.log(koulu);

// Structure how it should look on the web page
// Koulu
// Koulu nimi: nimi
//     Luokat
//        luokka1
//          oppilaat
//        luokka2
//          oppilaat

// this function gives the html code
// uses the following elements: funktio, JS objekt, map-funktio, joint-funktio
// this code is only reading data, nothing is changed.
const Oppilas = (oppilas) => {
  return "Oppilaan nimi:" + oppilas.nimi;
};

const Luokka = (luokka) => {
  return (
    "luokan nimi:" +
    luokka.nimi +
    luokka.oppilaat.map((oppilas) => "<div>" + Oppilas(oppilas) + "</div>")
  );
};

const Koulu = (koulu) => {
  return (
    "<div><h1>" +
    koulu.nimi +
    "</h1>" +
    koulu.luokat.map((luokka) => Luokka(luokka)).join("") +
    "</div>"
  );
};

console.log(Koulu(koulu));

// let  r = render(koulu) {

// }
