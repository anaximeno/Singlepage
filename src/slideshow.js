let currentIndex = 0;
let slideChanged = false;
const CHANGE_SLIDE_TIME_INTERVAL = 6500;
const SLIDESID = $('.slides').children();


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


class Node {
    prev = undefined;
    next = undefined;

    constructor(slide) {
        this.slide = slide;
    }

    setPrev = (node) => this.prev = node;
    setNext = (node) => this.next = node;
}


class CircularDoublyLinkedList {
    head = undefined;
    constructor(slides) {
        slides.forEach(slide => {
            this.insert(slide);
        });
    }

    // The only method created is insert,
    // since it is the only one needed.

    insert(slide) {
        if (this.head === undefined) {
            this.head = new Node(slide);
        } else {
            for (node = this.head ; node.next != undefined ; node = node.next) ;
            node.setNext(new Node(slide));
            node.next.setPrev(node);
            node.next.setNext(this.head);
            this.head.setPrev(node.next);
        }
    }
}


class Slideshow {
    currentIndex = 0;
    prevIndex = 0;
    slideWasChanged = false;
	constructor(slides, timeInterval) {
		this.slides = 
		this.time = timeInterval;
	}

	goToTheRightSlideIndex() {
		this.prevIndex = this.currentIndex;
		this.currentIndex = (this.prevIndex + 1) % this.slides.length;
	}

	goToTheLeftSlideIndex() {
		this.prevIndex = this.currentIndex;
		this.currentIndex = this.prevIndex > 0 ? this.prevIndex - 1 : this.slide.length;
	}
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
        // $(SLIDESID[currentIndex]).hide();
        currentIndex = nextSlideIndex();
        hidePreviousIndex();
        showCurrentIndex();
        slideChanged = true;
    });

    prevBtn.click(() => {
        $(SLIDESID[currentIndex]).hide();
        currentIndex = prevSlideIndex();
        showCurrentIndex();
        slideChanged = true;
    });
    console.log(new CircularDoublyLinkedList(SLIDESID));
    runSlideshow(CHANGE_SLIDE_TIME_INTERVAL);
})();
