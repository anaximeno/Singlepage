const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


class Node {
    next = undefined;
    prev = undefined;
    value = undefined;

    constructor(value) {
        this.value = value;
    }

    static valorize(value) {
        return value !== Node ? new Node(value) : value;
    }

    addNext(value) {
        value = Node.valorize(value);
        if (this.next !== undefined) {
            let node = this.next;
            value.prev = this;
            value.next = node;
            this.next = value;
            node.prev = value;
        } else {
            value.prev = this;
            this.next = value;
        }
    }

    addPrev(value) {
        value = Node.valorize(value);
        if (this.prev !== undefined) {
            let node = this.prev;
            value.next = this;
            value.prev = node;
            this.prev = value;
            node.next = value;
        } else {
            value.next = this; 
            this.prev = value;
        }
    }
}


class SlideShower {
    firstSlide = undefined;
    lastSlide = undefined;
    currentSlide = undefined;
    slides = undefined;
    __slideWasChanged = false;

	constructor(slides, timeInterval = 6500) {
        this.slides = slides;
        this.interval = timeInterval;
        let slide;
        for (let i = 0 ; i < this.slides.length ; ++i) {
            slide = $(this.slides[i]);
            slide.hide();
            this.addSlide(slide);
        }
	}

    addSlide(slide) {
        if (this.firstSlide === undefined) {
            this.firstSlide = new Node(slide);
            this.lastSlide = this.firstSlide;
            // Only show the first slide initially
            this.firstSlide.value.show();
            this.currentSlide = this.firstSlide;
        } else {
            // Append the new slide at the end
            let node = this.lastSlide;
            node.addNext(slide);
            this.lastSlide = node.next;
        }
    }

    goToTheNextSlide() {
        this.currentSlide = this.currentSlide.next !== undefined ?
            this.currentSlide.next : this.firstSlide;
    }

    goToThePrevSlide() {
        this.currentSlide = this.currentSlide.prev !== undefined ?
            this.currentSlide.prev : this.lastSlide;
    }

    hideCurrentSlide() {
        this.currentSlide.value.hide();
    }

    showCurrentSlide() {
        this.currentSlide.value.show();
    }

    showNextSlide() {
        this.hideCurrentSlide();
        this.goToTheNextSlide();
        this.showCurrentSlide();
    }

    showPrevSlide() {
        this.hideCurrentSlide();
        this.goToThePrevSlide();
        this.showCurrentSlide();
    }

    async run() {
        while (true) {
            await sleep(this.interval);
            if (!this._slideChangeNoticed()) {
                this.showNextSlide();
            } else continue;
        }
    }

    _slideChangeNoticed() {
        if (this.__slideWasChanged) {
            this.__slideWasChanged = false;
            return true;
        } else return false;
    }
}


(() => {
    const SLIDES = $('.slides').children().toArray();
    const slideshow = new SlideShower(SLIDES, 6500);

    $('#next-btn').click(() => {
        slideshow.showNextSlide();
        slideshow.__slideWasChanged = true;
    });

    $('#prev-btn').click(() => {
        slideshow.showPrevSlide();
        slideshow.__slideWasChanged = true;
    });

    slideshow.run();
})();
