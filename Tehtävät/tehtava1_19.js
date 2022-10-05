// Tehtävä 1.19
// Muuta seuraavan pseudokoodin mukainen ohjelma funktioksi. Keksi itse funktion
// parametrit.

const funktio = () => {
  let asteikko = prompt("anna asteikko");
  if (
    asteikko == "C" ||
    asteikko == "c" ||
    asteikko == "F" ||
    asteikko == "f"
  ) {
    let lukema = prompt("anna lukema");
    if (lukema <= 100 && lukema > -101) {
      if (asteikko == "C" || asteikko == "c") {
        lukema = (9 / 5) * lukema + 32;
      } else {
        lukema = (5 / 9) * (lukema - 32);
      }
      return lukema;
    } else {
      return "lukema virheellinen";
    }
  } else {
    return "asteikko tuntematon";
  }
};

console.log(funktio());

// ALGORITMI
// INPUT “anna asteikko”, asteikko
// IF ( asteikko = ”C”) OR (asteikko=”c”) OR
// (asteikko = ”F” ) OR (asteikko=”f”) THEN
// INPUT ”anna lukema”, lukema
// IF (lukema <=100 AND lukema > -101) THEN
// IF (asteikko=”C”) OR (asteikko = ”c”)
// THEN
// lukema = 9/5*lukema + 32
// ELSE
// lukema =5/9 *(lukema –32)
// END IF
// OUTPUT lukema
// ELSE
// OUTPUT ”lukema virheellinen”
// END IF
// ELSE
// OUTPUT ”asteikko tuntematon”
// END IF
// END ALGORITMI
