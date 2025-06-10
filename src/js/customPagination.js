export function setupCustomPagination(
  swiper,
  bulletCount = 3,
) {
  const paginationEl = document.querySelector(
    '.swiper-pagination-custom',
  );

  if (!paginationEl) return;

  // Очистити старі bullets
  paginationEl.innerHTML = '';

  // Створити bullets
  const bullets = [];
  for (let i = 0; i < bulletCount; i++) {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    bullet.dataset.index = i;
    paginationEl.appendChild(bullet);
    bullets.push(bullet);
  }

  function updateBullets() {
    let current = swiper.realIndex;

    // Якщо слайдів більше, ніж bulletCount, обмежити видимі кружечки
    let start = 0;

    if (swiper.slides.length > bulletCount) {
      if (current === 0) start = 0;
      else if (current === swiper.slides.length - 1)
        start = swiper.slides.length - bulletCount;
      else start = Math.max(current - 1, 0); // наприклад, 1,2,3... і т.д.
    }

    bullets.forEach((bullet, i) => {
      const slideIndex = start + i;
      bullet.classList.toggle(
        'swiper-pagination-bullet-active',
        slideIndex === current,
      );
      bullet.dataset.index = slideIndex;
    });
  }

  bullets.forEach((bullet) => {
    bullet.addEventListener('click', () => {
      const index = parseInt(bullet.dataset.index, 10);
      swiper.slideToLoop(index); // враховуючи loop
    });
  });

  swiper.on('slideChange', updateBullets);
  swiper.on('init', updateBullets);

  updateBullets(); // початкова ініціалізація
}
