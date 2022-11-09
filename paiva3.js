// reduce funktio kaytto

let tulo = [1, 2, 6, 4, 5].reduce((acc, item) => {
  if (item > 5) {
    return true;
  } else {
    return acc;
  }
}, false);

console.log(tulo);
