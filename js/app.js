// GLOBAL VARIABLES

let openedCards = [];
let matchedCards = [];
let moves = 0;
let i = 0;

// SHUFFLE (http://stackoverflow.com/a/2450976)

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// CREATE A DECK

function createCards() {
  const cards = shuffle([
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-leaf",
    "fa-bicycle",
    "fa-bomb",
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-leaf",
    "fa-bicycle",
    "fa-bomb"
  ]);
    
  const container = document.querySelector(".container");
  const ul = document.createElement("ul");
  let li;
    
  ul.setAttribute("class", "deck");
  for (card of cards) {
    li = document.createElement("li");
    li.setAttribute("class", "card");
    li.innerHTML = '<i class="fa ' + card + '"></i>';
    ul.appendChild(li);
  }
  container.appendChild(ul);
}

// TIMER (https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer)

function timer(time) {
  let minutes = 0;
  let seconds = 0;
  setInterval(function() {
    seconds = parseInt(seconds, 10) + 1;
    minutes = parseInt(minutes, 10);
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    time.textContent = minutes + ":" + seconds;
  }, 1000);
}

// GAME

function openCard(card) {
  const icon = card.firstElementChild;
  if (!openedCards.includes(card)) {
    openedCards.push(card);
    card.classList.add("open", "show");
  }
  if (openedCards.length === 2) {
    matchCards();
  }
}

function matchCards() {
  const firstIcon = openedCards[0].firstElementChild.classList[1];
  const secondIcon = openedCards[1].firstElementChild.classList[1];
  incrementMoves();
  if (firstIcon === secondIcon) {
    matchedCards.push(secondIcon);
    for (card of openedCards) {
      card.classList.add("match");
    }
    closeCards(); 

// RESET
      
  } else {
    setTimeout(closeCards, 1000);
  }
}

function closeCards() {
  if (openedCards !== undefined) {
    for (card of openedCards) {
      card.classList.remove("open", "show");
    }
  }
  openedCards = [];
}

function incrementMoves() {
  moves += 1;
  document.querySelector(".moves").textContent = moves.toString();
  if (moves <= 20 && moves != 0) {
    updateStarRating();
  }
}

function updateStarRating() {
  if (moves === 15 || moves === 20) {
    document.querySelector(".stars").firstElementChild.remove();
  }
}

function showModal() {
  const stars = document.querySelector(".stars");
  const time = document.querySelector(".timer").textContent;
  const button = document.querySelector("button");
  
  stars.classList.add("modal-stars");
  document.querySelector(".invisible").classList.remove("invisible");
  document.getElementById("moves-modal").textContent =
    "Moves: " + moves.toString();
  document.getElementById("timer-modal").textContent =
    "Time: " + time;
  document.querySelector(".modal").insertBefore(stars, button);
}

// RUN THE CODE

createCards();

// EVENT LISTENERS

document.querySelector(".deck").addEventListener("click", function(event) {
  const card = event.target;
  if (
    card.nodeName === "LI" &&
    !matchedCards.includes(card.firstElementChild.classList[1])
  ) {
      
// INITIALIZE TIMER
      
    if (i <= 0) {
      timer(document.querySelector(".timer"));
      i = 1;
    }
    if (openedCards.length <= 1) {
      openCard(card);
    }
    if (matchedCards.length >= 8) {
      showModal();
    }
  }
});

// RELOAD

document.querySelector(".fa-repeat").addEventListener("click", function() {
  window.location.reload();
});

document.querySelector("button").addEventListener("click", function() {
  window.location.reload();
});
