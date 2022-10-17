// Tehtävä 2.13
// Sinulla on {“ma”:44, “pe”:100, “ke”:21, “ti”: 66,”la”:22}. Tee ohjelma, joka muuttaa objektin listaksi niin, että [{“ma”:44},{“pe”:100},...]. Ohje: käytä esim. Objectin keys ja values -funktioita.

const objekti = {
  ma: 44,
  pe: 100,
  ke: 21,
  ti: 66,
  la: 22,
};

const objektiTaulukkoon = (objekti) => {
  uusiObjektienLista = [];
  taulukko.reduce((acc, arvo) => {
    if (Object.keys(arvo)[0].includes("e", 1)) {
      return uusiObjektienLista.push(arvo);
    } else {
      return acc;
    }
  }, taulukko[0]);
  return uusiObjektienLista;
};
console.log(avainElla(objekti));
