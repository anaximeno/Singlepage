let lightModeEnabled = true;

const MOON = Symbol("moon");
const SUN = Symbol("sun");


const DARK_BLACKEY_THEME = {
    texts: "#fff",
    back01: "#101010",
    back02: "#191919",
    back03: "#121212",
    shadow01: "2px -1px 19px 9px rgba(0,0,0,0.9)",
    shadow02: "2px 4px 19px 9px rgba(0,0,0,0.9)",
    iconRef: "moon"
}


const LIGHT_WHITEY_THEME = {
    texts: "#191919",
    back01: "#fff",
    back02: "#fff",
    back03: "#fff",
    shadow01: "none",
    shadow02: "none",
    iconRef: "sun"
}


const ELEMENTS_REFERENCIES = {
    texts: '#logo, .text, #assunto-1, #about, .nav, \
    .header, .footer, .footer-down, .header-down, #assunto-2, button',
    back01: 'body',
    back02: '.fullbody',
    back03: '.header, .footer, .footer-down, .header-down',
    shadow01: '.header',
    shadow02: '.footer'
}


const isDayTime = () => {
    const hours = (new Date()).getHours();
    return hours >= 7 && hours < 18;
}


const changeThemeTo = (theme) => {
    const elements = ELEMENTS_REFERENCIES;
    $(elements.texts).css('color', theme.texts);
    $(elements.back01).css('background-color', theme.back01);
    $(elements.back02).css('background-color', theme.back02);
    $(elements.back03).css('background-color', theme.back03);
    $(elements.shadow01).css('box-shadow', theme.shadow01);
    $(elements.shadow02).css('box-shadow', theme.shadow02);
}


const changeIconTo = (symbol) => {
    const sun = document.getElementById(LIGHT_WHITEY_THEME.iconRef);
    const moon = document.getElementById(DARK_BLACKEY_THEME.iconRef);
    switch (symbol) {
        case SUN:
            sun.hidden = false;
            moon.hidden = true;
            break;
        case MOON:
            sun.hidden = true;
            moon.hidden = false;
            break;
        default:
            throw TypeError("Wrong type for changeIconTo, expected SUN or MOON");
    }    
}


const darkMode = () => {
    changeThemeTo(DARK_BLACKEY_THEME);
    lightModeEnabled = false;
}


const lightMode = () => {
    changeThemeTo(LIGHT_WHITEY_THEME);
    lightModeEnabled = true;
}


const changeMode = async (animate = true, sleepTime = 200) => {
    const themeIcon = '.icon';
    if (animate === true) {
        gsap.to(themeIcon, {duration: .15, opacity: 0});
        gsap.to(themeIcon, {
            duration: .19,
            x: "50px",
            y: "-50px",
            ease: "circ.out"
        });

        await sleep(sleepTime * 0.6);
        changeIconTo(lightModeEnabled ? MOON : SUN);
        await sleep(sleepTime * 0.4);

        gsap.to(themeIcon, {duration: .17, opacity: 1, delay: 0.19});
        gsap.to(themeIcon, {
            duration: .19,
            x: "0px",
            y: "0px",
            delay: 0.19,
            ease: "circ.out"
        });
        await sleep(sleepTime * 1.25);
    } else {
        changeIconTo(lightModeEnabled ? MOON : SUN);
    }

    if (lightModeEnabled)
        darkMode();
    else
        lightMode();
}


(function run (msg) {
    const icon = $(".icon");

    if (isDayTime() === false)
        changeMode(false);

    icon.click(async () => { changeMode(); });
    console.log(msg);
})("Single Page");