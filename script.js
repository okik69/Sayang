let state = false;
let btn = document.querySelector(".btn");
let record = document.querySelector(".record");
let toneArm = document.querySelector(".tone-arm");
let song = document.querySelector(".my-song");
let slider = document.querySelector(".slider");
const audio = document.querySelector('.my-song');
const musicBar = document.querySelector('.music-bar');
const button = document.getElementById('overlay-button');
  const text = document.getElementById('overlay-text');

  // Array teks
  const messages = [
    '💍To my future wife',
  'Buka kado yang aku kasih',
    'Ikuti instruksi dengan pelan dan hati-hati \Karena bisa meledak 😝😝😝',
 'Pada charge pada bagian belakang bawah dengan USB type C',
 'Jika cahaya lampu sudah mengala tekan tombol dj bawah samping kiri',
    'thank you for your time & love', 
   'Aku tulis lagu ini untuk kamu ❤️❤️\And I f💀cking love you 💕💖💗'
  ];

  let step = 0;

  button.addEventListener('click', () => {
    step++;
    if(step < messages.length){
      text.textContent = messages[step];
      if(step === messages.length - 1){
        button.textContent = 'Close';
      }
    } else {
      document.getElementById('overlay').style.display = 'none';
    }
  });


// Update progress bar saat audio diputar
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        musicBar.value = (audio.currentTime / audio.duration) * 100;
    }
});

// Untuk seek (lompat ke waktu tertentu saat user menggeser bar)
musicBar.addEventListener('input', () => {
    if (audio.duration) {
        audio.currentTime = (musicBar.value / 100) * audio.duration;
    }
});

btn.addEventListener("click", () => {
    if(state == false){
        record.classList.add("on");
        toneArm.classList.add("play");
        setTimeout(() => {
            song.play();
        },1000);

    }
    else{
        record.classList.remove("on");
        toneArm.classList.remove("play");
        song.pause();

    }
    state = !state;
    
});

slider.addEventListener("input",(e) => {
    song.volume = Number(e.target.value);
});

