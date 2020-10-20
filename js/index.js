$(document).ready(function(){
    // theme begins in light mode
    day = true;

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
    var fdr = $(".footer")

    bulbs.click(function() {
        if(day){  // changes to night mode
            day = false

            for(var i = 0; i < bulbs.length; i++) {
              bls[i].src = "./imagens/bulboff.svg"
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
            body.css("background-color", "#333");
        } else{ // changes to day mode
            day = true

            for(var i = 0; i < bulbs.length; i++) {
              bls[i].src = "./imagens/bulbon.svg"
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
            body.css("background-color", "#fff");
        }
    });
})


/* Slide Animations */
var slideIndex = 1, plus;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  plus = true
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

var slideIndex = 0;
showSlides()

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex -1].style.display = "block";
  setTimeout(showSlides, 2000)
}