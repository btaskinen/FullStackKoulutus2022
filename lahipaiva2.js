// ottaa syötteksi luvut 1 - 7
/*
const paiva = (luku) => {
  console.log("luku:", luku); // test to see if right type is entered. can be commented out after testing.
  if (luku <= 0 || luku > 8) return "luku ei kelpaa!!"; // option to first test for validity
  switch (luku) {
    case 1:
      return "maanantai";
    case 2:
      return "tiistai";
    default:
      return "paivaa ei tunnistettu";
  }
};

console.log(paiva(10));
*/

// Tehtävä 1.9

// name variables with Camel case!
const lukuLista = () => {
  // hakkasulku
  let lista = [];
  // some list functions: push, delete, length
  for (let i = 7; i < 132; i++) {
    lista.push(i);
  }
  return lista;
};

//console.log(lukuLista());

// alternative solution using range type function; based on idea that lista is an object
function range(size, startArt = 0) {
  return [...Array(size).keys()].map((i) => +startAt);
}

// list as a JavaScript object
var lista = {
  0: "a",
  1: "b",
  2: "c",
};

let alkio = lista[2];
//console.log(alkio);

// values() calls values from object
//console.log(lista.values());

// Tehtävä 1.10
// a) Tee funktio, joka palauttaa lukujen 7-131 summan.
// b) Tee funktio, joka saa syötteenä positiiviset luvut a ja b ja palauttaa lukuvälin summan.
// Huomaa, että ohjelman tulee tarkistaa, että b>a.
// Tee molemmat tehtävät käyttäen sekä for-rakennetta että reduce-funktiota.

// Tehtävä 1.10 a) using for-loop
const lukujensSumma1 = () => {
  let lukujenLista = [];
  for (let i = 7; i < 132; i++) {
    lukujenLista.push(i);
  }
  let listanSumma = 0;
  for (let i = 0; i < lukujenLista.length; i++) {
    listanSumma += lukujenLista[i];
  }

  return listanSumma;
};

//console.log(lukujensSumma1());

// Tehtävä 1.10 a) using reduce function
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
const lukujensSumma2 = () => {
  let lukujenLista = [];
  for (let i = 7; i < 132; i++) {
    lukujenLista.push(i);
  }
  const initialValue = 0;
  const sumWithInitial = lukujenLista.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  return sumWithInitial;
};

//console.log(lukujensSumma2());

// objekti

var objekti = {}; // creates an empty object

objekti.etunimi = "jaakko"; // adds elements to the object
objekti.sukunimi = "niskanen";
console.log("objekti:", objekti);

// node allows to use ready made JavaScript objects

// or one can directly create object with elements

var henkilo2 = {
  etunimi: "liisa",
  sukunimi: "penttinen",
  puhelimet: [],
  sisar: null,
};

var henkilo1 = {
  etunimi: "jaakko",
  sukunimi: "niskanen",
  puhelimet: [],
  sisar: henkilo2, // contains object within object
};

henkilo1.puhelimet.push("05054559987"); // adding element to list in object henkilo
henkilo1.puhelimet.push("05054553487");

//console.log(henkilo1);
//console.log(henkilo2);

var henkiloLista = [];
henkiloLista.push(henkilo1, henkilo2); // create list of objects

//console.log(henkiloLista);

// different ways to retrieve elements from object
//console.log("henkilon1 etunimi", henkilo1["etunimi"]);
//console.log(henkilo1.etunimi);

var henkilo3 = { ...henkilo1, lempiruoka: "spagettikastike" }; // "..."" copies elements from henkilo1 object; adds new element

//console.log("henkilo 3: ", henkilo3);

var henkiloLista2 = [];
henkiloLista2.push(henkilo1, henkilo2);
//console.log(henkiloLista2);

// display the person's details on a webpage
// like this:
// <div> henkilo1 </div>
// <div> henkilo2 </div>
// not possible to use for loop in this case. Insead map()-function is used

let uusiLista = henkiloLista2.map((henkilo) => {
  return "<div>" + henkilo.etunimi + "</div>";
});

//console.log(uusiLista); // returns a list of the desired strings

let k = uusiLista.join(","); // combines strings in array into one string

//console.log(k);

// best way to use reduce()-function
let html = henkiloLista.reduce((acc, current) => {
  return acc + "<div>" + current.etunimi + "</div>";
}, "");

console.log(html);

henkiloLista.pop(); // pop()-function removies the last entry of a list

//console.log(henkiloLista);

// ternary operator
let x = 6;
let vastaus = x > 5 ? "tosi" : "epatosi";

console.log(vastaus);
