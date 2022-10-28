import { indexToLetter } from 'helpers';
import { Board as TBoard, Piece } from 'types/Board';
import { Player } from 'types/Player';
import { BOARD_SIZE } from 'settings';
import BoardPiece from 'components/BoardPiece';

interface Props {
  board: TBoard;
  onPieceSelected: (player: Player, x: number, y: number) => void;
  player: Player;
  shouldRevealBoard: boolean;
}

const Board = ({
  board,
  onPieceSelected,
  player,
  shouldRevealBoard,
}: Props) => {
  const handlePieceSelected = (x: number, y: number) => {
    onPieceSelected(player, x, y);
  };

  return (
    <div className="board">
      <div className="board__item board__item--placeholder" />
      <div className="board__nav board__nav--x">
        {new Array(BOARD_SIZE).fill('').map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="board__item board__item--nav" key={index}>
            {indexToLetter(index)}
          </div>
        ))}
      </div>
      <div className="board__nav board__nav--y">
        {new Array(BOARD_SIZE).fill('').map((_, index) => (
          <div
            className="board__item board__item--full board__item--nav"
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="board__items">
        {board.map((row, x) => (
          <>
            {row.map((value, y) => {
              let pieceValue = value;
              if (shouldRevealBoard) {
                if (value === Piece.UNKNOWN) {
                  pieceValue = Piece.EMPTY;
                }
              } else if (value === Piece.OCCUPIED) {
                pieceValue = Piece.UNKNOWN;
              }
              return (
                <BoardPiece
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${x}${y}`}
                  onSelected={handlePieceSelected}
                  value={pieceValue}
                  x={x}
                  y={y}
                />
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
};

export default Board;
