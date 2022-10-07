// Tehtava 2_11

lista = [
  { ma: 2 },
  { ti: 52 },
  { ke: 38 },
  { to: 74 },
  { pe: 5 },
  { la: 6 },
  { su: 99 },
];

const parillisetObjektit = (lista) => {
  return lista.reduce((acc, item) => {
    if (Object.values(item)[0] % 2 === 0) {
      return acc.concat([item]); // use concat since we start we empty list
      //return [...acc, item];
    } else {
      return acc;
    }
  }, []); // start with empty list. acc is empty list. Does not have to be defined seperately
};

console.log(parillisetObjektit(lista));

// other way to solve this exercise
const parillisetObjektit2 = (lista) => {
  return lista.filter((item) => {
    // filter makes new list automatically
    if (Object.values(item)[0] % 2 === 0) {
      return true;
    } else {
      return false;
    }
  });
};

// or even simpler
console.log(parillisetObjektit2(lista));

const parillisetObjektit3 = (lista) =>
  lista.filter((item) => Object.values(item)[0] % 2 === 0);

console.log(parillisetObjektit3(lista));

// example with map-function
lista = ["jlkjdf", "jslkfjkl", "dkajkdfjoiew"];

tekstiIsolla = lista.map((item) => item.toUpperCase()); // () = invoke

console.log(tekstiIsolla);

// with object

lista = [{ etunimi: "pekka" }, { etunimi: "Liisa" }];

tekstiIsolla = lista.map((item) => {
  return { etunimi: item.etunimi.toUpperCase() };
});

console.log(tekstiIsolla);

lista = [
  { etunimi: "pekka", sukunimi: "hannula" },
  { etunimi: "Liisa", sukunimi: "Laine" },
];

tekstiIsolla = lista.map((item) => {
  // map always makes new list
  return { ...item, etunimi: item.etunimi.toUpperCase() };
}); // ...item, makes sure that the rest of the object (here sukunimi) is also going into the new list, even though no operation is performed on them

console.log(lista);
console.log(tekstiIsolla);

// making only the first letter of the strings in upper case

tekstiIsolla = lista.map((item) => {
  return {
    ...item,
    etunimi: item.etunimi.charAt(0).toUpperCase() + item.etunimi.slice(1), // changes the first letter in the string to an upper case and then adds the rest of the string starting from the second letter
    sukunimi: item.sukunimi.charAt(0).toUpperCase() + item.sukunimi.slice(1),
  };
});

console.log(lista);
console.log(tekstiIsolla);
