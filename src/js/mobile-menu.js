(() => {
  const mobileMenu = document.querySelector(
    '.js-menu-container',
  );
  const openMenuBtn =
    document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector(
    '.js-close-menu',
  );
  const menuBtn = document.querySelectorAll(
    '.mobile-menu a',
  );

  const backdrop = document.querySelector(
    '.js-menu-backdrop',
  );

  if (
    !mobileMenu ||
    !openMenuBtn ||
    !closeMenuBtn ||
    !menuBtn ||
    !backdrop
  )
    return;

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true';

    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    document.body.classList.toggle(
      'body-scroll-lock',
      !isMenuOpen,
    );

    backdrop.classList.toggle('is-open', !isMenuOpen);
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);
  menuBtn.forEach((item) => {
    item.addEventListener('click', toggleMenu);
  });

  // Close the mobile menu on wider screens if the device orientation changes
  window
    .matchMedia('(min-width: 1440px)')
    .addEventListener('change', (e) => {
      if (!e.matches) return;
      mobileMenu.classList.remove('is-open');
      openMenuBtn.setAttribute('aria-expanded', false);
      document.body.classList.remove('body-scroll-lock');
    });
})();
