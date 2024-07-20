const socket = io();

let boxes = document.querySelectorAll(".box");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".hide");
let newBtn = document.getElementById("new-btn");
let resetBtn = document.getElementById("reset-Btn");

let turn0 = true;
let currentPlayer = "X"
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerText === "") {
            if (currentPlayer = "X") {
                box.innerText = "X";
                socket.emit('move', { boxIndex: [...boxes].indexOf(box), player: 'X' });
                currentPlayer = "O";
            } else if (currentPlayer = "O") {
                box.innerText = "O";
                socket.emit('move', { boxIndex: [...boxes].indexOf(box), player: 'O' });
                currentPlayer = "X";
            }
        }
        box.disabled = true;

        checkWinner();
    })
});

socket.on('move', (data) => {
    if (data.player === 'X') {
        boxes[data.boxIndex].innerText = 'X';
        currentPlayer = 'O';
    } else if (data.player === 'O') {
        boxes[data.boxIndex].innerText = 'O';
        currentPlayer = 'X';
    }
});

const checkWinner = () => {
    for (const pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                msgContainer.classList.remove("hide");
                msg.innerText = `Winner is ${pos1Val}`
                disableAllBoxes();
                return;
            }
        }
    }
}

const disableAllBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
}

const enableAllBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
}

const newGame = () => {
    turn0 = true;
    enableAllBoxes();
    msgContainer.classList.add("hide");
    msg.innerText = "";
}

newBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", newGame);

