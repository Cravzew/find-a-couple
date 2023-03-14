class Card {
  _open = false
  _success = false
  constructor(container, number, action) {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.textContent = number;
    this.number = number;
    this.card.addEventListener('click', () => {
      if (this.open == false && this.success == false) {
        this.open = true;
        action(this);
      }
    });
    container.append(this.card);
  }

  set open(value) {
    this._open = value
    if (value) {
      this.card.classList.add('open');
    } else {
      this.card.classList.remove('open');
    }
  }
  get open() {
    return this._open
  }
  set success(value) {
    this.__success = value
    if (value) {
      this.card.classList.add('success');
    } else {
      this.card.classList.remove('success');
    }
  }
  get success() {
    return this._success
  }
}

function newGame(container, cardsCount) {

  // Создать поле
  let cardsNumberArray = [];
  let cardsArray = [];
  let firstCard = null;
  let secondCard = null;

  for (let i = 1; i <= cardsCount / 2; i++) {
    cardsNumberArray.push(i);
    cardsNumberArray.push(i);
  }

  cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5);

  for (let cardNumber of cardsNumberArray) {
    cardsArray.push(new Card(container, cardNumber, flip));
  }

  // Логика игры
  function flip(card) {
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number != secondCard.number) {
        firstCard.open = false;
        secondCard.open = false;
        firstCard = null;
        secondCard = null;
      }
    }

    if (firstCard == null) {
      firstCard = card;
    } else {
      if (secondCard == null) {
        secondCard = card;
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number == secondCard.number) {
        firstCard.success = true;
        secondCard.success = true;
        firstCard = null;
        secondCard = null;
      }
    }

    // Сброс игры
    if (document.querySelectorAll('.card.success').length == cardsNumberArray.length) {
      if (confirm('Сыграть еще раз')) {
        container.innerHTML = '';
        cardsNumberArray = [];
        cardsArray = [];
        firstCard = null;
        secondCard = null;
        newGame(container, cardsCount)
      } else {
        return
      }
    }
  }
}

newGame(document.getElementById('game'), 8);
