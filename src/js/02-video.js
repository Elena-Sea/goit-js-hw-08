import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

onVideoRestart();

function onPlay(data) {
    const savedPlayedTime = data.seconds;
    localStorage.setItem(STORAGE_TIME, savedPlayedTime);
}

function onVideoRestart() { 
    const lastTimeUpdate = localStorage.getItem(STORAGE_TIME);
    if (lastTimeUpdate) { 
        player.setCurrentTime(lastTimeUpdate);
    };
}
