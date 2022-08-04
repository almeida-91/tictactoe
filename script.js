const game = document.getElementById('game');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

const gameBoardObj = {
    gameBoard : [null,null,null,null,null,null,null,null,null],
    start : function startGame() {
        while (game.firstChild){
            game.removeChild(game.firstChild);
        };
        this.gameBoard.forEach(this.render);
        player1.play;
    },
    render : function renderGame(item){     //renders the game board according to the array
        let square = document.createElement(`div`);
        square.className = 'whitespace';
        if (item == 'x') square.textContent = 'X';
        else if (item == 'o') square.textContent = 'O';
        game.appendChild(square);
    },
    reset : function resetGame(){
        square = document.getElementsByClassName('whitespace');
        while (game.firstChild){
            game.removeChild(game.firstChild);
        }
        this.gameBoard.forEach(this.restart);
        this.gameBoard.forEach(this.render);
    },
    
    restart : (_item, index, array) => {
        array[index] = null;
        gameBoardObj.start;
    },
};

const player1 = {
    name : 'Player',
    play : function player1Play() {
        let board = document.getElementsByClassName('whitespace');
        board[0].textContent = 'X';
        board.forEach(this.addPlayspace);
    },

    addPlayspace : function (item, index, array) { // turns each whitespace into playable space
        array[index].addEventListener('click', function () {
            gameBoardObj.gameBoard[index] = 'x';
            gameBoardObj.start;
        });
    },

    turn : true,
};

const player2 = {
    name: 'CPU',
};

const gameFlow = {
/*     winstate : 0,
    while (winstate = 0){

    } */
};

startButton.addEventListener(`click`,gameBoardObj.start.bind(gameBoardObj)); //Add event listeners
resetButton.addEventListener(`click`,gameBoardObj.reset.bind(gameBoardObj)); //Bound to construct