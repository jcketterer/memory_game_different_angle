const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false; 
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
    //first click 
    hasFlippedCard = true;
    firstCard = this;
    return;
    }     

    //second click 
    secondCard = this;
    checkForMatches();
}

function checkForMatches() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework

    isMatch ? disableCards() :  unFlippedCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unFlippedCards() {
    lockBoard = true

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();

    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomShuffle = Math.floor(Math.random()*12);
        card.style.order = randomShuffle;
    });
})();


cards.forEach(card => card.addEventListener('click', flipCard));




