// Gate Open Function with Music Play
function openGates() {
    const gate = document.getElementById('gate-screen');
    gate.classList.add('open');

    // Play background song
    const song = document.getElementById('weddingSong');
    song.play().catch(error => {
        console.log("Audio play failed: ", error);
    });
}

// Scratch Card Setup
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.parentElement.offsetWidth;
canvas.height = canvas.parentElement.offsetHeight;

// Draw scratch layer cover
ctx.fillStyle = '#b08d57';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.font = '14px Poppins';
ctx.fillStyle = '#fff';
ctx.textAlign = 'center';
ctx.fillText('Scratch Here', canvas.width / 2, canvas.height / 2 + 5);

let isScratching = false;

function scratchLayer(e) {
    if (!isScratching) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2, false);
    ctx.fill();
}

canvas.addEventListener('mousedown', () => isScratching = true);
canvas.addEventListener('mousemove', scratchLayer);
window.addEventListener('mouseup', () => isScratching = false);

canvas.addEventListener('touchstart', () => isScratching = true);
canvas.addEventListener('touchmove', scratchLayer);
window.addEventListener('touchend', () => isScratching = false);

// Countdown Timer
const weddingTime = new Date('November 26, 2026 00:00:00').getTime();

function updateTimer() {
    const now = new Date().getTime();
    const diff = weddingTime - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }
}

setInterval(updateTimer, 1000);