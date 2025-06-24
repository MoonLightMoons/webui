// 导航栏响应式功能
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  burger.classList.toggle('toggle');
});

// 轮播图功能
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(n) {
  slides.forEach(slide => slide.classList.remove('active'));
  currentSlide = (n + totalSlides) % totalSlides;
  slides[currentSlide].classList.add('active');
}

document.querySelector('.next').addEventListener('click', () => {
  showSlide(currentSlide + 1);
});

document.querySelector('.prev').addEventListener('click', () => {
  showSlide(currentSlide - 1);
});

// 自动轮播
let slideInterval = setInterval(() => {
  showSlide(currentSlide + 1);
}, 5000);

// 鼠标悬停时暂停轮播
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

slider.addEventListener('mouseleave', () => {
  slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
});

// 返回顶部按钮
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
