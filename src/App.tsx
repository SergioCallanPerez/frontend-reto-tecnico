import { useState } from 'react';
import { ApiRequestError, calculateQR, rotateMatrix } from './api';
import type { Matrix, MatrixQRResponse, MatrixRotateResponse } from './types';
import { MatrixTable } from './MatrixTable';
import './App.css';

const EXAMPLE_MATRIX = '[[1,2,3],[4,5,6],[7,8,10]]';

function parseMatrix(raw: string): Matrix {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('El texto no es un JSON válido');
  }
  if (!Array.isArray(parsed) || !parsed.every((row) => Array.isArray(row))) {
    throw new Error('Debe ser un array de arrays de números, ej: [[1,2],[3,4]]');
  }
  return parsed as Matrix;
}

export default function App() {
  const [input, setInput] = useState(EXAMPLE_MATRIX);
  const [qrResult, setQrResult] = useState<MatrixQRResponse | null>(null);
  const [rotateResult, setRotateResult] = useState<MatrixRotateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAction(action: (matrix: Matrix) => Promise<void>) {
    setError(null);
    setLoading(true);
    try {
      const matrix = parseMatrix(input);
      await action(matrix);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setError(err.apiError.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  }

  const handleQR = () =>
    handleAction(async (matrix) => {
      setRotateResult(null);
      setQrResult(await calculateQR(matrix));
    });

  const handleRotate = () =>
    handleAction(async (matrix) => {
      setQrResult(null);
      setRotateResult(await rotateMatrix(matrix));
    });

  return (
    <div className="container">
      <h1>Factorización QR y Estadísticas</h1>
      <p className="subtitle">Consume la API Go, que a su vez orquesta la API Node - Coding Challenge Interseguro</p>

      <label htmlFor="matrix-input">Matriz de entrada (JSON, array de arrays)</label>
      <textarea
        id="matrix-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
      />

      <div className="actions">
        <button onClick={handleQR} disabled={loading} className="primary">
          Calcular QR + Estadísticas
        </button>
        <button onClick={handleRotate} disabled={loading} className="secondary">
          Rotar matriz (alternativa)
        </button>
      </div>

      {loading && <p>Calculando...</p>}
      {error && <p className="error">{error}</p>}

      {qrResult && (
        <div className="results">
          <MatrixTable title="Q" matrix={qrResult.qr.q} />
          <MatrixTable title="R" matrix={qrResult.qr.r} />
          <div className="stats">
            <h3>Estadísticas</h3>
            <ul>
              <li>Máximo: {qrResult.stats.max}</li>
              <li>Mínimo: {qrResult.stats.min}</li>
              <li>Promedio: {qrResult.stats.average}</li>
              <li>Suma total: {qrResult.stats.sum}</li>
              <li>
                ¿Diagonal? Q: {String(qrResult.stats.diagonalCheck.q)}, R: {String(qrResult.stats.diagonalCheck.r)},
                alguna: {String(qrResult.stats.diagonalCheck.anyDiagonal)}
              </li>
            </ul>
          </div>
        </div>
      )}

      {rotateResult && (
        <div className="results">
          <MatrixTable title="Matriz rotada 90°" matrix={rotateResult.matrix} />
        </div>
      )}
    </div>
  );
}
