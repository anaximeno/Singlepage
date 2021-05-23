function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}


function SlideShower(slides, changetime, reference)
{
    this.slides = slides;
    this.changetime = changetime;
    this.ref = reference;
    this.current_index = 0;
    this.go_next = () => {
        this.current_index++;
        if (this.current_index < 0 || this.current_index >= this.slides.length)
            this.current_index = 0;
    }
    this.go_prev = () => {
        this.current_index--;
        if (this.current_index < 0 || this.current_index >= this.slides.length)
            this.current_index = this.slides.length - 1;
    }
    this.show = () => {
        var slide_img = document.getElementById(this.ref.image);
        var slide_text = document.getElementById(this.ref.text);
        var slide_num = document.getElementById(this.ref.num);

        slide_img.src = this.slides[this.current_index].src;
        slide_text.innerHTML = this.slides[this.current_index].text;
        slide_num.innerHTML = (this.current_index+1) + '/' + this.slides.length;
        this.go_next();
    }
    this.animate_slides = async function() {
        do {
            this.show();
            await sleep(this.changetime);
        } while (true);
    }
}
