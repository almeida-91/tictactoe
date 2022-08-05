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
        gameFlow.playturn();
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
        gameFlow.turn = 'player1';
        gameFlow.playturn();
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
        Array.from(board).forEach((item, index, array)=>{
            this.addPlayspace(item, index, array);
        });
        
    },

    addPlayspace : function (_item, index, array) { // turns each whitespace into playable space
        array[index].addEventListener('click', function() {
            gameBoardObj.gameBoard[index] = 'x';
            console.log('success');
            gameBoardObj.start();
        });
    },

};

const player2 = {
    name: 'CPU',
    play : function player1Play() {
        let board = document.getElementsByClassName('whitespace');
        Array.from(board).forEach((item, index, array)=>{
            this.addPlayspace(item, index, array);
        });
        
    },

    addPlayspace : function (_item, index, array) { // turns each whitespace into playable space
        array[index].addEventListener('click', function() {
            gameBoardObj.gameBoard[index] = 'o';
            gameBoardObj.start();
        });
    },

};

const gameFlow = {
/*     winstate : 0,
    while (winstate = 0){

    } */
    turn : 'player1',
    playturn : function(){
        if (this.turn == 'player1'){ 
            player1.play();
            this.turn = 'player2';
        } else if (this.turn == 'player2'){
            player2.play();
            this.turn = 'player1';
        };

    },
    checkwin : function(){

    },

};

startButton.addEventListener(`click`,gameBoardObj.start.bind(gameBoardObj)); //Add event listeners
resetButton.addEventListener(`click`,gameBoardObj.reset.bind(gameBoardObj)); //Bound to construct