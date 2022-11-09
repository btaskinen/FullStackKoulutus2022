// Tehtävä 1.21
// Laadi funktio, joka saa syötteenä henkilön nimen.. Jos nimi on Pekka, palautetaan
// funktiosta ”Minunkin mielestäni Pekka on kiva”. Sama logiikka pätee, jos syötteenä on
// Liisa tai Jorma. Jos syötetään jotain muuta, palautetaan funktiosta ”En tunne henkilöä”.
// Toteuta ohjelma sekä ehtolausein että switch-case rakenteen avulla.

// ehtolausein
const henkiloNimi1 = (nimi) => {
  let lowerCaseNimi = nimi.toLowerCase();
  if (lowerCaseNimi == "pekka") {
    return "Minunkin mielestäni Pekka on kiva";
  } else if (lowerCaseNimi == "jorma") {
    return "Minunkin mielestäni Jorma on kiva";
  } else if (lowerCaseNimi == "liisa") {
    return "Minunkin mielestäni Liisa on kiva";
  } else return "";
};

console.log(henkiloNimi1("jOrMa"));

// switch-case rakenne
const henkiloNimi2 = (nimi) => {
  let lowerCaseNimi = nimi.toLowerCase();
  switch (lowerCaseNimi) {
    case "pekka":
      return "Minunkin mielestäni Pekka on kiva";
    case "jorma":
      return "Minunkin mielestäni Jorma on kiva";
      break;
    case "liisa":
      return "Minunkin mielestäni Liisa on kiva";
    default:
      return "";
  }
};

console.log(henkiloNimi2("Anna"));
