const setVideoProgressText = time => {
  return (
    `${Math.floor(time / 60)}`.padStart(2, '0') +
    ':' +
    `${Math.floor(time)}`.padStart(2, '0') +
    ':' +
    `${Math.trunc((time - Math.floor(time)) * 1000)}`.padStart(3, '0')
  );
};

const video = document.querySelector('.video__window');
const time = document.querySelector('.video__time');
time.textContent = setVideoProgressText(0);
// video.controls = false;

video.addEventListener('click', () => {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
});

video.addEventListener('timeupdate', () => {
  time.textContent = setVideoProgressText(video.currentTime);
});

video.addEventListener('ended', () => {
  video.currentTime = 0;
});
