const strikeButton = document.getElementById("strike");
const resetButton = document.getElementById("reset");

const strikeAudio = new Audio("http://bit.ly/so-ball-hit");
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");

const possibleOutcomes = [0, 1, 2, 3, 4, 5, 6, "W"];

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));


let turn = 1;
let scoreData = [
    {
        score: 0,
        wicket: 0,
        balls: 0,
    },
    {
        score: 0,
        wicket: 0,
        balls: 0,
    },
];

strikeButton.onclick = () => {
    if(turn!==1&&turn!==2){
        return
    }
    strikeAudio.pause();
    strikeAudio.currentTime = 0;
    strikeAudio.play();
    let outcome =
        possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)];
    scoreData[turn - 1].balls++;

    if (outcome === "W") {
        scoreData[turn - 1].wicket++;
    } else {
        scoreData[turn - 1].score+=outcome;
    }
    document.querySelector(
        `#team${turn}-superover div:nth-child(${scoreData[turn - 1].balls})`
    ).textContent = outcome;
    document.getElementById(`score-team${turn}`).textContent =
        scoreData[turn - 1].score;
    document.getElementById(`wickets-team${turn}`).textContent =
        scoreData[turn - 1].wicket;

    if (scoreData[turn-1].wicket >= 2 || scoreData[turn-1].balls>=6) {
        if(turn===1){
            turn++;
        }
        else{
            turn++;
            endGame();
        }
    }
};

resetButton.onclick=()=>{
    window.location.reload();
}

async function endGame(){
    //waiting 1 second for the DOM ELements to be updated.
    // otherwise alert will block the DOM updation and 
    // show who won before score is rendered
    await sleep(100);
    gameOverAudio.play();
    if(scoreData[0].score>scoreData[1].score){
        alert("IND Wins the match!")
    }
    else if (scoreData[0].score < scoreData[1].score) {
        alert("PAK Wins the match!");
    }
    else{
        if(confirm("That's a tie! Want to play another Super Over?")){
            window.location.reload();
        }
    }
}
