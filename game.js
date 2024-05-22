document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const cells = Array(9).fill(null);
    let currentPlayer = '○';
    const moves = { '○': [], '✕': [] };

    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (cells[index] === null) {
            if (moves[currentPlayer].length === 3) {
                const oldMoveIndex = moves[currentPlayer][0];
                document.querySelector(`.cell[data-index='${oldMoveIndex}']`).classList.remove('next-to-clear');
            }

            event.target.textContent = currentPlayer;
            cells[index] = currentPlayer;
            moves[currentPlayer].push(index);

            if (moves[currentPlayer].length > 3) {
                const oldMoveIndex = moves[currentPlayer].shift();
                cells[oldMoveIndex] = null;
                document.querySelector(`.cell[data-index='${oldMoveIndex}']`).textContent = '';
            }

            if (moves[currentPlayer].length === 3) {
                const nextToClearIndex = moves[currentPlayer][0];
                document.querySelector(`.cell[data-index='${nextToClearIndex}']`).classList.add('next-to-clear');
            }

            if (checkWin(currentPlayer)) {
                alert(`${currentPlayer}の勝ち！`);
                resetGame();
            } else if (cells.every(cell => cell !== null)) {
                alert('引き分け！');
                resetGame();
            }
            currentPlayer = currentPlayer === '○' ? '✕' : '○';
        }
    }

    function checkWin(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern => pattern.every(index => cells[index] === player));
    }

    function resetGame() {
        cells.fill(null);
        moves['○'] = [];
        moves['✕'] = [];
        currentPlayer = '○';
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('next-to-clear');
        });
    }

    createBoard();
});