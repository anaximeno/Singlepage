/* Here was taken a more functional approach */
let lightModeEnabled;

const MOON = Symbol("moon");
const SUN = Symbol("sun");


const DARK_BLACKEY_THEME = {
    texts: "#fff",
    back01: "#101010",
    back02: "#191919",
    back03: "#121212",
    shadow01: "2px -1px 19px 9px rgba(0,0,0,0.9)",
    shadow02: "2px 4px 19px 9px rgba(0,0,0,0.9)",
    iconRef: "#moon"
}


const LIGHT_WHITEY_THEME = {
    texts: "#191919",
    back01: "#fff",
    back02: "#fff",
    back03: "#fff",
    shadow01: "none",
    shadow02: "none",
    iconRef: "#sun"
}


const REFS = {
    texts: `#logo, .text, #assunto-1, 
            #about, .nav, .nav a, .footer a,
            .header, .footer, .footer-down, 
            .header-down, #assunto-2, button`,
    back01: 'body',
    back02: '.fullbody',
    back03: `.header, .footer, 
            .footer-down, .header-down`,
    shadow01: '.header',
    shadow02: '.footer'
}


const isDayTime = () => {
    const hours = (new Date()).getHours();
    return hours >= 7 && hours < 18;
}


const changeThemeTo = (theme) => {
    const elements = REFS;
    $(elements.texts).css('color', theme.texts);
    $(elements.back01).css('background-color', theme.back01);
    $(elements.back02).css('background-color', theme.back02);
    $(elements.back03).css('background-color', theme.back03);
    $(elements.shadow01).css('box-shadow', theme.shadow01);
    $(elements.shadow02).css('box-shadow', theme.shadow02);
}


const changeIconTo = (symbol) => {
    const sun = $(LIGHT_WHITEY_THEME.iconRef);
    const moon = $(DARK_BLACKEY_THEME.iconRef);
    if (symbol == SUN) {
        moon.hide();
        sun.show();
    } else if (symbol == MOON) {
        sun.hide();
        moon.show();
    } else {
        throw TypeError(
            "Wrong type for changeIconTo, expected SUN or MOON"
        );
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
    const iconClass = '.icon';

    if (animate === true) {
        gsap.to(iconClass, {
            duration: .15,
            opacity: 0
        });

        gsap.to(iconClass, {
            duration: .19,
            x: "50px",
            y: "-50px",
            ease: "circ.out"
        });

        await sleep(sleepTime * 0.6);

        changeIconTo(lightModeEnabled ? MOON : SUN);

        await sleep(sleepTime * 0.4);

        gsap.to(iconClass, {
            duration: .17,
            opacity: 1,
            delay: 0.19
        });

        gsap.to(iconClass, {
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


(function init () {
    $('.icon').click(() => {
        changeMode();
    });

    window.addEventListener('load', () => {
        if (isDayTime() === false) {
            changeIconTo(MOON);
            darkMode();
        } else {
            changeIconTo(SUN);
            lightMode();
        }
    });
})();
