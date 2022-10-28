import { Piece } from 'types/Board';
import { Player } from 'types/Player';
import Board from 'components/Board';
import { BOARD_SIZE } from 'settings';
import { useState } from 'react';
import { updateBoard } from 'helpers';
import { Move } from 'types/Move';

const setUpEmptyBoard = () => {
  const boardPieces: Piece[][] = [];
  for (let x = 0; x < BOARD_SIZE; x += 1) {
    const row: Piece[] = [];
    for (let y = 0; y < BOARD_SIZE; y += 1) {
      row.push(Piece.UNKNOWN);
    }
    boardPieces.push(row);
  }
  /* test data */
  boardPieces[1][1] = Piece.OCCUPIED;
  boardPieces[1][2] = Piece.OCCUPIED;
  boardPieces[1][3] = Piece.OCCUPIED;
  /* /test data */
  return boardPieces;
};

const Game = () => {
  const [playerOnTurn, setPlayerOnTrun] = useState(Player.ONE);
  const [lastMove, setLastMove] = useState<Move | undefined>();
  const [playerOneBoard, setPlayerOneBoard] = useState(setUpEmptyBoard());
  const [playerTwoBoard, setPlayerTwoBoard] = useState(setUpEmptyBoard());
  const [showSwitchPlayerScreen, setSwitchPlayerScreen] = useState(false);

  const playerMoveFinished = () => {
    setSwitchPlayerScreen(true);
  };

  const handleContinueClick = () => {
    setSwitchPlayerScreen(false);
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
        playerOneBoard[x][y] === Piece.OCCUPIED
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
    setLastMove(Move.HIT); // TODO: finish getting move
    playerMoveFinished();
  };

  return (
    <div className="page">
      {showSwitchPlayerScreen ? (
        <div>
          <h2>
            {lastMove === Move.HIT && 'Hit, but the ship still stands'}
            {lastMove === Move.HIT_SINK && 'Hit, the ship was desyroyed'}
            {lastMove === Move.MISS && 'Nothing but water'}
          </h2>
          <h2>Player {playerOnTurn === Player.ONE ? 'ONE' : 'TWO'} on turn.</h2>
          <button onClick={handleContinueClick} type="button">
            Continue
          </button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Game;
