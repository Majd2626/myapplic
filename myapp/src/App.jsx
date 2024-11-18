import React, { useState } from 'react';

// Initial Sudoku grid setup where -1 indicates an empty cell
const initial = [
  [-1, 5, -1, 9, -1, -1, -1, -1, -1],
  [8, -1, -1, -1, 4, -1, 3, -1, 7],
  [-1, -1, -1, 2, 8, -1, 1, 9, -1],
  [5, 3, 8, 6, -1, 7, 9, 4, -1],
  [-1, 2, -1, 3, -1, 1, -1, -1, -1], 
  [1, -1, 9, 8, -1, 4, 6, 2, 3],
  [9, -1, 7, 4, -1, -1, -1, -1, -1],
  [-1, 4, 5, -1, -1, -1, 2, -1, 9],
  [-1, -1, -1, -1, 3, -1, -1, 7, -1]
];

function Page() {
  // State to hold the Sudoku grid values
  const [sudokuArr, setSudokuArr] = useState(initial);

  // Function to create a deep copy of the Sudoku grid to avoid direct mutation
  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  // Function to handle changes in cell values, ensuring only valid numbers are entered
  function onInputChange(e, row, col) {
    const val = parseInt(e.target.value) || -1; // Convert input to integer or set to -1 if invalid
    const grid = getDeepCopy(sudokuArr);

    // Ensure the input value is either between 1 and 9 or -1 (for empty cells)
    if (val === -1 || (val >= 1 && val <= 9)) {
      grid[row][col] = val;
      setSudokuArr(grid); // Update the Sudoku grid in state
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h3>Sudoku Solver</h3>
        <table>
          <tbody>
            {/* Render each row of the Sudoku grid */}
            {sudokuArr.map((row, rIndex) => (
              <tr key={rIndex}>
                {/* Render each cell in the row */}
                {row.map((value, cIndex) => {
                  // Dynamically assign borders to cells for visual clarity
                  const topBorder = rIndex % 3 === 0 ? 'border-top' : '';
                  const leftBorder = cIndex % 3 === 0 ? 'border-left' : '';
                  const bottomBorder = rIndex === 8 ? 'border-bottom' : '';
                  const rightBorder = cIndex === 8 ? 'border-right' : '';

                  const cellClasses = `cellInput ${topBorder} ${leftBorder} ${bottomBorder} ${rightBorder}`;

                  return (
                    <td key={cIndex}>
                      <input
                        onChange={(e) => onInputChange(e, rIndex, cIndex)} // Handle user input
                        value={value === -1 ? '' : value} // Display value or empty string if -1
                        className={cellClasses} // Apply dynamic cell borders
                        disabled={initial[rIndex][cIndex] !== -1} // Disable input for pre-filled cells
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="buttonContainer">
          {/* Action buttons to check, solve, or reset the game */}
          <button className="checkButton">Check</button>
          <button className="solveButton">Solve</button>
          <button className="resetButton">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default Page;
