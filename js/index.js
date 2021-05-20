// Next/previous controls
function plusSlides(n)
{
  clearTimeout(m);
  slideIndex = slideIndex + n;
  showSlides(slideIndex);
}

// Thumbnail image controls
function currentSlide(n)
{
  showSlides(n);
}

var m, slideIndex = 0;

function showSlides()
{
  var i, s;

  var slides = $(".mySlides");

  slides.css("display", "none");

  slideIndex++;
  if(slideIndex > slides.length) {slideIndex = 1}
  s = slideIndex - 1
  slides.eq(s).css("display", "block");

  m = setTimeout(showSlides, 8000);
}


$(document).ready(() => {
    var d = new Date();
    var hour = d.getHours();
    var day = (hour >= 18 || hour < 6) ? false : true;

    var logo = $('#logo');
    var bulbs = $('.bulbs img');
    var centralbox = $(".fullbody");
    var nav = $(".nav");
    var assunto1 = $("#assunto-1");
    var about = $("#about");
    var texts = $("#intexts .text");
    var body = $("body");
    var header_and_footer = $(".header, .footer, .footer-down, .header-down");
    var header = $(".header");
    var footer = $(".footer");

    // TODO: show an animation before site end charging.
    window.addEventListener('load', () => {
        if (!day) 
            nightMode();
    });

    bulbs.click(() => {
        day = day ? nightMode() : dayMode();
    });

    function change_bulbs(src, ttextsle)
    {
        var bls = document.querySelector(".bulbs").querySelectorAll("img");
        for(var i = 0; i < bulbs.length; i++) {
            bls[i].src = src;
            bls[i].ttextsle = ttextsle;
        }
    }


    function change_colors(colors)
    {
        header_and_footer.css("background-color", colors.c3);
        header_and_footer.css("color", colors.c1);
        header.css("box-shadow", colors.shadow1);
        footer.css("box-shadow", colors.shadow2);
        texts.css("color", colors.c2);
        logo.css("color", colors.c1);
        centralbox.css("background-color", colors.c2);
        assunto1.css("color", colors.c1);
        about.css("color", colors.c1);
        nav.css("color", colors.c1);
        $("#assunto-2 .text").css("color", colors.c2);
        body.css("background", colors.background);
    }

    function nightMode(colors)
    {
        change_bulbs("./imagens/bulboff.svg", "Go to Day Mode");
        change_colors({
            c1: "#fff",
            c2: "#191919",
            c3: "#121212",
            background: "#101010",
            shadow1: "2px -1px 19px 9px rgba(0,0,0,0.9)",
            shadow2: "2px 4px 19px 9px rgba(0,0,0,0.9)"
        });
        return false;
    }

    function dayMode()
    {
        change_bulbs("./imagens/bulbon.svg", "Go to Night Mode");
        change_colors({
            c1: "#191919",
            c2: "#fff",
            c3: "#fff",
            background: "#fff",
            shadow1: "none",
            shadow2: "none"
        });
        return true;
    }
});
