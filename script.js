let cardsNumber = 0;
let firstCard = null;
let secondCard = null;
let firstCardSrc = '';
let movesCounter = 0;
let successesCounter = 0;
let time = 0;
let timerId = null;

const cardsContainer = document.querySelector(".cards-container");
const cards = ["./media/images/bobrossparrot.gif",
    "./media/images/explodyparrot.gif",
    "./media/images/fiestaparrot.gif",
    "./media/images/metalparrot.gif",
    "./media/images/revertitparrot.gif",
    "./media/images/tripletsparrot.gif",
    "./media/images/unicornparrot.gif"
];
const timer = document.querySelector(".timer");

function resetVariables() {
    firstCardSrc = '';
    firstCard = null;
    secondCard = null;
    successesCounter = 0;
    movesCounter = 0;
}

function increaseTime() {
    time++;
    timer.innerHTML = time;
}

function resetTime() {
    time = 0;
    timer.innerHTML = time;
}

function comparador() {
    return Math.random() - 0.5;
}

function getCardNumber() {
    cardsNumber = prompt("Bem vindo! Com quantas cartas você deseja jogar?");
    while ((cardsNumber % 2 !== 0) || ((cardsNumber < 4) || (cardsNumber > 14))) {
        cardsNumber = prompt("Bem vindo! Com quantas cartas você deseja jogar?");
    }
    placeCards();
}

function placeCards() {
    cardsContainer.innerHTML = '';
    cards.sort(comparador);
    if (cardsNumber !== 14) {
        const selectedCards = [];
        for (i = 0; i < cardsNumber / 2; i++) {
            selectedCards.push(cards[i]);
        }
        for (i = 0; i < 2; i++) {
            selectedCards.sort(comparador);
            for (j = 0; j < cardsNumber / 2; j++) {
                cardsContainer.innerHTML += `<div class="card" data-test="card" onclick="turnCard(this)">
                <div class="back-face face">
                  <img src="./media/images/back.png" alt="" data-test="face-down-image"">
                </div>
                <div class="front-face face">
                  <img src="${selectedCards[j]}" alt="" data-test="face-up-image"">
                </div>
              </div>`;
            }
        }
    }
    else {
        for (i = 0; i < 2; i++) {
            cards.sort(comparador);
            for (j = 0; j < cardsNumber / 2; j++) {
                cardsContainer.innerHTML += `<div class="card" data-test="card" onclick="turnCard(this)">
                <div class="back-face face">
                  <img src="./media/images/back.png" alt="" data-test="face-down-image" ">
                </div>
                <div class="front-face face">
                  <img src="${cards[j]}" alt="" data-test="face-up-image"">
                </div>
              </div>`;
            }
        }
    }
    timerId = setInterval(increaseTime, 1000);
}

function wrongChoice() {
    firstCard.querySelector(".back-face").classList.toggle("back");
    firstCard.querySelector(".front-face").classList.toggle("front");
    secondCard.querySelector(".back-face").classList.toggle("back");
    secondCard.querySelector(".front-face").classList.toggle("front");
    firstCard.classList.remove("turned");
    secondCard.classList.remove("turned");
    firstCard = null;
    secondCard = null;
}

function rightChoice () {
    firstCardSrc = '';
    firstCard = null;
    secondCard = null;
    successesCounter++;
}

function verifyVictory() {
    if (successesCounter === cardsNumber/2) {
        clearInterval(timerId);
        alert(`Você ganhou em ${movesCounter} jogadas! A duração do jogo foi de ${time} segundos!`);
        let answer = prompt("Você gostaria de reiniciar a partida? (sim ou não)");
        while (answer !== "sim" && answer !== "não") {
            answer = prompt("Você gostaria de reiniciar a partida? (sim ou não)");
        }
        if (answer === "sim") {
            resetTime();
            resetVariables();
            getCardNumber();
        }
    }
}

function turnCard(card) {
    if (!card.classList.contains("turned")) {
        if (firstCard === null) {
            card.classList.add("turned");
            firstCard = card;
            firstCardSrc = card.querySelector(".front-face img").src;
            const backFace = card.querySelector(".back-face");
            const frontFace = card.querySelector(".front-face");
            backFace.classList.toggle("back");
            frontFace.classList.toggle("front");
            movesCounter++;
        } else if (secondCard === null) {
            card.classList.add("turned");
            secondCard = card;
            const backFace = card.querySelector(".back-face");
            const frontFace = card.querySelector(".front-face");
            backFace.classList.toggle("back");
            frontFace.classList.toggle("front");
            if (card.querySelector(".front-face img").src === firstCardSrc) {
                rightChoice();
                movesCounter++;
                setTimeout(verifyVictory, 100);
            } else {
                movesCounter++;
                setTimeout(wrongChoice, 1000);
            }
        }
    }
}