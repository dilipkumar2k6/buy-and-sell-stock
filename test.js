const nums = ['1','2','3','4','5','6','7','8','9'];
const optionsBasedOnRow = (board, m, n, i, j) => {
    const set = new Set(nums);
    for(let k=0; k < m; k++) {
        const cell = board[i][k];
        if(cell !== '.') {
            set.delete(cell);
        }
    }
    return Array.from(set);
}
const optionsBasedOnColumn = (board, m, n, i, j) => {
    const set = new Set(nums);
    for(let k=0; k < m; k++) {
        const cell = board[k][j];
        if(cell !== '.') {
            set.delete(cell);
        }
    }
    return Array.from(set);
}
const optionsBasedOnSubBox = (board, m, n, i, j) => {
    const set = new Set(nums);
    const x = Math.floor(i/3);
    const y = Math.floor(j/3);
    for (let k= 3*x; k < 3*(x+1); k++) {
        for (let l = 3 * y; l < 3 * (y + 1); l++) {
            const cell = board[k][l];
            if(cell !== '.') {
                set.delete(cell);
            }
        }
    }
    return Array.from(set);
}
const compare = (a, b ) => parseInt(a, 10) - parseInt(b, 10);
const possibleOptions = (board, m, n, i, j) => {
    if(board[i][j] !== '.') {
        return [];
    }
    const rowOption = optionsBasedOnRow(board, m, n, i, j);
    const colOption = optionsBasedOnColumn(board, m, n, i, j);
    const boxOption = optionsBasedOnSubBox(board, m, n, i, j);

    // sort each
    rowOption.sort(compare);
    colOption.sort(compare);
    boxOption.sort(compare);
    
    // Get intersection among all options
    let x = 0;
    let y = 0;
    let z = 0;
    const options = [];
    while(x < rowOption.length && y < colOption.length && z < boxOption.length) {
        const row = parseInt(rowOption[x], 10);
        const col = parseInt(colOption[y], 10);
        const box = parseInt(boxOption[z], 10);
        if(row === col && col ===box) {
            options.push(rowOption[x]);
            x++;
            y++;
            z++;
        } else if (row <= col && col <= box) {
            x++;
        } else if (col<= row && row <= box) {
            y++;
        } else {
            z++
        }
    }
    console.log({board, i, j, rowOption, colOption, boxOption, options})
    return options;
}
const gameCompleted = (board, m, n) => {
   for(let i=0; i < m; i++) {
       for (let j=0; j < n; j++) {
           if(board[i][j] === '.') {
               return false;
           }
       }
   } 
    return true;
}
var solveSudokuRecur = function(board, m, n, k, l) {
    for (let i=k; i < m; i++) {
        for (let j=l; j < n; j++) {
            const temp = board[i][j] ;
            // if not empty cell then continue
            if(temp !== '.') {
                continue;
            }
            const options = possibleOptions(board, m, n, i, j);
            // if empty cell and no option found
            if( options.length === 0) {
                return false; // soln not possible so no need to move next
            }
            for (const opt of options) {
                board[i][j] = opt; // try current option

                const result = solveSudokuRecur(board, m, n, i, j);
                // if found ans then break
                if(result) {
                    console.log('found answer ', board)
                    return true;
                }
            }
            // if not found then roll back
            board[i][j] =  temp;   
            
        }
    }
    // check if sudoku game is completed    
    return gameCompleted(board, m, n);
};
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    const m = board.length;
    const n = board[0].length;
    solveSudokuRecur(board, m, n, 0, 0);
};
const board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]];
solveSudoku(board);
console.log(board);