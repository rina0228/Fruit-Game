const fruit = document.getElementById("fruit");
const basket = document.getElementById("basket");

let fruitTop = 0;
let basketLeft = 120;
let lives = 3;
let score = 0;
let level = 1;

const fruitEmojis = ["🍎", "🍌", "🍇", "🍓", "🍒", "🥝", "🍍"];

// Move basket
function moveLeft() {
  if (basketLeft > 0) {
    basketLeft -= 20;
    basket.style.left = basketLeft + "px";
  }
}
function moveRight() {
  if (basketLeft < 240) {
    basketLeft += 20;
    basket.style.left = basketLeft + "px";
  }
}

// Keyboard controls
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") moveLeft();
  else if (e.key === "ArrowRight") moveRight();
});

function updateScore() {
  document.getElementById("scoreBoard").innerText = "Score: " + score;
}

// Update lives
function updateLives() {
  let heart = "";
  for (let i = 0; i < lives; i++) {
    heart += "❤️";
  }
  document.getElementById("lives").innerText = heart;
}

// Update level
function updateLevel() {
  document.getElementById("level").innerText = "📶 Level: " + level;
}

// Reset fruit
function resetFruit() {
  fruitTop = 0;
  fruit.style.top = "0px";
  fruit.style.left = Math.floor(Math.random() * 260) + "px";

  // Change fruit emoji randomly
  const randomEmoji = fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];
  fruit.innerText = randomEmoji;
}

// Drop fruit
function dropFruit() {
  fruitTop += 5 + level; // Increase speed by level
  fruit.style.top = fruitTop + "px";

  const fruitLeft = parseInt(fruit.style.left);

  if (
    fruitTop >= 340 &&
    fruitLeft > basketLeft - 30 &&
    fruitLeft < basketLeft + 60
  ) {
    score++;
    updateScore();

    // Increase level after every 5 fruits
    if (score % 5 === 0) {
      level++;
      updateLevel();
    }

    resetFruit();
  } else if (fruitTop >= 400) {
    lives--;
    updateLives();
    resetFruit();

    if (lives === 0) {
      alert("💀 Game Over! Final Score: " + score);
      clearInterval(gameLoop);
    }
  }
}

// Game loop
let gameLoop = setInterval(dropFruit, 100);

// Background Music
window.addEventListener("load", () => {
  const music = document.getElementById("bgMusic");
  if (music) {
    music.volume = 0.5;
    music.play().catch(() => {
      console.log("Autoplay blocked. Will play on user interaction.");
    });
  }
});

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  const btn = document.getElementById("darkModeBtn");
  if (document.body.classList.contains("dark-mode")) {
    btn.innerText = "☀️ Light Mode";
  } else {
    btn.innerText = "🌙 Dark Mode";
  }
}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("sw.js")
      .then(function (registration) {
        console.log("✅ Service Worker registered with scope:", registration.scope);
      })
      .catch(function (error) {
        console.log("❌ Service Worker registration failed:", error);
      });
  });
}