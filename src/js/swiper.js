import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
// import { setupCustomPagination } from './customPagination';

let swipers = {};
// let isCharactersInit = false;
let isFeaturesInit = false;
let isPowerupsInit = false;
let isRoomInit = false;
let isMoodInit = false;
let isLevelsInit = false;
// let isAboutInit = false;
// let isgalleryInit = false;

function initSwiper(
  swiperName,
  selector,
  options,
  position,
  loop,
) {
  if (!swipers[swiperName]) {
    swipers[swiperName] = new Swiper(selector, {
      centeredSlides: position,
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
        dragSize: 16,
      },
      pagination: options.pagination,
      navigation: {
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      },
      allowTouchMove: true,
      breakpoints: options.breakpoints,

      loop: loop,
      // on: {
      //   init: function () {
      //     if (swiperName === 'gallery') {
      //       setupCustomPagination(this, 3);
      //     }
      //   },
      // },
    });
  }
}

// Ініціалізація всіх слайдерів EXAMPLE

// initSwiper(
//   'advantages',
//   '.mySwiper-advantages',
//   {
//     breakpoints: {
//       320: {
//         slidesPerView: 1.43,
//         spaceBetween: 20,
//         slidesOffsetBefore: 15,
//       },
//       1440: {
//         slidesPerView: 4.49,
//         spaceBetween: 24,
//         slidesOffsetBefore: 72,
//       },
//     },
//     pagination: {
//       el: '.swiper-pagination-custom',
//       type: 'bullets',
//       clickable: true,
//     },
//   },
//   false,
//   true,
// );

// initSwiper(
//   'features',
//   '.mySwiper-features',
//   {
//     breakpoints: {
//       320: {
//         slidesPerView: 1,
//         spaceBetween: 0,
//       },

//       1440: {
//         slidesPerView: 1.55,
//         spaceBetween: 59,
//         slidesOffsetBefore: 165,
//         slidesOffsetAfter: 165,
//       },
//     },
//     pagination: {
//       el: '.swiper-pagination-custom',
//       clickable: true,
//     },
//   },
//   false,
//   true,
// );

// initSwiper(
//   'reviews',
//   '.mySwiper-reviews',
//   {
//     breakpoints: {
//       320: {
//         slidesPerView: 1,
//       },
//       1440: {
//         slidesPerView: 3.32,
//         spaceBetween: 24,
//         slidesOffsetBefore: 72,
//         slidesOffsetAfter: 72,
//       },
//     },
//     pagination: {
//       el: '.swiper-pagination-custom',
//       type: 'bullets',
//       clickable: true,
//     },
//   },
//   false,
//   true,
// );

// initSwiper(
//   'play',
//   '.mySwiper-play',
//   {
//     breakpoints: {
//       320: {
//         slidesPerView: 1.5,
//         spaceBetween: 20,
//         slidesOffsetBefore: 15,
//         slidesOffsetAfter: 15,
//       },
//       1440: {
//         slidesPerView: 4.43,
//         spaceBetween: 24,
//         slidesOffsetBefore: 72,
//         slidesOffsetAfter: 72,
//       },
//     },
//     pagination: {
//       el: '.swiper-pagination-custom',
//       type: 'bullets',
//       clickable: true,
//     },
//   },
//   false,
//   true,
// );

function destroySwiper(swiperName) {
  if (swipers[swiperName]) {
    swipers[swiperName].destroy(true, true);
    delete swipers[swiperName];
  }
}

// перше завантаження
// handlecharactersSwiper();
handlefeaturesSwiper();
handlepowerupsSwiper();
handleroomSwiper();
handlemoodSwiper();
handlelevelsSwiper();
// handleaboutSwiper();
// handlegallerySwiper();

window.addEventListener('resize', () => {
  Object.keys(swipers).forEach((key) => {
    swipers[key].update();
  });
  // handlecharactersSwiper();
  handlefeaturesSwiper();
  handlepowerupsSwiper();
  handleroomSwiper();
  handlemoodSwiper();
  handlelevelsSwiper();
  // handleaboutSwiper();
  // handlegallerySwiper();
});

// features — тільки на desktop
// function handlefeaturesSwiper() {
//   if (window.innerWidth >= 1440 && !isFeaturesInit) {
//     initSwiper(
//       'features',
//       '.mySwiper-features',
//       {
//         breakpoints: {
//           1440: {
//             slidesPerView: 3.5,
//             spaceBetween: 24,
//             slidesOffsetBefore: 107,
//             slidesOffsetAfter: 107,
//           },
//         },
//       },
//       false,
//     );
//     isFeaturesInit = true;
//   } else if (window.innerWidth < 1440 && isFeaturesInit) {
//     destroySwiper('features');
//     isFeaturesInit = false;
//   }
// }

