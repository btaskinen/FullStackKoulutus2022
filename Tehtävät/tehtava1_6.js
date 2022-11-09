// Tehtävä 1.6
// Tee funktio, joka saa syötteenä iän ja palauttaa seuraavat tekstit riippuen iästä:
// 1-17 “olet alaikäinen”
// 18-33 “olet nuori”
// 34-50 “olet keski-ikäinen”
// 51- “olet vanha”

const ikaKommentti = (ika) => {
  if (ika > 0 && ika <= 17) {
    return "olet alaikäinen";
  } else if (ika >= 18 && ika <= 33) {
    return "olet nuori";
  } else if (ika >= 34 && ika <= 50) {
    return "olet keski-ikäinen";
  } else if (ika > 50) {
    return "olet vanha";
  } else {
    return "Et syöttänyt pätevää lukua. Syötä luku, joka on isompi kuin 0!";
  }
};

console.log(ikaKommentti(51));
