const header = document.querySelector('.header');
const sections = document.querySelectorAll('.section');
const googleBtn = document.querySelector(
  '.navigation-item-link',
);
const navList = document.querySelector('.navigation-list');
const navLogo = navList.querySelector(
  '.navigation-item-logo',
);

const isPolicyPage = [
  '/privacyPolicy.html',
  '/termsConditions.html',
  '/cookiePolicy.html',
].includes(window.location.pathname);

function updateHeaderState(reachedSection = false) {
  const shouldExpandHeader = reachedSection || isPolicyPage;

  [
    [header, 'full-width'],
    [googleBtn, 'visible'],
    [navList, 'expanded'],
    [navLogo, 'expanded'],
  ].forEach(([el, cls]) => {
    el.classList.toggle(cls, shouldExpandHeader);
  });
}

updateHeaderState();

if (!isPolicyPage) {
  document.addEventListener('scroll', function () {
    const headerHeight = header.offsetHeight;
    let reachedSection = false;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom =
        sectionTop + section.offsetHeight;

      if (
        window.scrollY + headerHeight > sectionTop &&
        window.scrollY < sectionBottom
      ) {
        reachedSection = true;
      }
    });

    updateHeaderState(reachedSection);
  });
}
