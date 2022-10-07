// Tehtävä 1.23
// Rakennusfirma aikoo tilata 50 kpl erikokoisia betonielementtejä monumentin pystytystä
// varten. Arkkitehdin oikkujen mukaan tilattavien elementtien on oltava eri kokoisia.
// Elementit ovat sellaisia, että pienin elementti on kooltaan 0,3 m x 0,5 m x 0,5 m (pituus,
// leveys, korkeus). Seuraava elementti on aina 2% pidempi, 3% leveämpi ja 1.5%
// korkeampi kuin edellinen elementti. Betonielementtejä kuljetetaan rakennuspaikalle
// kuorma-autolla. Kuorma-auto voi kuljettaa enintään 10500 kg kuormaa.
// Kun tiedetään, että betonin tiheys on 2,5 kg/dm3, kuinka monta kertaa kuorma-auto joutuu
// ajamaan rakennuspaikalle.
// Ratkaise ongelma laatimasi funktion/ohjelman avulla. Ohjelmassa ei saa käyttää valmiita
// potenssiinkorotusfunktioita.

const ajoKertaLaskuri = () => {
  let elementiLista = [];

  let i = 0;
  let pituus = 3;
  let leveys = 5;
  let korkeus = 5;
  while (i < 50) {
    let paino = pituus * leveys * korkeus * 2.5;
    elementiLista.push(paino);
    pituus += pituus * 0.02;
    leveys += leveys * 0.03;
    korkeus += korkeus * 0.015;
    i++;
  }
  //console.log(elementiLista);
  const kokoPaino = elementiLista.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
  const ajoKerta = kokoPaino / 10500;
  return ajoKerta;
};
console.log(ajoKertaLaskuri());
