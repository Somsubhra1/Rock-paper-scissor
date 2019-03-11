var userScore = 0;
var computerScore = 0;
const userSmall = 'User'.fontsize('3').sub();
const compSmall = 'CPU'.fontsize('3').sub();

// Catching DOM elements

const userScore_span = document.getElementById("user-score");
const computer_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

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

// fetching computer choice

function getComputerChoice() {
  const choices = ["r", "p", "s"];
  var random = Math.floor(Math.random() * 3);
  return choices[random];
}

// checking user choice

function game(userChoice) {
  const computerChoice = getComputerChoice();
  console.log(userChoice + computerChoice);

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
  }, 900); 

}

// user lose

function lose(userChoice, computerChoice) {
  computerScore++;
  computer_span.innerHTML = computerScore;
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
  }, 900); 
}

// user draw

function draw(userChoice, computerChoice) {
  result_p.innerHTML = `${convertLetters(computerChoice)}${compSmall} equals ${convertLetters(userChoice)}${userSmall} . It's a draw!! :|`
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
