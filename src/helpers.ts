import { Board, Piece } from 'types/Board';

export const indexToLetter = (index: number) => {
  const startIndex = 65; // ascii value for A
  return String.fromCharCode(startIndex + index);
};

export const updateBoard = (
  board: Board,
  x: number,
  y: number,
  value: Piece
) => {
  const newBoard = [...board];
  newBoard[x] = [...board[x]];
  newBoard[x][y] = value;
  return newBoard;
};
