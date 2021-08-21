//https://im-developer.tistory.com/97

const slideList = document.querySelector(".slide_list");
const slideContents = document.querySelectorAll(".slide_content");
const slideBtnNext = document.querySelector(".slide_btn_next");
const slideBtnPrev = document.querySelector(".slide_btn_prev");
const slideLen = slideContents.length;
const slideWidth = 400;
const slideSpeed = 300;

slideList.style.width = `${slideWidth * (slideLen + 2)}px`;

let firstChild = slideList.firstElementChild;
let lastChild = slideList.lastElementChild;
let clonedFirst = firstChild.cloneNode(true);
let clonedLast = lastChild.cloneNode(true);

slideList.appendChild(clonedFirst);
slideList.insertBefore(clonedLast, slideList.firstElementChild);

slideList.style.transform = `translateX(-${slideWidth}px)`;

let curIndex = 0;
let curSlide = slideContents[curIndex];

// 페이지 네이션
const pagination = document.querySelector(".slide_pagination");
for (let i = 0; i < slideLen; ++i) {
  const li = document.createElement("li");
  li.classList.add("dot");
  if (i === 0) {
    li.classList.add("dot_active");
  }
  li.dataset.index = `${i}`;
  pagination.appendChild(li);
}

const pageDots = document.querySelectorAll(".dot");

slideBtnNext.addEventListener("click", () => {
  if (curIndex < slideLen) {
    slideList.style.transition = `${slideSpeed}ms`;
    slideList.style.transform = `translateX(-${slideWidth * (curIndex + 2)}px)`;
  }

  if (curIndex === slideLen - 1) {
    setTimeout(() => {
      slideList.style.transition = `${0}ms`;
      slideList.style.transform = `translateX(-${slideWidth}px)`;
    }, slideSpeed);
    curIndex = -1;
  }

  pageDots[curIndex === -1 ? slideLen - 1 : curIndex].classList.remove(
    "dot_active"
  );
  curIndex += 1;
  pageDots[curIndex].classList.add("dot_active");
});

slideBtnPrev.addEventListener("click", () => {
  if (curIndex >= 0) {
    slideList.style.transition = `${slideSpeed}ms`;
    slideList.style.transform = `translateX(-${slideWidth * curIndex}px)`;
  }
  console.log(curIndex);
  if (curIndex === 0) {
    setTimeout(() => {
      slideList.style.transition = `${0}ms`;
      slideList.style.transform = `translateX(-${slideWidth * slideLen}px)`;
    }, slideSpeed);

    curIndex = slideLen;
  }

  pageDots[curIndex === slideLen ? 0 : curIndex].classList.remove("dot_active");
  curIndex -= 1;
  pageDots[curIndex].classList.add("dot_active");
});

// 페이지네이션 이벤트추가
pagination.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    let curDot = document.querySelector(".dot_active");
    curDot.classList.remove("dot_active");
    curDot = e.target;
    curDot.classList.add("dot_active");
    curIndex = Number(curDot.dataset.index);
    slideList.style.transition = `${slideSpeed}ms`;
    slideList.style.transform = `translateX(-${slideWidth * (curIndex + 1)}px)`;
  }
});
