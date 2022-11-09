// Tehtävä 1.9
// Tee funktio, joka palauttaa luvut 7-131 (lista/taulukko)

const lukuLista = () => {
  let lista = [];
  for (let i = 7; i < 132; i++) {
    lista.push(i);
  }
  return lista;
};

console.log(lukuLista());
