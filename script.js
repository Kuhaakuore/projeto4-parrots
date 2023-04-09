let cardsNumber = 6;
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
                cardsContainer.innerHTML += `<div class="card" data-test="card">
                                                <img src="./media/images/back.png" alt="" class="show-img"">
                                                <img src="${selectedCards[j]}" alt="" class="hide-img"">
                                            </div>`;
            }
        }
    }
    else {
        for (i = 0; i < 2; i++) {
            cards.sort(comparador);
            for (j = 0; j < cardsNumber / 2; j++) {
                cardsContainer.innerHTML += `<div class="card" data-test="card">
                                                <img src="./media/images/back.png" alt="" class="show-img"">
                                                <img src="${cards[j]}" alt="" class="hide-img"">
                                            </div>`;
            }
        }
    }
}

placeCards();
