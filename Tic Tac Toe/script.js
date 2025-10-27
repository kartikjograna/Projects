const cells = document.querySelectorAll('.cell')
const statusText = document.querySelector('.status')
const reset = document.querySelector('.reset')

let currentPlayer = 'X'
let board = ["", "", "", "", "", "", "", "", ""]
let gameActive = true;

const winPos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]

function handleClick(e) {
    const index = e.target.dataset.index;
    if(board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer
    e.target.textContent = currentPlayer;

    checkWinner()
}

function checkWinner(){
    let win = false

    for(let pattarn of winPos){
        const [a, b, c] = pattarn
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            win = true
            break
        }
    }
    
    if(win){
        statusText.innerHTML = `🎉 Player ${currentPlayer} Wins!`
        gameActive = false
        return
    }

    if(!board.includes("")){
        statusText.innerHTML = "🤝 It's a Draw!"
        gameActive = false
        return
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    statusText.innerHTML = `Player ${currentPlayer}'s turn`
}

function resetBtn(){
    board = ["", "", "", "", "", "", "", "", ""]
    gameActive = true;
    currentPlayer = 'X'
    statusText.innerHTML = "Player X's turn"
    cells.forEach(cell => cell.textContent = "")
}

cells.forEach(cell => cell.addEventListener('click', handleClick))
reset.addEventListener('click', resetBtn)