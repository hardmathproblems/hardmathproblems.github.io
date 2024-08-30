const API_KEY = 'AIzaSyCmw1LikX2ci00qharZd7o0ztYWW3pYcvg';
let playlist = [];
let isPlayerInitialized = false;

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-btn');
    const musicPlayer = document.getElementById('music-player');
    const closeBtn = document.getElementById('close-btn');
    const songImage = document.getElementById('song-image');
    const songName = document.getElementById('song-name');
    const fetchBtn = document.getElementById('fetch-btn');
    const urlInput = document.getElementById('url-input');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const volumeSlider = document.getElementById('volume-slider');
    const playlistDiv = document.getElementById('playlist');

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    let player;

    window.onYouTubeIframeAPIReady = () => {
        player = new YT.Player('player', {
            height: '0',
            width: '0',
            events: {
                'onReady': onPlayerReady
            }
        });
    };

    function onPlayerReady(event) {
        loadPlayerState();
        isPlayerInitialized = true;
    }

    function extractVideoId(url) {
        const urlObj = new URL(url);
        const params = new URLSearchParams(urlObj.search);
        return params.get('v') || urlObj.pathname.split('/').pop();
    }

    function fetchSongData(videoId) {
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const videoData = data.items[0].snippet;
                songImage.src = videoData.thumbnails.high.url;
                songName.textContent = videoData.title;

                playlist.push({ videoId, title: videoData.title, thumbnail: videoData.thumbnails.high.url });
                updatePlaylist();

                if (player && typeof player.loadVideoById === 'function') {
                    player.loadVideoById(videoId);
                    savePlayerState();
                } else {
                    console.error('Player is not properly initialized or does not support loadVideoById.');
                }
            })
            .catch(error => console.error('Error fetching video data:', error));
    }

    function updatePlaylist() {
        playlistDiv.innerHTML = '';
        playlist.forEach((item, index) => {
            const playlistItem = document.createElement('div');
            playlistItem.className = 'playlist-item';
            playlistItem.innerHTML = `
                <img src="${item.thumbnail}" alt="Thumbnail">
                <span>${item.title}</span>
            `;
            playlistItem.addEventListener('click', () => {
                if (player && typeof player.loadVideoById === 'function') {
                    player.loadVideoById(item.videoId);
                    songImage.src = item.thumbnail;
                    songName.textContent = item.title;
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                    savePlayerState();
                } else {
                    console.error('Player is not properly initialized or does not support loadVideoById.');
                }
            });
            playlistDiv.appendChild(playlistItem);
        });
    }

    function savePlayerState() {
        if (player && typeof player.getVideoData === 'function') {
            const currentVideoId = player.getVideoData().video_id;
            const currentTime = player.getCurrentTime();
            const volume = player.getVolume();

            setCookie('currentVideoId', currentVideoId, 7);
            setCookie('currentTime', currentTime, 7);
            setCookie('volume', volume, 7);
        }
    }

    function loadPlayerState() {
        const savedVideoId = getCookie('currentVideoId');
        const savedTime = parseFloat(getCookie('currentTime'));
        const savedVolume = parseFloat(getCookie('volume'));

        if (savedVideoId) {
            player.cueVideoById(savedVideoId); // Use cueVideoById instead of loadVideoById to allow seeking before playing

            player.addEventListener('onStateChange', function (event) {
                if (event.data === YT.PlayerState.CUED) {
                    if (savedTime && !isNaN(savedTime)) {
                        player.seekTo(savedTime, true);
                    }
                    if (savedVolume && !isNaN(savedVolume)) {
                        player.setVolume(savedVolume);
                        volumeSlider.value = savedVolume;
                    }
                }
            });
        } else {
            songImage.src = '/img/placeholder.png';
            songName.textContent = 'No song loaded';
        }
    }

    fetchBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (url) {
            const videoId = extractVideoId(url);
            if (videoId) {
                fetchSongData(videoId);
            } else {
                alert('Invalid YouTube URL');
            }
        } else {
            alert('Please enter a YouTube URL');
        }
    });

    playPauseBtn.addEventListener('click', () => {
        if (player && typeof player.getPlayerState === 'function') {
            const playerState = player.getPlayerState();
            if (playerState === YT.PlayerState.PLAYING) {
                player.pauseVideo();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            } else {
                player.playVideo();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            }
            savePlayerState();
        } else {
            console.error('Player is not properly initialized or does not support getPlayerState.');
        }
    });

    volumeSlider.addEventListener('input', () => {
        const volume = volumeSlider.value;
        if (player && typeof player.setVolume === 'function') {
            player.setVolume(volume);
            savePlayerState();
        } else {
            console.error('Player is not properly initialized or does not support setVolume.');
        }
    });

    toggleBtn.addEventListener('click', () => {
        if (musicPlayer.classList.contains('show')) {
            musicPlayer.classList.remove('show');
            musicPlayer.classList.add('hide');
            setTimeout(() => {
                musicPlayer.style.display = 'none';
            }, 300);
        } else {
            musicPlayer.style.display = 'flex';
            setTimeout(() => {
                musicPlayer.classList.remove('hide');
                musicPlayer.classList.add('show');
            }, 10);
        }
    });

    closeBtn.addEventListener('click', () => {
        musicPlayer.classList.remove('show');
        musicPlayer.classList.add('hide');
        setTimeout(() => {
            musicPlayer.style.display = 'none';
        }, 300);
    });

    // Collapse the player by default
    musicPlayer.style.display = 'none';
});

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}
