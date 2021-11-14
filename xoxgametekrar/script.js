const playerTurn = document.getElementById("player");
let player = "X";
let gameActive = true;
let currentGame = ["", "", "", "", "", "", "", "", ""];
const playersTurn = () => `${player}'ın sırası`;

winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

playerTurn.innerHTML = playersTurn();

takeAndDraw = (a, b) => {
  a.innerHTML = player;
  currentGame[b] = player;
  console.log(currentGame);
};
changePlayer = () => {
  player === "X" ? (player = "O") : (player = "X");
  playerTurn.innerHTML = playersTurn();
};
gameCheck = () => {
  for (let i = 0; i <= 7; i++) {
    const win = winningConditions[i];
    const a = currentGame[win[0]];
    const b = currentGame[win[1]];
    const c = currentGame[win[2]];

    if (a !== "" && b !== "" && c !== "") {
      if (a === b && b === c) {
        console.log("kazanan belli oldu");
        playerTurn.style.color = "green";
        playerTurn.innerHTML = player + " Kazandı!";
        gameActive = false;
        return;
      }
    }

    const draw = currentGame.includes("");
    if (!draw) {
      console.log("Beraberlik gelmiştir");
      playerTurn.style.color = "rgba(92, 163, 196, 0.623)";
      playerTurn.innerHTML = "Beraberlik!";
      return;
    }
  }
  changePlayer();
};
handleClick = (event) => {
  const targetBlock = event.target;
  // console.log(targetBlock); //DİV'İN KENDİSİ
  const blockId = targetBlock.getAttribute("block-id");
  // console.log(blockId); //TIKLANAN BLOCK' UN BLOCK-ID ATTRİBUTESİ

  if (!gameActive || targetBlock.innerHTML !== "") {
    return;
  }

  takeAndDraw(targetBlock, blockId);
  gameCheck();
};

closeWindow = () => {
  document.querySelector(".container-splash").style.display = "none";
};

document
  .querySelectorAll(".block")
  .forEach((block) => block.addEventListener("click", handleClick));
