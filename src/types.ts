export type Matrix = number[][];

export interface DiagonalCheck {
  q: boolean;
  r: boolean;
  anyDiagonal: boolean;
}

export interface MatrixStats {
  max: number;
  min: number;
  average: number;
  sum: number;
  diagonalCheck: DiagonalCheck;
}

export interface MatrixQRResponse {
  qr: { q: Matrix; r: Matrix };
  stats: MatrixStats;
}

export interface MatrixRotateResponse {
  matrix: Matrix;
}

export interface ApiError {
  code: string;
  message: string;
  detail?: string;
}
