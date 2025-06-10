const faqItems = document.querySelectorAll('.faq-item');
// const faqList = document.querySelector('.faq-list');

document.addEventListener('DOMContentLoaded', () => {
  faqItems.forEach((item) => {
    const buttonOpen = item.querySelector(
      '.faq-toggle-question',
    );
    const wrapAnswer = item.querySelector(
      '.faq-wrap-answer',
    );
    const buttonClose = item.querySelector(
      '.faq-toggle-answer',
    );
    const wrapQuestion = item.querySelector(
      '.faq-wrap-question',
    );

    // const backgroundBlock = item.querySelector(
    //   '.faq-background-block',
    // );

    // const myHeight = faqList.scrollHeight + 'px';

    const toggle = () => {
      const isOpen =
        wrapAnswer.classList.contains('active');

      if (!isOpen) {
        //відкритий
        wrapAnswer.classList.add('active');
        wrapQuestion.classList.add('active');
        buttonOpen.style.display = 'none';
        buttonClose.classList.add('active');
        faqItems.forEach((it) => {
          const question = it.querySelector(
            '.faq-wrap-question',
          );
          if (
            question &&
            question.classList.contains('active')
          )
            it.classList.add('active');
        });
        // faqList.style.overflow = 'scroll';
        // faqList.style.maxHeight = myHeight;
        // backgroundBlock.classList.remove('none');
      } else {
        wrapAnswer.classList.remove('active');
        wrapQuestion.classList.remove('active');
        buttonOpen.style.display = 'block';
        buttonClose.classList.remove('active');
        faqItems.forEach((it) => {
          const question = it.querySelector(
            '.faq-wrap-question',
          );
          if (
            question &&
            !question.classList.contains('active')
          )
            it.classList.remove('active');
        });
        // backgroundBlock.classList.add('none');
      }
    };

    buttonOpen.addEventListener('click', toggle);
    buttonClose.addEventListener('click', toggle);
  });
});
