
const openBtn = document.getElementById("openBtn");
const heartLayer = document.getElementById("hearts");

openBtn.addEventListener("click", () => {
  document.querySelector(".intro").scrollIntoView({behavior:"smooth"});
  burstHearts(28);
  fetch("/heartbeat", {method:"POST"}).catch(()=>{});
});

function burstHearts(count){
  for(let i=0;i<count;i++){
    const h=document.createElement("span");
    h.className="heart";
    h.textContent=["♥","♡","❤","✦"][Math.floor(Math.random()*4)];
    h.style.left=(15+Math.random()*70)+"%";
    h.style.bottom=(8+Math.random()*18)+"%";
    h.style.setProperty("--drift",(Math.random()*160-80)+"px");
    h.style.animationDelay=(Math.random()*.7)+"s";
    h.style.fontSize=(12+Math.random()*22)+"px";
    heartLayer.appendChild(h);
    setTimeout(()=>h.remove(),5500);
  }
}

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

// Tiny developer Easter egg: type "python" anywhere on the page.
let typed="";
window.addEventListener("keydown",(e)=>{
  typed=(typed+e.key.toLowerCase()).slice(-6);
  if(typed==="python"){
    burstHearts(50);
    document.body.animate(
      [{filter:"brightness(1)"},{filter:"brightness(1.35)"},{filter:"brightness(1)"}],
      {duration:900}
    );
  }
});
/* =========================================
   DRAMA LLAMA — LIVE BIRTHDAY CELEBRATION
   ========================================= */

const birthdayCelebration =
  document.getElementById("birthdayCelebration");

const closeCelebration =
  document.getElementById("closeCelebration");

const celebrateBtn =
  document.getElementById("celebrateBtn");

const confettiLayer =
  document.getElementById("confettiLayer");


/* Create confetti */

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


/* Start celebration */

function startBirthdayCelebration() {

  if (!birthdayCelebration) return;

  birthdayCelebration.classList.remove(
    "hidden"
  );

  createConfetti(140);

  burstHearts(45);

}


/* Close celebration */

function closeBirthdayCelebration() {

  if (!birthdayCelebration) return;

  birthdayCelebration.classList.add(
    "hidden"
  );

}


/* Automatically celebrate when she opens
   the website */

window.addEventListener(
  "load",
  () => {

    setTimeout(() => {

      startBirthdayCelebration();

    }, 700);

  }
);


/* Continue */

if (closeCelebration) {

  closeCelebration.addEventListener(
    "click",
    closeBirthdayCelebration
  );

}


/* Celebrate again */

if (celebrateBtn) {

  celebrateBtn.addEventListener(
    "click",
    startBirthdayCelebration
  );

}