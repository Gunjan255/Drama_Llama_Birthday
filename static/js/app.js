const openBtn = document.getElementById("openBtn");
const heartLayer = document.getElementById("hearts");
const birthdaySong = document.getElementById("birthdaySong");

async function playLaavan() {
  if (!birthdaySong) {
    console.error("❌ birthdaySong element not found");
    return;
  }

  try {
    birthdaySong.currentTime = 0;
    birthdaySong.volume = 1.0;
    await birthdaySong.play();
    console.log("🎵 Laavan started successfully!");
  } catch (error) {
    console.error("❌ Laavan failed:", error);
  }
}

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

async function playLaavan() {

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

  closeCelebration.addEventListener("click", async function () {

    console.log("❤️ Continue button clicked");

    await playLaavan();

    if (birthdayCelebration) {
      birthdayCelebration.classList.add("hidden");
    }

    burstHearts(28);

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

/* =========================================
   CINEMATIC PHOTO LIGHTBOX
   ========================================= */

const photoLightbox =
  document.getElementById("photoLightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const lightboxClose =
  document.getElementById("lightboxClose");

const lightboxNumber =
  document.getElementById("lightboxNumber");

const lightboxTitle =
  document.getElementById("lightboxTitle");

const lightboxText =
  document.getElementById("lightboxText");


/* =========================================
   PHOTO INFORMATION
   ========================================= */

const photoInfo = {

  "Amrita_mandir.jpeg": {
    number: "01 · MY BEAUTIFUL GIRL",
    title: "A Moment of You",
    text: "Somewhere between the moment and the memory, there was you. ❤️"
  },

  "puri_together.jpeg": {
    number: "03 · OUR PURI CHAPTER",
    title: "Not a Perfect Trip",
    text: "A perfect memory doesn't need a perfect plan."
  },

  "Amrita_Family.jpeg": {
    number: "04 · YOUR LITTLE WORLD",
    title: "Family ❤️",
    text: "Different opinions, different lives, different places — but one heart that always cares."
  },

  "Amrita_Friend.jpeg": {
    number: "05 · THE FRIENDS CHAPTER",
    title: "Just Keep Laughing ❤️",
    text: "A horror movie, a little fear, and a lot of laughter with Rupkatha."
  },

  "Amrita_Everyone.jpeg": {
    number: "06 · EVERYONE, TOGETHER",
    title: "One Family. One Heart.",
    text: "Everyone may live apart, but love has never needed the same address."
  },

  "Amrita_Pub.jpeg": {
    number: "07 · A LITTLE MORE OF YOU",
    title: "Those Eyes",
    text: "One look, and suddenly the whole room disappears."
  },

  "Amrita_Wings.jpeg": {
    number: "08 · A LITTLE MORE OF YOU",
    title: "My Angel",
    text: "Maybe the wings were in the background, but to me they always belonged to you."
  },

  "Amrita_Saree.jpeg": {
    number: "09 · A LITTLE MORE OF YOU",
    title: "Elegance, Unfiltered",
    text: "Some beauty doesn't need anything extra."
  }

};


/* =========================================
   FIND ALL PHOTOS
   ========================================= */

const allPhotos =
  document.querySelectorAll("img");


allPhotos.forEach((image) => {

  const imageSrc =
    image.getAttribute("src") || "";

  const fileName =
    imageSrc.split("/").pop().split("?")[0];


  if (!photoInfo[fileName]) {
    return;
  }


  /* Make image clickable */

  image.classList.add("clickable-photo");


  image.addEventListener("click", () => {

    const info =
      photoInfo[fileName];


    lightboxImage.src =
      image.src;

    lightboxImage.alt =
      image.alt || info.title;


    lightboxNumber.textContent =
      info.number;

    lightboxTitle.textContent =
      info.title;

    lightboxText.textContent =
      info.text;


    photoLightbox.classList.add("active");

    document.body.style.overflow =
      "hidden";

  });

});


/* =========================================
   CLOSE FUNCTION
   ========================================= */

function closePhotoLightbox() {

  photoLightbox.classList.remove("active");

  document.body.style.overflow =
    "";

}


/* =========================================
   CLOSE BUTTON
   ========================================= */

lightboxClose.addEventListener(
  "click",
  closePhotoLightbox
);


/* =========================================
   CLICK OUTSIDE IMAGE
   ========================================= */

photoLightbox.addEventListener(
  "click",
  (event) => {

    if (
      event.target === photoLightbox
    ) {

      closePhotoLightbox();

    }

  }
);


/* =========================================
   ESC KEY
   ========================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      photoLightbox.classList.contains("active")
    ) {

      closePhotoLightbox();

    }

  }
);