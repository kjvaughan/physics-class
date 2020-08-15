/* function rotate(){
    //onclick to activate the function
    //get element probably by id
    //.classList.add to add the rotation
    //some sort of if check to check whether the class is there or not
  }
  
  rotate() */

  //each game square should be an object and will need to manipulate state
/*   function flipCard(el, color) {
    this.el = el;
    this.isOpen = false;
    this.isLocked = false;
    this.el.addEventListener("click", this, false);
  } */
  //el is element (reference the DOM)
  //open will be rotated (have CSS class applied to it)
  //locked will be open and not allowed to close (maybe add class .hide display:none)
  //listening for clicks
  const resetButton = document.getElementById("reset-button");

  const cards = document.querySelectorAll('.flip-card');

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    hasFlippedCard = false;

    checkForMatch();
  }

  function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
      disableCards();
      return;
    }

    unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      
      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
    cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
    });
  })();
  
  cards.forEach(card => card.addEventListener('click', flipCard));