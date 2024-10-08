let saveScore = JSON.parse(localStorage.getItem('Score')) || {
  Win:0,
  Loss:0,
  Ties:0
};
const resultElement = document.querySelector('.js-result');
const movesElement = document.querySelector('.js-moves');
const scoreElement = document.querySelector('.js-score');

function updateScoreElement(){
  scoreElement.innerHTML = `Wins: ${saveScore.Win}, Losses: ${saveScore.Loss},Ties: ${saveScore.Ties}`;
}


updateScoreElement();

let isAutoPlaying = false;
let autoPlayingId;

function autoPlay(){
  if(!isAutoPlaying){
    autoPlayingId = setInterval(() => {
      const playerMove = pickComputerMove();
      whoWon(playerMove);
    },1000);
    isAutoPlaying = true;

  }
  else{
    clearInterval(autoPlayingId);
    isAutoPlaying = false;
  }

}

document.querySelector('.js-rock-button').addEventListener('click',() => {
  whoWon('Rock')
})

document.querySelector('.js-scissors-button').addEventListener('click',() => {
  whoWon('Scissors')
})

document.querySelector('.js-paper-button').addEventListener('click',() => {
  whoWon('Paper')
})

document.body.addEventListener('keydown',(event) =>{
  if(event.key === 'r'){
    whoWon('Rock');
  }
  else if(event.key === 'p'){
    whoWon('Paper');
  }
  else if(event.key === 's'){
    whoWon('Scissors');
  }
})

function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';


  if(randomNumber >=0 && randomNumber < 0.33){
    computerMove ='Rock';
  }
  else if(randomNumber >= 0.33 && randomNumber < 0.66)
  {
    computerMove = 'Paper';
  }
  else
  {
    computerMove = 'Scissors';
  }
  return computerMove;
}

 function whoWon(manChoice){
  
  let result = '';
  const computerMove = pickComputerMove();

  if (computerMove === manChoice)
  result = 'Tie';
  else{
    if(manChoice=== "Rock" && computerMove === "Paper"){
      result = 'You Lose';
    }

    else if(manChoice === "Rock" && computerMove === "Scissors"){
      result = 'You Win';

    }

    else if(manChoice=== "Paper" && computerMove === "Scissors"){
      result = 'You Lose';

    }

    else if(manChoice === "Paper" && computerMove === "Rock"){
      result = 'You Win';

    }

    else if(manChoice=== "Scissors" && computerMove === "Rock"){
      result = 'You Lose';

    }

    else if(manChoice === "Scissors" && computerMove === "Paper"){
      result = 'You Win';
    }

  }

  if(result === 'You Win'){
    saveScore.Win++;
  }
  else if(result == 'You Lose'){
    saveScore.Loss++;
  }
  else{
    saveScore.Ties++;
  }
  resultElement.innerHTML = `${result}`;
  //movesElement.innerHTML = `You ${manChoice} - ${computerMove} Computer`;
  movesElement.innerHTML = `You <img src="Photos/${manChoice}-emoji.png" class="img"> <img src="Photos/${computerMove}-emoji.png" class="img"> Computer`;
  /*alert(`You pick ${manChoice}. Computer picked ${computerMove}. ${result}.\nWins: ${saveScore.Win}, Losses: ${saveScore.Loss},Ties: ${saveScore.Ties}` );*/
  updateScoreElement();
  localStorage.setItem('Score',JSON.stringify(saveScore));


}