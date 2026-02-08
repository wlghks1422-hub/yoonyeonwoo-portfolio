// ================= SCROLL REVEAL =================
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", ()=>{
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight-100){
      el.classList.add("show"); // 스크롤 안으로 들어오면 등장
    }
  });
});

// ================= HEADER 메뉴 클릭 -> 스크롤 =================
document.querySelectorAll(".nav a").forEach(link=>{
  link.addEventListener("click", e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({behavior:"smooth"});
    document.querySelector(".nav").classList.remove("active"); // 모바일 메뉴 닫기
  });
});





// ================= MOBILE MENU =================
document.querySelector(".menu-btn").addEventListener("click", ()=>{
  document.querySelector(".nav").classList.toggle("active");
});

// ================= HERO 영상 + Skills (최종 안정판) =================
const topPanel = document.querySelector(".top-panel");
const bottomPanel = document.querySelector(".bottom-panel");
const heroText = document.querySelector(".hero-text");

let split = 0;            // 0 = 닫힘 / 100 = 열림
let isLocked = true;

// 처음 로딩 시에만 스크롤 잠금
document.body.style.overflow = "hidden";

window.addEventListener("wheel", (e) => {
  if (!isLocked) return;

  e.preventDefault();

  split += e.deltaY > 0 ? 6 : -6;
  split = Math.max(0, Math.min(100, split));

  topPanel.style.transform = `translateY(-${split}%)`;
  bottomPanel.style.transform = `translateY(${split}%)`;

  heroText.style.opacity = split > 40 ? "1" : "0";

  // 완전히 열렸을 때만 스크롤 해제
  if (split === 100) {
    isLocked = false;
    document.body.style.overflow = "auto";
  }

}, { passive: false });

// 👇 핵심: 스크롤 맨 위로 올라왔을 때만 Hero 닫기
window.addEventListener("scroll", () => {
  if (window.scrollY === 0 && !isLocked) {
    isLocked = true;
    split = 0;

    topPanel.style.transform = "translateY(0)";
    bottomPanel.style.transform = "translateY(0)";
    heroText.style.opacity = "0";

    // ❗ 여기서 overflow 다시 막지 않음
  }
});



/* ================= UI/UX DARK MODE ================= */

// ================= UI/UX DARK MODE (DESKTOP OK) =================
const uiuxSection = document.querySelector('#uiux');

const darkObserver = new IntersectionObserver(
  ([entry]) => {
    document.body.classList.toggle('dark', entry.isIntersecting);
  },
  {
    rootMargin: "-40% 0px -40% 0px"
  }
);

darkObserver.observe(uiuxSection);



// ================= MODAL (Work & Design 클릭) =================
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const closeBtn = modal.querySelector(".close");
const prevBtn = modal.querySelector(".prev");
const nextBtn = modal.querySelector(".next");

let images = [];
let current = 0;

document.querySelectorAll(".work-item").forEach(item => {
  item.addEventListener("click", () => {
    images = JSON.parse(item.dataset.images || "[]");
    current = 0;

    modalImg.src = images[current];
    modalTitle.textContent = item.dataset.title || "";
    modalDesc.textContent = item.dataset.desc || "";

    modal.style.display = "flex";
  });
});

prevBtn.onclick = () => {
  if (!images.length) return;
  current = (current - 1 + images.length) % images.length;
  modalImg.src = images[current];
};

nextBtn.onclick = () => {
  if (!images.length) return;
  current = (current + 1) % images.length;
  modalImg.src = images[current];
};

closeBtn.onclick = () => modal.style.display = "none";

modal.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});


// 좌우 버튼

// 닫기
closeBtn.addEventListener("click", () => modal.style.display = "none");
modal.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});



// 카카오 QR 팝업
const kakaoBtn = document.querySelector('.popup-button');

kakaoBtn.addEventListener('click', () => {
  const imgSrc = kakaoBtn.dataset.img;

  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.inset = '0';
  popup.style.background = 'rgba(0,0,0,0.8)';
  popup.style.display = 'flex';
  popup.style.justifyContent = 'center';
  popup.style.alignItems = 'center';
  popup.style.zIndex = '3000';

  popup.innerHTML = `
    <img src="${imgSrc}" style="max-width:300px;border-radius:10px">
  `;

  popup.addEventListener('click', () => popup.remove());
  document.body.appendChild(popup);
});


// ================= DESIGN MODAL =================


document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));
    const headerOffset = 80;
    const y =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      headerOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });

    document.querySelector(".nav").classList.remove("active");
  });
});

const designModal = document.getElementById("designModal");
const designModalImg = document.getElementById("designModalImg");

document.querySelectorAll(".design-item img").forEach(img => {
  img.addEventListener("click", () => {
    designModal.classList.add("active");
    designModalImg.src = img.src;
  });
});

designModal.addEventListener("click", () => {
  designModal.classList.remove("active");
});


