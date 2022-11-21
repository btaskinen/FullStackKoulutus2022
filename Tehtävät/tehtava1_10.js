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

console.log(lukujensSumma1());

// Tehtävä 1.10 a) using reduce function
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

console.log(lukujensSumma2());

// b) Tee funktio, joka saa syötteenä positiiviset luvut a ja b ja palauttaa lukuvälin summan.
// Huomaa, että ohjelman tulee tarkistaa, että b>a.

// Tehtävä 1.10 b) using for-loop
const lukuvalinSumma1 = (a, b) => {
  let summa = 0;
  if (b > a) {
    for (let i = a; i <= b; i++) {
      summa += i;
    }
    return summa;
  } else {
    return "b täytyy olla isompi kuin a";
  }
};

console.log(lukuvalinSumma1(1, 5));

// Tehtävä 1.10 b) using reduce function
const lukuvalinSumma2 = (a, b) => {
  //const lista = [a, b];
  const initialValue = 0;
  if (b > a) {
    let lista = [];
    for (let i = a; i <= b; i++) {
      lista.push(i);
    }
    const summa = lista.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );
    return summa;
  } else {
    return "b täytyy olla isompi kuin a";
  }
};

console.log(lukuvalinSumma2(1, 5));
