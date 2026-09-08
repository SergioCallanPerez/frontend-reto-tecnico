import type { Matrix } from './types';

export function MatrixTable({ title, matrix }: { title: string; matrix: Matrix }) {
  return (
    <div className="matrix-block">
      <h3>{title}</h3>
      <table>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((value, j) => (
                <td key={j}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
