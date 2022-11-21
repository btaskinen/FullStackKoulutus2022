// Tehtävä 2.5
// Tee ohjelma, jonka lähtökohtana ovat 12 kuukauden bruttopalkat kuukausittain ja veroprosentti. Ohjelma luo uuden taulukon ja laskee nettotulot vähentäen jokaisen kuukauden bruttopalkasta verot.

const bruttoPalkat = {
  1: [3000, 20],
  2: [3200, 23],
  3: [3120, 22],
  4: [3050, 21],
  5: [2999, 20],
  6: [3020, 21],
  7: [3800, 29],
  8: [2500, 18],
  9: [2900, 20],
  10: [3200, 23],
  11: [3090, 21],
  12: [2908, 20],
};

const nettoTulot = (taulukko) => {
  let nettoPalkat = {};
  for (let i = 1; i < 13; i++) {
    nettoPalkat[i] = taulukko[i][0] - taulukko[i][0] * (taulukko[i][1] / 100);
  }
  return nettoPalkat;
};

console.log(nettoTulot(bruttoPalkat));
