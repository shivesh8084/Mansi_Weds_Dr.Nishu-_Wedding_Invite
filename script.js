// Gate Open Function with Music Play
function openGates() {
    const gate = document.getElementById('gate-screen');
    if (gate) {
        gate.classList.add('open');
    }

    // Play background song
    const song = document.getElementById('weddingSong');
    if (song) {
        song.play().catch(error => {
            console.log("Audio play failed: ", error);
        });
    }
}

// Scratch Card Setup
const canvas = document.getElementById('scratchCanvas');
if (canvas) {
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
        const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
        const x = clientX - rect.left;
        const y = clientY - rect.top;

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
}

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

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
        if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }
}

setInterval(updateTimer, 1000);