document.addEventListener('DOMContentLoaded', function () {
  const popup = document.getElementById('cookiePopup');
  const declineCookiesBtn = document.getElementById(
    'declineCookiesBtn',
  );
  const acceptCookiesBtn = document.getElementById(
    'acceptCookiesBtn',
  );
  // const popupCloseBtn = document.querySelector(
  //   '.popup-close-btn',
  // );

  const popupClosed = localStorage.getItem(
    'cookiePopupClosed',
  );

  if (!popup) {
    return;
  }

  if (!popupClosed || popupClosed === 'false') {
    popup.style.display = 'block';
  } else {
    closePopup();
  }

  function closePopup() {
    popup.style.display = 'none';
    localStorage.setItem('cookiePopupClosed', 'true');
  }

  window.openCookiePopup = function () {
    localStorage.setItem('cookiePopupClosed', 'false');
    popup.style.display = 'block';
  };

  declineCookiesBtn.addEventListener('click', closePopup);
  acceptCookiesBtn.addEventListener('click', closePopup);
  // popupCloseBtn.addEventListener('click', closePopup);
});
