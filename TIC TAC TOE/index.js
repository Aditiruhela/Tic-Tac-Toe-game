let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGame=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnO=true;
const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6] 
];
    const resetGame=()=>{
        turnO=true;
        enableBoxes();
        msgContainer.classList.add("hide");
        winnerLine.classList.add("hide");
    }
boxes.forEach(box=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="♥";
            turnO=false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        checkWinner();
    });
});
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";   
    }
};
const showWinner=(winner)=>{
    msg.innerText="Congrats! Winner is "+ winner;
    msgContainer.classList.remove("hide");
};
const winnerLine=document.querySelector("#winnerLine");
const lineStyles={
  "0,1,2":{ top: "16%", left: "0%", rotate: "0deg" },
  "3,4,5":{ top: "50%", left: "0%", rotate: "0deg" },
  "6,7,8":{ top: "84%", left: "0%", rotate: "0deg" },

  "0,3,6":{ top: "50%", left: "16%", rotate: "90deg" },
  "1,4,7":{ top: "50%", left: "50%", rotate: "90deg" },
  "2,5,8":{ top: "50%", left: "84%", rotate: "90deg" },

  "0,4,8":{ top: "50%", left: "50%", rotate: "45deg" },
  "2,4,6":{ top: "50%", left: "50%", rotate: "-45deg" }
};
const drawLine=(pattern)=>{
    winnerLine.classList.remove("hide");
    const key=pattern.join(",");
    const style=lineStyles[key];
    winnerLine.style.top=style.top;
    winnerLine.style.left=style.left;
    winnerLine.style.transform=`rotate(${style.rotate})`;
};
const checkWinner=()=>{
    let winnerFound=false;
        for(let pattern of winPatterns) {
            let pos1Val=boxes[pattern[0]].innerText;
            let pos2Val=boxes[pattern[1]].innerText;
            let pos3Val=boxes[pattern[2]].innerText;
            if(pos1Val!=""&& pos2Val!="" && pos3Val!=""){
                if(pos1Val===pos2Val && pos2Val===pos3Val){
                    winnerFound=true;
                    showWinner(pos1Val);
                    drawLine(pattern);
                    disableBoxes();
                    return;
                }  
            }
        }
        let isDraw=true;
        for(let box of boxes){
           if(box.innerText===""){
           isDraw=false;
           break;
           }
        }
    if(!winnerFound && isDraw){
        msg.innerText="It's a Draw!";
        msgContainer.classList.remove("hide");
    }
};

resetBtn.addEventListener("click",resetGame);
newGame.addEventListener("click",()=>{
    resetGame();
});