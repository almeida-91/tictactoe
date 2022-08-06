const game = document.getElementById('game');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const winnerPanel = document.getElementById('winnerPanel');
const restartButton = document.getElementById('restartGame');
const difficulty = document.getElementById('diff');

const gameBoardObj = {

    gameBoard : [0,1,2,3,4,5,6,7,8],
    cpuMark : 'o',
    playerMark : 'x',

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
        player1.play();
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
        player1.play();
    },
    
    restart : (_item, index, array) => {
        gameBoardObj.gameBoard[index] = index;
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
            if (typeof(gameBoardObj.gameBoard[index]) == 'number' ){
                gameBoardObj.gameBoard[index] = 'x';
                gameFlow.turn = 'player2';
                player2.play();
            } else {
                gameFlow.turn = 'player1';
                player1.addPlayspace(item, index, array);
            };
            gameBoardObj.start();
            if(gameFlow.checkwin(gameBoardObj.gameBoard)!= null) gameFlow.displayVictor(gameFlow.checkwin(gameBoardObj.gameBoard));
        });
    },

};

const player2 = {

    name: 'CPU',

    play : function player2Play() {
        let board = gameBoardObj.gameBoard;
        if ( gameFlow.checkwin(gameBoardObj.gameBoard) != null) return 0;
        if (difficulty.value == 'unbeatable'){
            i = player2.findBestMove(board);
            gameBoardObj.gameBoard[i] = 'o';
            gameFlow.turn = 'player1';
            player1.play();
        }
        else {
            let i = (Math.random()*8).toFixed(0);
            if (typeof(gameBoardObj.gameBoard[i]) == 'number'){
                gameBoardObj.gameBoard[i] = 'o';
                gameFlow.turn = 'player1';
            }
            else player2.play();
        }
        gameBoardObj.start();
        if(gameFlow.checkwin(gameBoardObj.gameBoard)!= null) gameFlow.displayVictor(gameFlow.checkwin(gameBoardObj.gameBoard));
        return 0;  
    },

    findBestMove : function(currentBoard){
        let i = 0;
        let bestScore = -Infinity;
        let bestMove;
        for ( let i=0;i<currentBoard.length;i++){
            if (typeof(currentBoard[i])=='number'){
                currentBoard[i] = 'o';
                let score = this.miniMax(currentBoard,0,false);
                currentBoard[i] = i;
                if (score>bestScore){
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    },

    miniMax : function(board, depth, maxingPlayer){
        let score = 0;
        let i = 0;
        if (gameFlow.checkwin(board)!= null){
            if (gameFlow.checkwin(board)==10) score = 0;
            else if (board[gameFlow.checkwin(board)]=='x') score = -10 + depth ;
            else if (board[gameFlow.checkwin(board)]=='o') score = 10 - depth;
            return score;
        }

        if (maxingPlayer==true){
            let bestScore = -Infinity;
            for (let i=0;i<board.length;i++){
                if (typeof(board[i])=='number'){
                    board[i] = 'o';
                    score = this.miniMax(board, depth+1,false);
                    board[i] = i;
                    if (score > bestScore) bestScore=score;
                }
            }
            return bestScore;
        } else {
            let bestScore = +Infinity;
            for (let i=0;i<board.length;i++){
                if (typeof(board[i])=='number'){
                    board[i] = 'x';
                    score = this.miniMax(board, depth+1,true);
                    board[i] = i;
                    if (score < bestScore) bestScore=score;
                }
            }
            return bestScore;
        } 
    },
}


const gameFlow = {
    turn : 'player1',

    checkwin : function(gameBoard){
        let array = gameBoard.filter((item)=>typeof(item)=='number');
        let i = 0;
        for (i=0; i<gameBoard.length; i++){
            if ((gameBoard[i] == gameBoard[i+1] && gameBoard[i]==gameBoard[i+2] && i%3 == 0 && gameBoard[i] !=i && (gameBoard[i]!=null)) 
            || (gameBoard[i] == gameBoard[i+3] && gameBoard[i]== gameBoard[i+6] && gameBoard[i]!=i)&& (gameBoard[i]!=null)){
                return i;
            }
        }
        if (gameBoard[0] == gameBoard[4] && gameBoard[0] == gameBoard[8] && gameBoard[0] !=0 && (gameBoard[0]!=null)){
            return 0;
        }
        else if (gameBoard[2] == gameBoard[4] && gameBoard[2] == gameBoard[6] && gameBoard[2]!=2 && (gameBoard[2]!=null)){
            return 2;
        }
        if (array.length == 0){
            this.displayVictor(null);
            return 10;
        }
        return null;
    },

    displayVictor: function(index){
        let j=0;
        for (j=0;j<gameBoardObj.gameBoard.length;j++){
            if(typeof(gameBoardObj.gameBoard[j])=='number') gameBoardObj.gameBoard[j] = null;
        }
        if (gameBoardObj.gameBoard[index] == 'x'){
            winnerPanel.textContent = 'You Win!';
            winnerPanel.style.color = 'blue';
            winnerPanel.style.visibility='visible';
            gameFlow.turn = null;
            return -1;
        } else if (gameBoardObj.gameBoard[index] == 'o') {
            winnerPanel.textContent = 'CPU Wins!';
            winnerPanel.style.color = 'red';
            winnerPanel.style.visibility='visible';
            gameFlow.turn = null;
            return 1;

        } else if (index==null){
            winnerPanel.textContent = `It's a Draw!`
            winnerPanel.style.color = 'yellow';
            winnerPanel.style.visibility = 'visible';
            gameFlow.turn = null;
            return 0;
        }
        return 0;
    },
}


startButton.addEventListener(`click`,gameBoardObj.start.bind(gameBoardObj))
resetButton.addEventListener(`click`,gameBoardObj.reset.bind(gameBoardObj)); //Bound to construct