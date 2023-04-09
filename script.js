let cardsNumber = 4;
let firstCard = null;
let secondCard = null;
let firstCardSrc = '';

const cardsContainer = document.querySelector(".cards-container");
const cards = ["./media/images/bobrossparrot.gif",
    "./media/images/explodyparrot.gif",
    "./media/images/fiestaparrot.gif",
    "./media/images/metalparrot.gif",
    "./media/images/revertitparrot.gif",
    "./media/images/tripletsparrot.gif",
    "./media/images/unicornparrot.gif"
];

function comparador() {
    return Math.random() - 0.5;
}

function getCardNumber() {
    cardsNumber = prompt("Bem vindo! Com quantas cartas você deseja jogar?");
    cardsNumber = 14;
    while ((cardsNumber % 2 !== 0) || ((cardsNumber < 4) || (cardsNumber > 14))) {
        cardsNumber = prompt("Bem vindo! Com quantas cartas você deseja jogar?");
    }
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
                  <img src="./media/images/back.png" alt=""">
                </div>
                <div class="front-face face">
                  <img src="${selectedCards[j]}" alt=""">
                </div>
              </div>`;
            }
        }
    }
    else {
        for (i = 0; i < 2; i++) {
            cards.sort(comparador);
            for (j = 0; j < cardsNumber / 2; j++) {
                cardsContainer.innerHTML += `<div class="card" data-test="card">
                <div class="back-face face">
                  <img src="./media/images/back.png" alt=""">
                </div>
                <div class="front-face face">
                  <img src="${cards[j]}" alt=""">
                </div>
              </div>`;
            }
        }
    }
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
        } else if (secondCard === null) {
            card.classList.add("turned");
            secondCard = card;
            const backFace = card.querySelector(".back-face");
            const frontFace = card.querySelector(".front-face");
            backFace.classList.toggle("back");
            frontFace.classList.toggle("front");
            if (card.querySelector(".front-face img").src === firstCardSrc) {
                firstCardSrc = '';
                firstCard = null;
                secondCard = null;
            } else {
                setTimeout(wrongChoice, 1000);
            }
        }
    }
    else {
        console.log("Fuck");
    }
}

placeCards();