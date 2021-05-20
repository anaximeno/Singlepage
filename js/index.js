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