// characters — тільки на mobile
// function handlecharactersSwiper() {
//   if (window.innerWidth < 1440 && !isCharactersInit) {
//     initSwiper(
//       'characters',
//       '.mySwiper-characters',
//       {
//         breakpoints: {
//           320: {
//             slidesPerView: 'auto',
//             spaceBetween: 20,
//             slidesOffsetBefore: 15,
//             slidesOffsetAfter: 15,
//           },
//           375: {
//             slidesPerView: 1.45,
//             spaceBetween: 20,
//             slidesOffsetBefore: 15,
//             slidesOffsetAfter: 15,
//           },
//         },
//         pagination: {
//           el: '.swiper-pagination-custom',
//           type: 'bullets',
//           clickable: true,
//         },
//       },
//       false,
//       true,
//     );
//     isCharactersInit = true;
//   } else if (
//     window.innerWidth >= 1440 &&
//     isCharactersInit
//   ) {
//     destroySwiper('characters');
//     isCharactersInit = false;
//   }
// }

function handlefeaturesSwiper() {
  if (window.innerWidth < 1440 && !isFeaturesInit) {
    initSwiper(
      'features',
      '.mySwiper-features',
      {
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
        },
        pagination: {
          el: '.swiper-pagination-custom',
          type: 'bullets',
          clickable: true,
        },
      },
      false,
      true,
    );
    isFeaturesInit = true;
  } else if (window.innerWidth >= 1440 && isFeaturesInit) {
    destroySwiper('features');
    isFeaturesInit = false;
  }
}

function handlepowerupsSwiper() {
  if (window.innerWidth < 1440 && !isPowerupsInit) {
    initSwiper(
      'powerups',
      '.mySwiper-powerups',
      {
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
        },
        pagination: {
          el: '.swiper-pagination-custom',
          type: 'bullets',
          clickable: true,
        },
      },
      false,
      true,
    );
    isPowerupsInit = true;
  } else if (window.innerWidth >= 1440 && isPowerupsInit) {
    destroySwiper('powerups');
    isPowerupsInit = false;
  }
}

function handleroomSwiper() {
  if (window.innerWidth < 1440 && !isRoomInit) {
    initSwiper(
      'room',
      '.mySwiper-room',
      {
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 24,
          },
        },
        pagination: {
          el: '.swiper-pagination-custom',
          type: 'bullets',
          clickable: true,
        },
      },
      false,
      true,
    );
    isRoomInit = true;
  } else if (window.innerWidth >= 1440 && isRoomInit) {
    destroySwiper('room');
    isRoomInit = false;
  }
}

function handlemoodSwiper() {
  if (window.innerWidth < 1440 && !isMoodInit) {
    initSwiper(
      'mood',
      '.mySwiper-mood',
      {
        breakpoints: {
          320: {
            slidesPerView: 2.2,
            spaceBetween: 24,
          },
        },
        pagination: {
          el: '.swiper-pagination-custom',
          type: 'bullets',
          clickable: true,
        },
      },
      false,
      true,
    );
    isMoodInit = true;
  } else if (window.innerWidth >= 1440 && isMoodInit) {
    destroySwiper('mood');
    isMoodInit = false;
  }
}

function handlelevelsSwiper() {
  if (window.innerWidth < 1440 && !isLevelsInit) {
    initSwiper(
      'levels',
      '.mySwiper-levels',
      {
        breakpoints: {
          320: {
            slidesPerView: 1.3,
            spaceBetween: 16,
          },
        },
        pagination: {
          el: '.swiper-pagination-custom',
          type: 'bullets',
          clickable: true,
        },
      },
      false,
      true,
    );
    isLevelsInit = true;
  } else if (window.innerWidth >= 1440 && isLevelsInit) {
    destroySwiper('levels');
    isLevelsInit = false;
  }
}

// about — тільки на mobile
// function handleaboutSwiper() {
//   if (window.innerWidth < 1440 && !isAboutInit) {
//     initSwiper(
//       'about',
//       '.mySwiper-about',
//       {
//         breakpoints: {
//           320: {
//             slidesPerView: 1,
//             spaceBetween: 20,
//           },
//         },
//         pagination: {
//           el: '.swiper-pagination-custom',
//           type: 'bullets',
//           clickable: true,
//         },
//       },
//       false,
//       true,
//     );
//     isAboutInit = true;
//   } else if (window.innerWidth >= 1440 && isAboutInit) {
//     destroySwiper('about');
//     isAboutInit = false;
//   }
// }

// gallery — тільки на mobile
// function handlegallerySwiper() {
//   if (window.innerWidth < 1440 && !isgalleryInit) {
//     initSwiper(
//       'gallery',
//       '.mySwiper-gallery',
//       {
//         breakpoints: {
//           320: {
//             slidesPerView: 1.24,
//             spaceBetween: 16,
//             slidesOffsetBefore: 16,
//             slidesOffsetAfter: 16,
//           },
//         },
//         pagination: {
//           el: '.swiper-pagination-custom',
//           type: 'bullets',
//           clickable: true,
//         },
//       },
//       false,
//       true,
//     );
//     isgalleryInit = true;
//   } else if (window.innerWidth >= 1440 && isgalleryInit) {
//     destroySwiper('gallery');
//     isgalleryInit = false;
//   }
// }
