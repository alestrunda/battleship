import classNames from 'classnames';

const BOARD_SIZE = 10;

const indexToLetter = (index: number) => {
  const startIndex = 65; // ascii value for A
  return String.fromCharCode(startIndex + index);
};

const Item = {
  UNKNOWN: 0,
  EMPTY: 1,
  OCCUPIED: 2,
  DESTROYED: 3,
} as const;

const pieces = [
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const Board = () => (
  <div className="board">
    <div className="board__item board__item--empty" />
    <div className="board__nav board__nav--x">
      {new Array(BOARD_SIZE).fill('').map((_, index) => (
        <div className="board__item">{indexToLetter(index)}</div>
      ))}
    </div>
    <div className="board__nav board__nav--y">
      {new Array(BOARD_SIZE).fill('').map((_, index) => (
        <div className="board__item board__item--full">{index + 1}</div>
      ))}
    </div>
    <div className="board__items">
      {pieces.map((row, xIndex) => (
        <>
          {row.map((item, yIndex) => (
            <div
              className={classNames('board__item', {
                'board__item--active': item === Item.OCCUPIED,
              })}
            >
              {item}
              <br />
              {indexToLetter(xIndex)}
              {yIndex}
            </div>
          ))}
        </>
      ))}
    </div>
  </div>
);

export default Board;
