const button = document.querySelector('.button');
const squares = document.querySelector('.squares');
const caption = document.querySelector('h2');

function getRandomNumber() {
  return (Math.floor(Math.random() * 91) + 10);
}

function getRandomRgbColor() {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
}

function renderRandomSquares() {
  const numSquares = getRandomNumber();
  caption.textContent = `Количество квадратиков: ${numSquares}`;
  squares.innerHTML = '';
  for (let i = 1; i <= numSquares; i++) {
    const square = document.createElement('li');
    square.classList.add('squares__square');
    square.style.backgroundColor = getRandomRgbColor();
    squares.append(square);
  }
}

button.addEventListener('click', renderRandomSquares);
