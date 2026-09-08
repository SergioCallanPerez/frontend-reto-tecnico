import type { ApiError, Matrix, MatrixQRResponse, MatrixRotateResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export class ApiRequestError extends Error {
  readonly apiError: ApiError;

  constructor(apiError: ApiError) {
    super(apiError.message);
    this.apiError = apiError;
  }
}

async function postMatrix<T>(path: string, matrix: Matrix): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ matrix }),
  });

  const body = await res.json();
  if (!res.ok) {
    throw new ApiRequestError(body as ApiError);
  }
  return body as T;
}

export function calculateQR(matrix: Matrix): Promise<MatrixQRResponse> {
  return postMatrix<MatrixQRResponse>('/api/v1/matrix/qr', matrix);
}

export function rotateMatrix(matrix: Matrix): Promise<MatrixRotateResponse> {
  return postMatrix<MatrixRotateResponse>('/api/v1/matrix/rotate', matrix);
}
