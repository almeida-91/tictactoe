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
        game.style.visibility = 'visible';
        gameFlow.playturn();
    },

    render : function renderGame(item){     //renders the game board according to the array
        let square = document.createElement(`div`);
        square.className = 'whitespace';
        if (item == 'x'){
             square.textContent = 'X';
             square.style.color = 'blue';
        }
        else if (item == 'o'){
            square.textContent = 'O';
            square.style.color = 'red';
        }
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

    addPlayspace : function (item, index, array) { // turns each whitespace into playable space
        array[index].addEventListener('click', function() {
            if (gameBoardObj.gameBoard[index] == null ) gameBoardObj.gameBoard[index] = 'x';
            else {
                player2.addPlayspace(item, index, array);
                gameFlow.turn = 'player1';
            };
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

    addPlayspace : function (item, index, array) { // turns each whitespace into playable space
        array[index].addEventListener('click', function() {
            if (gameBoardObj.gameBoard[index] == null ) gameBoardObj.gameBoard[index] = 'o';
            else {
                player2.addPlayspace(item, index, array);
                gameFlow.turn = 'player2';
            };
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
            gameFlow.checkwin();
            this.turn = 'player2';
        } else if (this.turn == 'player2'){
            player2.play();
            gameFlow.checkwin();
            this.turn = 'player1';
        };
    },

    checkwin : function(){
        console.log('success!');
        let i = 0;
        let array = gameBoardObj.gameBoard;
        console.log(array[i]==array[i+1] && array[i+1]==array[i+2]);
        for (i=0; i<array.length ; i++){
            if ((array[i] == array[i+1] && array[i]==array[i+2] && i%3 == 0 && array[i] !=null ) 
            || (array[i] == array[i+3] && array[i]== array[i+6] && array[i]!=null))
            {
                this.checkwinner(i);
            }
        }
        if (array[0] == array[4] && array[0] == array[8] && array[0] !=null) this.checkwinner(0);
        else if (array[2] == array[4] && array[2] == array[6] && array[2]!=null) this.checkwinner(2);
    },

    checkwinner : function(index){
        if (gameBoardObj.gameBoard[index] == 'x') alert (`Winner : ${player1.name}`);
        else if (gameBoardObj.gameBoard[index] == 'o') alert (`Winner : ${player2.name}`);
    },

};

startButton.addEventListener(`click`,gameBoardObj.start.bind(gameBoardObj)); //Add event listeners
resetButton.addEventListener(`click`,gameBoardObj.reset.bind(gameBoardObj)); //Bound to construct