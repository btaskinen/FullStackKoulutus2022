// Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

// Each row must contain the digits 1-9 without repetition.
// Each column must contain the digits 1-9 without repetition.
// Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
// Note:

// A Sudoku board (partially filled) could be valid but is not necessarily solvable.
// Only the filled cells need to be validated according to the mentioned rules.

const board1 = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

// Output: true

const board2 = [
  ["8", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

// Output: false

// Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.

// Constraints:

// board.length == 9
// board[i].length == 9
// board[i][j] is a digit 1-9 or '.'.

function validSudoku(board) {
  let validBoard = true;

  // function to check if list whitin a list contains the same number twice
  function checkValidity(list) {
    for (let k = 0; k < list.length; k++) {
      for (let i = 0; i < list[k].length; i++) {
        for (let j = 0; j < list[k].length; j++) {
          // to make sure that element is not compared with itself and ignores comparision to empty spots
          if (i !== j && list[k][i] !== "." && list[k][j] !== ".") {
            // console.log("board", k, i, board[k][i], "board", k, j, board[k][j]);
            if (list[k][i] === list[k][j]) {
              validBoard = false;
            }
          }
        }
      }
    }
    return validBoard;
  }

  // function that adds 9 empty lists to an empty list
  function listMaker(list) {
    for (let i = 0; i < board.length; i++) {
      list.push([]);
    }
    return list;
  }

  // saving the columns of the board into lists so checkValidity function can be used on it
  let columnList = [];
  listMaker(columnList);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      columnList[i].push(board[j][i]);
    }
  }

  // making empyt list of lists to store the 3 x 3 squares
  let listOfSquares = [];
  listMaker(listOfSquares);

  // turning the 3 x 3 squares into lists
  let k = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (j < 3) {
        listOfSquares[k].push(board[i][j]);
      }
      if (j > 2 && j < 6) {
        listOfSquares[k + 1].push(board[i][j]);
      }
      if (j > 5 && j < 9) {
        listOfSquares[k + 2].push(board[i][j]);
      }
    }
  }
  for (let i = 3; i < 6; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (j < 3) {
        listOfSquares[k + 3].push(board[i][j]);
      }
      if (j > 2 && j < 6) {
        listOfSquares[k + 4].push(board[i][j]);
      }
      if (j > 5 && j < 9) {
        listOfSquares[k + 5].push(board[i][j]);
      }
    }
  }
  for (let i = 6; i < 9; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (j < 3) {
        listOfSquares[k + 6].push(board[i][j]);
      }
      if (j > 2 && j < 6) {
        listOfSquares[k + 7].push(board[i][j]);
      }
      if (j > 5 && j < 9) {
        listOfSquares[k + 8].push(board[i][j]);
      }
    }
  }

  checkValidity(board); // checks if rows are valid
  checkValidity(columnList); // checks if columns are valid
  checkValidity(listOfSquares); // checks if 3 x 3 squares are valid

  return validBoard;
}

console.log(validSudoku(board2));

// checking if column is valid
//   for (let k = 0; k < board.length; k++) {
//     for (let i = 0; i < board[k].length; i++) {
//       for (let j = 0; j < board[k].length; j++) {
//         if (i !== j && board[i][k] !== "." && board[j][k] !== ".") {
//           // do not compare element with itself
//           // console.log("board", i, k, board[i][k], "board", j, k, board[j][k]);
//           if (board[i][k] === board[j][k]) {
//             validBoard = false;
//           }
//         }
//       }
//     }
//   }
