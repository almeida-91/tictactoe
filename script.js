const game = document.getElementById('game');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const winnerPanel = document.getElementById('winnerPanel');
const restartButton = document.getElementById('restartGame');

const gameBoardObj = {

    gameBoard : [null,null,null,null,null,null,null,null,null],

    start : function startGame() {
        while (game.firstChild){
            game.removeChild(game.firstChild);
        };
        this.gameBoard.forEach(this.render);
        if (winnerPanel.style.visibility == 'hidden')
            winnerPanel.style.visibility = 'visible';
        else winnerPanel.style.visibility = 'hidden';
            winnerPanel.style.visibility = 'hidden';
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
        winnerPanel.style.visibility = 'hidden';
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
            if (gameBoardObj.gameBoard[index] == null ){
                gameBoardObj.gameBoard[index] = 'x';
                gameFlow.turn = 'player2';
                
            } else {
                gameFlow.turn = 'player1';
                player1.addPlayspace(item, index, array);
            };
            gameBoardObj.start();
            gameFlow.checkdraw();
            gameFlow.checkwin();
        });
    },

};

const player2 = {

    name: 'CPU',

    play : function player2Play() {
        if ( gameFlow.checkwin() == 1 || gameFlow.checkdraw()==1) return 0;
        let i = (Math.random()*8).toFixed(0);
        if (gameBoardObj.gameBoard[i] == null && gameBoardObj.gameBoard[i] != 1){
            gameBoardObj.gameBoard[i] = 'o';
            gameFlow.turn = 'player1';
            gameBoardObj.start();
            gameFlow.checkdraw();
            gameFlow.checkwin();
        }
        else player2.play();

        gameBoardObj.start();
        return 0;  
    },
}


const gameFlow = {
    turn : 'player1',

    playturn : function(){
        if (this.turn == 'player1'){ 
            player1.play();
            gameFlow.checkwin();
            this.checkdraw();
            
        } else if (this.turn == 'player2'){
            player2.play();
            gameFlow.checkwin();
            this.checkdraw();
        };
    },

    checkwin : function(){
        let i = 0;
        let array = gameBoardObj.gameBoard;
        for (i=0; i<array.length ; i++){
            if ((array[i] == array[i+1] && array[i]==array[i+2] && i%3 == 0 && array[i] !=null ) 
            || (array[i] == array[i+3] && array[i]== array[i+6] && array[i]!=null))
            {
                this.checkwinner(i);
                return 1;
            }
        }
        if (array[0] == array[4] && array[0] == array[8] && array[0] !=null){
             this.checkwinner(0);
             return 1;
        }
        else if (array[2] == array[4] && array[2] == array[6] && array[2]!=null){
            this.checkwinner(2);
            return 1;
        }
        return 0;
    },

    checkdraw : function (){
        let i = gameBoardObj.gameBoard.some((element)=> element == null);
        if (i==false && gameFlow.checkwin() == 0){
            winnerPanel.textContent = `It's a Draw!`
            winnerPanel.style.color = 'yellow';
            winnerPanel.style.visibility = 'visible';
            gameFlow.turn = null;
            return 1;
        }
    },

    checkwinner : function(index){
        if (gameBoardObj.gameBoard[index] == 'x'){
            winnerPanel.textContent = 'You Win!';
            winnerPanel.style.color = 'blue';
            winnerPanel.style.visibility='visible';
            gameFlow.turn = null;
            gameBoardObj.gameBoard.forEach((item,index)=>{
                if (gameBoardObj.gameBoard[index] == null) gameBoardObj.gameBoard[index] = 1;
                return 1;
            });
            
        } else if (gameBoardObj.gameBoard[index] == 'o') {
            winnerPanel.textContent = 'CPU Wins!';
            winnerPanel.style.color = 'red';
            winnerPanel.style.visibility='visible';
            gameFlow.turn = null;
            gameBoardObj.gameBoard.forEach((item, index)=>{
                if (gameBoardObj.gameBoard[index] == null) gameBoardObj.gameBoard[index] = 1;
                return 1;
            });
        }
        return 0;
    },

};


startButton.addEventListener(`click`,gameBoardObj.start.bind(gameBoardObj)); //Add event listeners
resetButton.addEventListener(`click`,gameBoardObj.reset.bind(gameBoardObj)); //Bound to construct