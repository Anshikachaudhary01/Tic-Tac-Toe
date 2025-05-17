let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; 
let count = 0; 

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const clickSound = new Audio('button-click.wav');
const winSound = new Audio('winner.wav');
const clickNewGameSound = new Audio('newgame.wav');
const drawSound = new Audio('drawgame.wav');
const resetSound = new Audio('resetgame.wav');


newGameBtn.addEventListener("click", () => {
  clickNewGameSound.play();
  resetGame();
});

resetBtn.addEventListener("click", () => {
    resetSound.play().catch(err => console.log("Audio play error:", err));
    resetGame();
});

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; 

        clickSound.play();

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (isWinner) return; 

        if (count === 9) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
   drawSound.play();
};

const disableBoxes = () => {
for(let box of boxes) {
    box.disabled = true;
}
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    winSound.play();
};


const checkWinner = () => {
    for (let pattern of winPatterns){
       let pos1Val = boxes[pattern[0]].innerText;
       let pos2Val = boxes[pattern[1]].innerText; 
       let pos3Val = boxes[pattern[2]].innerText;

       if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
        if(pos1Val === pos2Val && pos2Val === pos3Val){
            showWinner(pos1Val);
            return true;
        }
       }
    }
    return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

