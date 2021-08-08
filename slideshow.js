/* Functional Implementation of a slideshower. */

const SLIDE_IMG_ID = 'slide-img';
const SLIDE_TEXT_ID = 'slide-text';
const SLIDE_NUM_ID = 'slide-num';
const NEXT_BUTTON_ID = 'next-btn';
const PREV_BUTTON_ID = 'prev-btn';
let currentIndex = 0;
let slideChanged = false;
// Miliseconds for waiting before change slides
const CHANGE_TIME = 7500;


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const goNextSlideIndex = (slides) => {
    currentIndex += 1;
    if (currentIndex < 0 || currentIndex >= slides.length)
        currentIndex = 0;
    return currentIndex;
}


const goPrevSlideIndex = (slides) => {
    currentIndex -= 1;
    if (currentIndex < 0 || currentIndex >= slides.length)
        currentIndex = slides.length - 1;
    return currentIndex;
}

const runSlideshow = async (slides, changeTime = 6500) => {
    showCurrentIndex(slides);

    // Sleep some time then show the next slide
    await sleep(changeTime);
    
    // If slide was not changed go to next slide
    if (slideChanged === false)
        goNextSlideIndex(slides);
    else
        slideChanged = false;

    // Recusive call
    runSlideshow(slides);
}


const showCurrentIndex = (slides) => {
    const slideImg = document.getElementById(SLIDE_IMG_ID);
    const slideText  = document.getElementById(SLIDE_TEXT_ID);
    const slideNum = document.getElementById(SLIDE_NUM_ID);

    slideImg.src = slides[currentIndex].src;
    slideText.innerText = slides[currentIndex].title;
    slideNum.innerText = currentIndex+1;
}


const initSlideshow = () => {
    const nextBtn = document.getElementById(NEXT_BUTTON_ID);
    const prevBtn = document.getElementById(PREV_BUTTON_ID);
    const slides = [
        {
            src: "imagens/african.png",
            title: "I am african with pride"
        },
        {
            src: "imagens/updategrade.png",
            title: "Up to the date and Up the grade"
        },
        {
            src: "imagens/playpretend.jpeg",
            title: "Use the play pretend bunny"
        },
        {
            src: "imagens/archpacman.png",
            title: "Blue Pacamano from arch"
        }
    ];

    nextBtn.addEventListener('click', () => {
        goNextSlideIndex(slides);
        showCurrentIndex(slides);
        slideChanged = true;
    });
    prevBtn.addEventListener('click', () => {
        goPrevSlideIndex(slides);
        showCurrentIndex(slides);
        slideChanged = true;
    });

    runSlideshow(slides);
}

// Initialize the slideshow
initSlideshow();