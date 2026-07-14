const reviewRotator = document.querySelector('[data-review-rotator]');

if (reviewRotator) {
  const reviewCards = Array.from(reviewRotator.querySelectorAll('[data-review-card]'));

  if (reviewCards.length > 1) {
    let activeIndex = reviewCards.findIndex((card) => card.classList.contains('is-active'));

    if (activeIndex === -1) {
      activeIndex = 0;
      reviewCards[activeIndex].classList.add('is-active');
    }

    const fadeDuration = 450;

    const setRotatorHeight = () => {
      const tallestCard = Math.max(...reviewCards.map((card) => card.offsetHeight));
      reviewRotator.style.height = `${tallestCard}px`;
    };

    const showNextReview = () => {
      const currentCard = reviewCards[activeIndex];
      currentCard.classList.remove('is-active');

      window.setTimeout(() => {
        activeIndex = (activeIndex + 1) % reviewCards.length;
        reviewCards[activeIndex].classList.add('is-active');
        setRotatorHeight();
      }, fadeDuration);
    };

    setRotatorHeight();
    window.addEventListener('resize', setRotatorHeight);
    window.setInterval(showNextReview, 5000);
  }
}