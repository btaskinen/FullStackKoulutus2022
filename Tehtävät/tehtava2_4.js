// Tehtävä 2.4
// Tee ohjelma, jonka lähtökohtana ovat 12 kuukauden palkkatulot kuukausittain. Kuukausipalkkaa korotetaan 50 %:lla. Ohjelma luo uuden taulukon, josta löytyvät korotetut palkat.

const palkat = {
  1: 3000,
  2: 3200,
  3: 3120,
  4: 3050,
  5: 2999,
  6: 3020,
  7: 3800,
  8: 2500,
  9: 2900,
  10: 3200,
  11: 3090,
  12: 2908,
};

const palkanKorostus = (taulukko) => {
  let korotetutPalkat = {};
  for (let i = 1; i < 13; i++) {
    korotetutPalkat[i] = taulukko[i] + taulukko[i] * 0.5;
  }
  return korotetutPalkat;
};

console.log(palkanKorostus(palkat));
