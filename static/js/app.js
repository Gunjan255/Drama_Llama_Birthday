
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
