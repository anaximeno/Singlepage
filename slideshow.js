let currentIndex = 0;
let slideChanged = false;
const CHANGE_SLIDE_TIME_INTERVAL = 6000;
const SLIDESID = $('.slides').children();


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const nextSlideIndex = () => {
    nIndex = currentIndex+1;
    if (nIndex < 0 || nIndex >= SLIDESID.length)
        nIndex = 0;
    return nIndex;
}


const prevSlideIndex = () => {
    pIndex = currentIndex-1;
    if (pIndex < 0 || pIndex >= SLIDESID.length)
        pIndex = SLIDESID.length-1;
    return pIndex;
}


const runSlideshow = async (changeTime = 6500) => {
    hidePreviousIndex();
    showCurrentIndex();

    // Sleep some time then show the next slide
    await sleep(changeTime);
    
    // If slide was not changed go to next slide
    if (slideChanged === false)
        currentIndex = nextSlideIndex();
    else
        slideChanged = false;

    // Recusive call
    runSlideshow();
}


const showCurrentIndex = () => {
    const currentSlide = $(SLIDESID[currentIndex]);
    currentSlide.show();
}

const hidePreviousIndex = () => {
    const prevSlide = $(SLIDESID[prevSlideIndex()]);
    prevSlide.hide();
}


(function (){
    const nextBtn = $('#next-btn');
    const prevBtn = $('#prev-btn');

    nextBtn.click(() => {
        hidePreviousIndex();
        $(SLIDESID[currentIndex]).hide();
        currentIndex = nextSlideIndex();
        showCurrentIndex();
        slideChanged = true;
    });

    prevBtn.click(() => {
        $(SLIDESID[currentIndex]).hide();
        currentIndex = prevSlideIndex();
        showCurrentIndex();
        slideChanged = true;
    });

    runSlideshow(CHANGE_SLIDE_TIME_INTERVAL);
})();
