const { createApp } = Vue;

const app = createApp({
    data() {
        return {
        }
    },
});

app.component('Board', {
    data() {
        return {
            boardCells: [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ],
            currentPlayer: "X",
            message: "Let's Play!"
        }
    },
    template: `<div class="grid grid-cols-3 bg-blue-200 p-8 rounded-xl">
            <div v-for="(row, rowIndex) in boardCells" :key="rowIndex">
                <div v-for="(cell, colIndex) in row" :key="colIndex" @click="cellClicked(rowIndex, colIndex)"
                    class="flex items-center justify-center m-2 w-24 h-24 bg-gray-200 rounded-xl shadow-md text-4xl font-bold cursor-pointer"
                    :class="{
               'text-pink-600': cell==='X',
               'text-blue-600': cell==='O'
             }">
                    {{ cell }}
                </div>
            </div>
        </div>
         <h1 class="text-3xl font-semibold mt-5 text-black">{{ message }}</h1>`,
    methods: {
        cellClicked(row, col) {
            if (this.boardCells[row][col] === "") {
                this.boardCells[row][col] = this.currentPlayer;

                if (this.isWinner(this.currentPlayer)) {
                    this.message = `Player ${this.currentPlayer} wins!`;
                    setTimeout(this.resetTheGame, 1500);
                } else {
                    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
                    this.message = `Player ${this.currentPlayer}'s turn`;
                }
            }
        },
        isWinner(player) {
            const b = this.boardCells;
            // rows & cols
            for (let i = 0; i < 3; i++) {
                if (b[i][0] === player && b[i][1] === player && b[i][2] === player) return true;
                if (b[0][i] === player && b[1][i] === player && b[2][i] === player) return true;
            }
            // diagonals
            if (b[0][0] === player && b[1][1] === player && b[2][2] === player) return true;
            if (b[0][2] === player && b[1][1] === player && b[2][0] === player) return true;
            return false;
        },
        resetTheGame() {
            this.boardCells = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ];
            this.currentPlayer = "X";
            this.message = "Let's Play!";
        }
    }
});

app.mount("#app");