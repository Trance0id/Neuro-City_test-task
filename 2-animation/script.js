const figures = document.querySelectorAll('.figures__figure');
const startButton = document.querySelector('.start-button');

let animationActive = false;

const animate = () => {
  figures.forEach(figure => {
    figure.classList.toggle('animated');
  });
  animationActive = !animationActive;
  startButton.textContent = animationActive ? 'Остановить анимацию' : 'Начать анимацию';
};

startButton.addEventListener('click', () => animate());
