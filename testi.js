// function funktio(luku) {
//   console.log(luku);
//   if (luku <= 100) {
//     return "";
//   } else {
//     return "syotit luvun, joka on suurempi kuin 100.";
//   }
// }

// console.log(funktio(101));

// const functio2 = (lulu) => {
//   if (luku <= 100) {
//     return "";
//   } else {
//     return "syotit luvun, joka on suurempi kuin 100.";
//   }
// };

// Tehtava 1.2
// function funktio(luku: number): string {
//   //typescript
//   console.log(luku);
//   if (luku <= 100) {
//     return "";
//   } else {
//     return "syotit luvun, joka on suurempi kuin 100.";
//   }
// }

// console.log(funktio("Pekka"));

// Tehtävä 1.5

// switch statement use
const viikonpaiva = (viikonpaivanNumero) => {
  switch (viikonpaivanNumero) {
    case 1:
      return "maanantai";
      break; // break is needed when no return is used
    case 2:
      return "tiistai";
      break;
    case 3:
      return "keskiviikko";
      break;
    case 4:
      return "torstai";
      break;
    case 5:
      return "perjantai";
      break;
    case 6:
      return "lauantai";
      break;
    case 7:
      return "suunnuntai";
      break;
    default:
      console.log(`En tunnista paivaa`);
  }
};

console.log(viikonpaiva(8));

const jaa = (jaettava, jakaja) => {
  let y = jaettava / jakaja;
  return y;
};

console.log(jaa(5, 0));
