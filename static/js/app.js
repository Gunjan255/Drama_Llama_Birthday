const openBtn = document.getElementById("openBtn");
const heartLayer = document.getElementById("hearts");
const birthdaySong = document.getElementById("birthdaySong");

const birthdayCelebration =
  document.getElementById("birthdayCelebration");

const closeCelebration =
  document.getElementById("closeCelebration");

const celebrateBtn =
  document.getElementById("celebrateBtn");

const confettiLayer =
  document.getElementById("confettiLayer");


// =========================================
// LAAVAN MUSIC
// =========================================

function playLaavan() {

  if (!birthdaySong) {
    console.error("❌ birthdaySong not found");
    return;
  }

  birthdaySong.currentTime = 0;
  birthdaySong.volume = 1.0;

  const playPromise = birthdaySong.play();

  if (playPromise !== undefined) {

    playPromise
      .then(() => {
        console.log("🎵 LAAVAN STARTED!");
      })
      .catch((error) => {
        console.error("❌ LAAVAN FAILED:", error);
      });

  }
}


// =========================================
// CONTINUE BUTTON
// =========================================

if (closeCelebration) {

  closeCelebration.addEventListener("click", function () {

    console.log("❤️ Continue button clicked");

    // IMPORTANT:
    // This is directly inside the user's click.
    playLaavan();

    // Hide birthday animation
    if (birthdayCelebration) {
      birthdayCelebration.classList.add("hidden");
    }

    // Start hearts
    burstHearts(28);

    // Notify Flask
    fetch("/heartbeat", {
      method: "POST"
    }).catch(() => {});

  });

}


// =========================================
// MAIN OPEN BUTTON
// =========================================

if (openBtn) {

  openBtn.addEventListener("click", function () {

    console.log("❤️ Open surprise clicked");

    document
      .querySelector(".intro")
      .scrollIntoView({
        behavior: "smooth"
      });

    burstHearts(28);

    // Keep music playing
    if (birthdaySong && birthdaySong.paused) {
      playLaavan();
    }

    fetch("/heartbeat", {
      method: "POST"
    }).catch(() => {});

  });

}


// =========================================
// HEARTS
// =========================================

function burstHearts(count) {

  if (!heartLayer) return;

  for (let i = 0; i < count; i++) {

    const h = document.createElement("span");

    h.className = "heart";

    h.textContent =
      ["♥", "♡", "❤", "✦"][
        Math.floor(Math.random() * 4)
      ];

    h.style.left =
      (15 + Math.random() * 70) + "%";

    h.style.bottom =
      (8 + Math.random() * 18) + "%";

    h.style.setProperty(
      "--drift",
      (Math.random() * 160 - 80) + "px"
    );

    h.style.animationDelay =
      (Math.random() * .7) + "s";

    h.style.fontSize =
      (12 + Math.random() * 22) + "px";

    heartLayer.appendChild(h);

    setTimeout(() => h.remove(), 5500);
  }
}


// =========================================
// SCROLL REVEALS
// =========================================

const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    { threshold: .12 }
  );


document
  .querySelectorAll(".reveal")
  .forEach(el => observer.observe(el));


// =========================================
// PYTHON EASTER EGG
// =========================================

let typed = "";

window.addEventListener("keydown", (e) => {

  typed =
    (typed + e.key.toLowerCase()).slice(-6);

  if (typed === "python") {

    burstHearts(50);

    document.body.animate(
      [
        { filter: "brightness(1)" },
        { filter: "brightness(1.35)" },
        { filter: "brightness(1)" }
      ],
      { duration: 900 }
    );

  }

});


// =========================================
// BIRTHDAY CELEBRATION
// =========================================

function createConfetti(amount = 120) {

  if (!confettiLayer) return;

  confettiLayer.innerHTML = "";

  const shapes = [
    "●",
    "◆",
    "✦",
    "♥",
    "■"
  ];

  for (let i = 0; i < amount; i++) {

    const piece =
      document.createElement("span");

    piece.className =
      "confetti-piece";

    piece.textContent =
      shapes[
        Math.floor(
          Math.random() * shapes.length
        )
      ];

    piece.style.left =
      Math.random() * 100 + "%";

    piece.style.setProperty(
      "--duration",
      3 + Math.random() * 3 + "s"
    );

    piece.style.setProperty(
      "--delay",
      Math.random() * 1.5 + "s"
    );

    piece.style.setProperty(
      "--drift",
      Math.random() * 250 - 125 + "px"
    );

    piece.style.fontSize =
      7 + Math.random() * 10 + "px";

    confettiLayer.appendChild(piece);
  }

  setTimeout(() => {

    if (confettiLayer) {
      confettiLayer.innerHTML = "";
    }

  }, 7000);
}


// =========================================
// START CELEBRATION
// =========================================

function startBirthdayCelebration() {

  if (!birthdayCelebration) return;

  birthdayCelebration.classList.remove("hidden");

  createConfetti(140);

  burstHearts(45);
}


// =========================================
// CELEBRATE AGAIN
// =========================================

if (celebrateBtn) {

  celebrateBtn.addEventListener(
    "click",
    startBirthdayCelebration
  );

}


// =========================================
// INITIAL CELEBRATION
// =========================================

window.addEventListener("load", () => {

  setTimeout(() => {

    startBirthdayCelebration();

  }, 700);

});