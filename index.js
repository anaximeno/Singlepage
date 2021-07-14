function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}


class SlideShower 
{
    constructor(slides, changetime, reference)
    {
        this.slides = slides;
        this.changetime = changetime;
        this.ref = reference;
        this.current_index = 0;
    }

    go_next()
    {
        this.current_index++;
        if (this.current_index < 0 || this.current_index >= this.slides.length)
            this.current_index = 0;
    }

    go_prev()
    {
        this.current_index--;
        if (this.current_index < 0 || this.current_index >= this.slides.length)
            this.current_index = this.slides.length - 1;
    }

    show()
    {
        var slide_img = document.getElementById(this.ref.image);
        var slide_text = document.getElementById(this.ref.text);
        var slide_num = document.getElementById(this.ref.num);

        slide_img.src = this.slides[this.current_index].src;
        slide_text.innerHTML = this.slides[this.current_index].text;
        slide_num.innerHTML = (this.current_index+1) + '/' + this.slides.length;
        this.go_next();
    }

    async animate_slides ()
    {
        do {
            this.show();
            await sleep(this.changetime);
        } while (true);
    };
}


class ThemeMode
{
    constructor(refs, dark_colors, light_colors)
    {
    this.ref = refs;
    this.dark_colors = dark_colors;
    this.light_colors = light_colors;
    this.is_day = true;
    this.change_colors = (colors) => {
        $(this.ref.texts).css('color', colors.texts);
        $(this.ref.back01).css('background-color', colors.back01);
        $(this.ref.back02).css('background-color', colors.back02);
        $(this.ref.back03).css('background-color', colors.back03);
        $(this.ref.shadow01).css('box-shadow', colors.shadow01);
        $(this.ref.shadow02).css('box-shadow', colors.shadow02);
    } 
    this.goto_dark_mode = () => {
        this.change_colors(this.dark_colors);
        this.is_day = false;
    }
    this.goto_light_mode = () => {
        this.change_colors(this.light_colors);
        this.is_day = true;
    }
    this.change_mode = async () => {
        gsap.to(this.ref.theme_icon, {duration: .15, opacity: 0});
        gsap.to(this.ref.theme_icon, {duration: .19, x: "50px", y: "-50px", ease: "circ.out"});

        await sleep(180);
        $(this.ref.theme_icon).attr('src', this.is_day ? 'imagens/moon.svg' : 'imagens/sun.svg');

        gsap.to(this.ref.theme_icon, {duration: .17, opacity: 1, delay: 0.19});
        gsap.to(this.ref.theme_icon, {duration: .19, x: "0px", y: "0px", delay: 0.19, ease: "circ.out"});

        await sleep(190);
        if (this.is_day) 
            this.goto_dark_mode();
        else this.goto_light_mode();
    }
    }
}