// Tehtävä 2.1
// Tee ohjelma, joka tallentaa yhden viikon viikonpäivät ja niitä vastaavat työtunnit taulukkoon. Voit keksiä päiville haluamasi työtunnit, rehellinen pitää kuitenkin olla.

const tunnitTaulukko = () => {
  const taulukko = {};
  taulukko.maanantai = 8;
  taulukko.tiistai = 7.5;
  taulukko.keskiviikko = 9;
  taulukko.torstai = 7;
  taulukko.perjantai = 7.5;
  return taulukko;
};

console.log(tunnitTaulukko());
