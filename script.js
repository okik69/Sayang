const song = document.getElementById('song');
const btn = document.querySelector('.btn');
const slider = document.querySelector('.slider');
const record = document.getElementById('record');
const toneArm = document.getElementById('toneArm');
const lyricLines = document.querySelectorAll('.lyric-line');
let state = false;
let lastActiveIndex = -1;

btn.addEventListener("click", () => {
    if(state == false){
        record.classList.add("on");
        toneArm.classList.add("play");
        setTimeout(() => {
            song.play();
          updateLyrics()
        },1000);

    else{
        record.classList.remove("on");
        toneArm.classList.remove("play");
        song.pause();

    }
    state = !state;
    
});

// Update durasi slider berdasarkan durasi lagu
song.addEventListener('loadedmetadata', () => {
  slider.max = song.duration;
});

// Update slider saat lagu berjalan
song.addEventListener('timeupdate', () => {
  slider.value = song.currentTime;
  updateLyrics();
});

// Update waktu lagu saat slider digeser
slider.addEventListener('input', () => {
  song.currentTime = slider.value;
  updateLyrics();
});

// Fungsi untuk memperbarui lirik berdasarkan waktu lagu
function updateLyrics() {
  const currentTime = song.currentTime;
  let activeIndex = -1;

  lyricLines.forEach((line, index) => {
    const lineTime = parseFloat(line.getAttribute('data-time'));
    const nextLineTime = index < lyricLines.length - 1 ? parseFloat(lyricLines[index + 1].getAttribute('data-time')) : Infinity;

    if (currentTime >= lineTime && currentTime < nextLineTime) {
      line.classList.add('active');
      line.classList.remove('past');
      activeIndex = index;
    } else if (currentTime >= nextLineTime) {
      line.classList.remove('active');
      line.classList.add('past');
    } else {
      line.classList.remove('active', 'past');
    }
  });

  // Gulir ke baris aktif
  if (activeIndex !== lastActiveIndex && activeIndex !== -1) {
    const activeLine = lyricLines[activeIndex];
    activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
    lastActiveIndex = activeIndex;
  }
}
