import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(timeStop, 1000));
function timeStop(timeupdate) {
  let currentTime = timeupdate.seconds;
  console.log(currentTime);
  localStorage.setItem('videoplayer-current-time', currentTime);
}
window.addEventListener('load', afterRefresh);
function afterRefresh(event) {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  player.setCurrentTime(currentTime);
}