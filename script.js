const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockCards = false;
let firstCard;
let secondCard;


function flipCard() {
  if(lockCards) return;
  if(this === firstCard) return;
  this.classList.add('flip');
  if(!hasFlippedCard){
      hasFlippedCard = true;
      firstCard = this;
  }else{
      secondCard = this;
      checkForMatch();
    }
}

function checkForMatch() {
    if(firstCard.dataset.framework === secondCard.dataset.framework){
        disableCards();
    }else{
        unFlipCards();
  }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    reset();
}

function unFlipCards() {
    lockCards = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        reset();
      }, 1500);
    
}

function reset(){
    [hasFlippedCard, lockCards] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
  })();

cards.forEach(card => card.addEventListener('click', flipCard));