// Next/previous controls
function plusSlides(n) {
  clearTimeout(m);
  slideIndex = slideIndex + n;
  showSlides(slideIndex);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(n);
}

var m, slideIndex = 0;

function showSlides() {
  var i, s;

  var slides = $(".mySlides");

  slides.css("display", "none");

  slideIndex++;
  if(slideIndex > slides.length) {slideIndex = 1}
  s = slideIndex - 1
  slides.eq(s).css("display", "block");

  m = setTimeout(showSlides, 8000);
}


$(document).ready(function(){

        /* Night/Day mode */

    var logo = $('#logo');  // the logo
    var bulbs = $('.bulbs img');
    var bls = document.querySelector(".bulbs").querySelectorAll("img");
    var hf = $(".s-20");  // header & footer
    var bd = $(".fullbody");  // page body
    var nav = $(".nav");  // navegator
    var assunto1 = $("#assunto-1");
    var abt = $("#about");
    var it = $("#init .text");
    var body = $("body");
    var hdown = $(".header-down");
    var fdown = $(".footer-down");
    var hdr = $(".header");
    var fdr = $(".footer");

    function nightMode(){
        day = false;

        for(var i = 0; i < bulbs.length; i++) {
          bls[i].src = "./imagens/bulboff.svg";
          bls[i].title = "Go to Day Mode";
        }
        hf.css("background-color", "#222");
        hf.css("color", "white");
        hdr.css("box-shadow", "2px -1px 19px 9px rgba(0,0,0,0.7)");
        fdr.css("box-shadow", "2px 4px 19px 9px rgba(0,0,0,0.7)");
        hdown.css("border-bottom", "none");
        fdown.css("border-top", "none");
        hdown.css("background-color", "#222");
        it.css("color", "#232323");
        logo.css("color", "white");
        bd.css("background-color", "#232323");
        assunto1.css("color", "white");
        abt.css("color", "white");
        nav.css("color", "white");
        $("#assunto-2 .text").css("color", "#232323");
        body.css("background-image", "linear-gradient(60deg, #29323c 0%, #485563 100%)");
    }

    function dayMode(){
        day = true;

        for(var i = 0; i < bulbs.length; i++) {
          bls[i].src = "./imagens/bulbon.svg";
          bls[i].title = "Go to Night Mode";
        }
        hf.css("background-color", "white");
        hf.css("color", "#232323");
        hdr.css("box-shadow", "none");
        fdr.css("box-shadow", "none");
        hdown.css("border-bottom", "2px solid #ffd900");
        hdown.css("background-color", "white");
        fdown.css("border-top", "2px solid #ffd900");
        it.css("color", "white");
        logo.css("color", "#232323");
        bd.css("background-color", "white");
        assunto1.css("color", "#232323");
        abt.css("color", "#232323");
        nav.css("color", "#232323");
        $("#assunto-2 .text").css("color", "white");
        body.css("background-image", "none");
    }

    var d = new Date();
    var hour = d.getHours();

    var day;

    if(hour >= 18 || hour < 6) nightMode();
    else day = true;

    bulbs.click(function() {
        if(day){  // changes to night mode
            nightMode();
        } else{ // changes to day mode
            dayMode();
        }
    });
});
