import { Piece } from 'types/Board';
import { Player } from 'types/Player';
import Board from 'components/Board';
import { BOARD_SIZE } from 'settings';
import { useState } from 'react';
import { updateBoard } from 'helpers';

const setUpEmptyBoard = () => {
  const boardPieces: Piece[][] = [];
  for (let x = 0; x < BOARD_SIZE; x += 1) {
    const row: Piece[] = [];
    for (let y = 0; y < BOARD_SIZE; y += 1) {
      row.push(Piece.UNKNOWN);
    }
    boardPieces.push(row);
  }
  boardPieces[1][1] = Piece.OCCUPIED;
  boardPieces[1][2] = Piece.OCCUPIED;
  boardPieces[1][3] = Piece.OCCUPIED;
  return boardPieces;
};

const Game = () => {
  const [playerOnTurn, setPlayerOnTrun] = useState(Player.ONE);
  const [playerOneBoard, setPlayerOneBoard] = useState(setUpEmptyBoard());
  const [playerTwoBoard, setPlayerTwoBoard] = useState(setUpEmptyBoard());

  const playerFinished = () => {
    setPlayerOnTrun(playerOnTurn === Player.ONE ? Player.TWO : Player.ONE);
  };

  const handleBoardPieceSelected = (
    playerBoard: number,
    x: number,
    y: number
  ) => {
    if (playerBoard === playerOnTurn) {
      // cannot click on your own board
      return;
    }
    if (playerBoard === Player.ONE) {
      const newPieceValue =
        playerTwoBoard[x][y] === Piece.OCCUPIED
          ? Piece.DESTROYED
          : Piece.MISSED;
      setPlayerOneBoard(updateBoard(playerOneBoard, x, y, newPieceValue));
    } else if (playerBoard === Player.TWO) {
      const newPieceValue =
        playerTwoBoard[x][y] === Piece.OCCUPIED
          ? Piece.DESTROYED
          : Piece.MISSED;
      setPlayerTwoBoard(updateBoard(playerTwoBoard, x, y, newPieceValue));
    }
    playerFinished();
  };

  return (
    <div className="page">
      Player 1 board:
      <Board
        board={playerOneBoard}
        onPieceSelected={handleBoardPieceSelected}
        player={Player.ONE}
        shouldRevealBoard={playerOnTurn === Player.ONE}
      />
      Player 2 board:
      <Board
        board={playerTwoBoard}
        onPieceSelected={handleBoardPieceSelected}
        player={Player.TWO}
        shouldRevealBoard={playerOnTurn === Player.TWO}
      />
    </div>
  );
};

export default Game;
