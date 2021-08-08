// TODO: change this file
const isDay = () => {
    let date = new Date();
    let hours = date.getHours();
    let isDay = hours >= 7 && hours < 18 ? true : false;
    return isDay;
}


class ThemeMode
{
    constructor(refs, dark_colors, light_colors)
    {
        this.ref = refs;
        this.dark_colors = dark_colors;
        this.light_colors = light_colors;
        this.isDay = true;
    }

    change_colors(colors)
    {
        $(this.ref.texts).css('color', colors.texts);
        $(this.ref.back01).css('background-color', colors.back01);
        $(this.ref.back02).css('background-color', colors.back02);
        $(this.ref.back03).css('background-color', colors.back03);
        $(this.ref.shadow01).css('box-shadow', colors.shadow01);
        $(this.ref.shadow02).css('box-shadow', colors.shadow02);
    }

    goto_dark_mode()
    {
        this.change_colors(this.dark_colors);
        this.isDay = false;
    }

    goto_light_mode()
    {
        this.change_colors(this.light_colors);
        this.isDay = true;
    }

    async change_mode()
    {
        gsap.to(this.ref.theme_icon, {duration: .15, opacity: 0});
        gsap.to(this.ref.theme_icon, {duration: .19, x: "50px", y: "-50px", ease: "circ.out"});

        await sleep(180);
        $(this.ref.theme_icon).attr('src', this.isDay ? 'imagens/moon.svg' : 'imagens/sun.svg');

        gsap.to(this.ref.theme_icon, {duration: .17, opacity: 1, delay: 0.19});
        gsap.to(this.ref.theme_icon, {duration: .19, x: "0px", y: "0px", delay: 0.19, ease: "circ.out"});

        await sleep(190);
        if (this.isDay)
            this.goto_dark_mode();
        else this.goto_light_mode();
    }

}


(function init_theme() {
    const item_refs = {
        theme_icon: '#theme-icon',
        texts: '#logo, .text, #assunto-1, #about, .nav, \
        .header, .footer, .footer-down, .header-down, #assunto-2',
        back01: 'body',
        back02: '.fullbody',
        back03: '.header, .footer, .footer-down, .header-down',
        shadow01: '.header',
        shadow02: '.footer'
    }
    const dark_colors = {
        texts: "#fff",
        back01: "#101010",
        back02: "#191919",
        back03: "#121212",
        shadow01: "2px -1px 19px 9px rgba(0,0,0,0.9)",
        shadow02: "2px 4px 19px 9px rgba(0,0,0,0.9)"
    }
    const light_colors = {
        texts: "#191919",
        back01: "#fff",
        back02: "#fff",
        back03: "#fff",
        shadow01: "none",
        shadow02: "none"
    }
    const theme_icon = $('#theme-icon');
    const theme_mode = new ThemeMode(item_refs, dark_colors, light_colors, isDay);

    if ( !isDay() )
    {
        theme_icon.attr('src', 'imagens/moon.svg');
        theme_mode.goto_dark_mode();
    }

    // console.log('Is day: ' + isDay());

    theme_icon.click(async () => {
        theme_mode.change_mode();
    });
})();
