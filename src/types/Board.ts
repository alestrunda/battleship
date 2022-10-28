export enum Piece {
  UNKNOWN = 0,
  EMPTY = 1,
  OCCUPIED = 2,
  DESTROYED = 3,
  MISSED = 4,
}

export type Board = Piece[][];
