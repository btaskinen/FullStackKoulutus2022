// Tehtävä 1.20
// Muuta seuraavan pseudokoodin mukainen ohjelma funktioksi funktio. Keksi itse funktion
// parametrit.

const funktio = () => {
  let L = prompt("Anna litrat");
  if (L > 0) {
    let K = prompt("Anna kilometrit");
    if (K > 0) {
      let sadalla = (L * 100) / K;
      return sadalla;
    } else return "virhesyöttö";
  } else return "virhesyöttö";
};

console.log(funktio());

// ALGORITMI
// INPUT ”anna litrat”, L
// IF ( L >0 ) THEN
// ( JOS (L>0) NIIN)
// INPUT “anna kilometrit”,K
// IF ( K > 0 ) THEN
// sadalla = L * 100 / K
// OUTPUT sadalla
// ELSE
// OUTPUT ”virhesyöttö”
// END IF
// ELSE
// OUTPUT ”virhesyöttö”
// END IF
// END ALGORITMI
