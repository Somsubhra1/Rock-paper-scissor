var userScore = 0;
var computerScore = 0;
const userSmall = 'User'.fontsize('3').sub();
const compSmall = 'CPU'.fontsize('3').sub();

// var limit = parseInt(prompt('Please enter max points for which you wanna play. Default: 5', 5));
// if (!limit || limit === 0) {
  limit = 5;
// }

// Catching DOM elements

const userScore_span = document.getElementById("user-score");
const computer_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const replay_btn = document.getElementById('replay');
const userMoves_ul = document.querySelector("#userMoves > ul");
const computerMoves_ul = document.querySelector("#cpuMoves > ul");

// adding event listeners

rock_div.addEventListener("click", function() {
  game("r");
});
paper_div.addEventListener("click", function() {
  game("p");
});
scissors_div.addEventListener("click", function() {
  game("s");
});

replay_btn.addEventListener('click', reset);

// fetching computer choice

function getComputerChoice() {
  const choices = ["r", "p", "s"];
  var random = Math.floor(Math.random() * 3);
  return choices[random];
}

// checking user choice

function game(userChoice) {
  const computerChoice = getComputerChoice();
  
  switch (userChoice + computerChoice) {
    case "rs":
    case "pr":
    case "sp":
      wins(userChoice, computerChoice);
      break;

    case "rp":
    case "ps":
    case "sr":
      lose(userChoice, computerChoice);
      break;

    case "rr":
    case "pp":
    case "ss":
      draw(userChoice, computerChoice);
      break;

    default:
      break;
  }
}

// user win

function wins(userChoice, computerChoice) {
  userScore++;
  userScore_span.innerHTML = userScore;
  stackFill(userChoice, computerChoice, "u");
  result_p.innerHTML = `${convertLetters(userChoice)}${userSmall} beats ${convertLetters(computerChoice)}${compSmall} . You Win!! :D`
  document.getElementById(userChoice).style.borderColor = "#0f0";
  rock_div.style.pointerEvents = "none";
  paper_div.style.pointerEvents = 'none';
  scissors_div.style.pointerEvents = 'none';
  setTimeout(() => {
    document.getElementById(userChoice).style.borderColor = "#fff";
    rock_div.style.pointerEvents = "auto";
    paper_div.style.pointerEvents = 'auto';
    scissors_div.style.pointerEvents = 'auto';
    result_p.innerHTML = "Make Your Move!!";
    endCheck(userScore, computerScore);
  }, 900); 
}

// user lose

function lose(userChoice, computerChoice) {
  computerScore++;
  computer_span.innerHTML = computerScore;
  stackFill(userChoice, computerChoice, "c");
  result_p.innerHTML = `${convertLetters(computerChoice)}${compSmall} beats ${convertLetters(userChoice)}${userSmall} . You Lose!! :(`
  document.getElementById(userChoice).style.borderColor = "#f00";
  rock_div.style.pointerEvents = "none";
  paper_div.style.pointerEvents = "none";
  scissors_div.style.pointerEvents = "none";
  setTimeout(() => {
    document.getElementById(userChoice).style.borderColor = "#fff";
    rock_div.style.pointerEvents = "auto";
    paper_div.style.pointerEvents = 'auto';
    scissors_div.style.pointerEvents = 'auto';
    result_p.innerHTML = 'Make Your Move!!'
    endCheck(userScore, computerScore);
  }, 900); 
}

// user draw

function draw(userChoice, computerChoice) {
  result_p.innerHTML = `${convertLetters(computerChoice)}${compSmall} equals ${convertLetters(userChoice)}${userSmall} . It's a draw!! :|`;
  stackFill(userChoice, computerChoice);
  document.getElementById(userChoice).style.borderColor = "#8CA8A8";
  rock_div.style.pointerEvents = "none";
  paper_div.style.pointerEvents = "none";
  scissors_div.style.pointerEvents = "none";
  setTimeout(() => {
    document.getElementById(userChoice).style.borderColor = "#fff";
    rock_div.style.pointerEvents = "auto";
    paper_div.style.pointerEvents = 'auto';
    scissors_div.style.pointerEvents = 'auto';
    result_p.innerHTML = "Make Your Move!!";
  }, 900); 
}

function convertLetters(letter) {
  if (letter === "r") {
    return "Rock";
  } else if (letter === "p") {
    return "Paper";
  }
  return "Scissors";
}

function endCheck(userScore, computerScore) {
  
  if (userScore === limit) {
    result_p.innerHTML = `User wins the Game by ${userScore - computerScore} point(s) :D`;
    rock_div.style.pointerEvents = "none";
    paper_div.style.pointerEvents = "none";
    scissors_div.style.pointerEvents = "none";
    rock_div.style.filter = 'grayscale(100%)';
    paper_div.style.filter = 'grayscale(100%)';
    scissors_div.style.filter = 'grayscale(100%)';
    replay_btn.style.display = 'flex';
  }
  else if (computerScore === limit) {
    result_p.innerHTML = `CPU wins the Game by ${computerScore - userScore} point(s) :(`;
    rock_div.style.pointerEvents = "none";
    paper_div.style.pointerEvents = "none";
    scissors_div.style.pointerEvents = "none";
    rock_div.style.filter = "grayscale(100%)";
    paper_div.style.filter = "grayscale(100%)";
    scissors_div.style.filter = "grayscale(100%)";
    replay_btn.style.display = "flex";    
  }
}

function reset() {
  userScore = 0;
  computerScore = 0;
  userScore_span.innerHTML = userScore;
  computer_span.innerHTML = computerScore;
  result_p.innerHTML = `Make your Move!!`;
  rock_div.style.pointerEvents = "auto";
  paper_div.style.pointerEvents = "auto";
  scissors_div.style.pointerEvents = "auto";
  rock_div.style.filter = "grayscale(0%)";
  paper_div.style.filter = "grayscale(0%)";
  scissors_div.style.filter = "grayscale(0%)";
  replay_btn.style.display = "none";  
  userMoves_ul.innerHTML = "";
  computerMoves_ul.innerHTML = "";
}

function stackFill(userChoice, computerChoice, winner) {
  if (winner === "u") {
    userMoves_ul.innerHTML = `<li style="color: #0f0;">${convertLetters(userChoice)}</li>` + userMoves_ul.innerHTML;
    computerMoves_ul.innerHTML = `<li>${convertLetters(computerChoice)}</li>` + computerMoves_ul.innerHTML;
    return;
  }
  else if(winner === "c"){
    userMoves_ul.innerHTML = `<li>${convertLetters(userChoice)}</li>` + userMoves_ul.innerHTML;
    computerMoves_ul.innerHTML = `<li style="color: #0f0;">${convertLetters(computerChoice)}</li>` + computerMoves_ul.innerHTML;
    return;
  }
  userMoves_ul.innerHTML = `<li>${convertLetters(userChoice)}</li>` + userMoves_ul.innerHTML;
  computerMoves_ul.innerHTML = `<li>${convertLetters(computerChoice)}</li>` + computerMoves_ul.innerHTML;
}