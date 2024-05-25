window.onload = function () {
  app.init();
};

class App {
  winningVariants = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  currentPlayer = "X";

  init() {
    document
      .querySelectorAll(".cell")
      .forEach(cell => cell.addEventListener("click", this.cellClick));

    document
      .getElementById("restart-game")
      .addEventListener("click", () => this.restartGame());
  }
  cellClick = (e) => {
    //console.log(e.target);
    this.playerTurn(e.target)
  };

  initGame() {
    this.currentPlayer = "X";

    document.querySelectorAll(".cell").forEach(el => {
      el.innerHTML = "";
    });
  }
  playerTurn(el) {
    if (el.innerHTML == "X" || el.innerHTML == "O") return;
    el.innerHTML = this.currentPlayer;

    this.currentPlayer = this.currentPlayer == "X" ? "O" : "X";

    this.checkWinner();
  }
  checkWinner() {
    for (let i = 0; i < this.winningVariants.length; i++) {
      const variant = this.winningVariants[i];
      const marker1 = this.getCellValue(variant[0]);
      const marker2 = this.getCellValue(variant[1]);
      const marker3 = this.getCellValue(variant[2]);

      if (marker1 == "" || marker2 == "" || marker3 == "") continue;

      if (marker1 == marker2 && marker2 == marker3) {
        console.log("Zwycięzca: " + marker1);
        this.setWinner(" - zwyciężył: " + marker1);
        this.restartGame();
      }
    }
  }

  setWinner(str) {
    document.getElementById("winner").innerHTML = str;
  }

  restartGame() {
    this.initGame();
  }

  getCellValue(index) {
    return document.querySelector(`.cell[data-index='${index}']`).innerHTML;
  }
}

const app = new App();
