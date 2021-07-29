export default class GameView {
    constructor(root){
        this.root = root;

        this.root.querySelectorAll(".board__tile").forEach(tile => {
            tile.addEventListener("click", ()=>{
                    this.onTileClick(tile.dataset.index);
            });
        });

        this.root.querySelector(".header__restart").addEventListener("click", ()=>{
                this.onRestartClick();
        });
    }

    update(game){
        this.updateTurn(game);
        this.updateStatus(game);
        this.updateBoard(game);
    }

    updateTurn(game){
        this.root.querySelector(".header__turn").textContent = `${game.turn}'s turn`;
    }

    updateStatus(game) {
        let status = "In Progress";

        if (game.findWinningCombination()) {
            status = `${game.turn} is the Winner!`;
        } else if (!game.isInProgress()) {
            status = "It's a tie!";
        }

        this.root.querySelector(".header__status").textContent = status;
    }

    updateBoard(game) {
        const winningCombination = game.findWinningCombination();

        for (let i = 0; i < game.board.length; i++) {
            const tile = this.root.querySelector(`.board__tile[data-index="${i}"]`);

            tile.classList.remove("board__tile--winner");
            tile.textContent = game.board[i];

            if (winningCombination && winningCombination.includes(i)) {
                tile.classList.add("board__tile--winner");
            }
        }
    }
}