import classNames from 'classnames';
import { Piece } from 'types/Board';

interface Props {
  onSelected: (x: number, y: number) => void;
  value: Piece;
  x: number;
  y: number;
}

const BoardPiece = ({ onSelected, value, x, y }: Props) => {
  const handleClick = () => {
    onSelected(x, y);
  };

  return (
    <button
      className={classNames('board__item', {
        'board__item--destroyed': value === Piece.DESTROYED,
        'board__item--empty': value === Piece.EMPTY,
        'board__item--missed': value === Piece.MISSED,
        'board__item--occupied': value === Piece.OCCUPIED,
      })}
      onClick={handleClick}
      type="button"
    >
      {value === Piece.UNKNOWN && <i className="fa-solid fa-question" />}
      {value === Piece.DESTROYED && <i className="fa-solid fa-times" />}
    </button>
  );
};

export default BoardPiece;
