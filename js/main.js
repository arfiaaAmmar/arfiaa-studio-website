// General -----------------------------------------------------------------------------------------

//Header and Footer 
$(function () {
  $("#header").load("header.html");
  $("#footer").load("footer.html");
});

// ---------------------------------------------------------------- Mobile menu toggle -------------------------------- //


(function () {
  [...document.querySelectorAll(".control")].forEach(button => {
      button.addEventListener("click", function () {
          document.querySelector(".active-btn").classList.remove("active-btn");
          this.classList.add("active-btn");
          document.querySelector(".active").classList.remove("active");
          document.getElementById(button.dataset.id).classList.add("active");
      })
  });
})();

// ---------------------------------------------------------------- Header follow scrolll -------------------------------- //

window.onscroll = function() {headerScroll()}
const header = document.getElementById("header")
const sticky = header.offsetTop;

function headerScroll() {
    if(window.pageYOffset > sticky){
        header.classList.add("sticky")
    } else {
        header.classList.remove("sticky")
    }
}


//Parallax effect home page

window.addEventListener("scroll", function () {
  const parallax = document.querySelector("#home");
  let offset = window.pageYOffset;
  parallax.style.backgroundPositionY = offset * -0.1 + "px";
});

//Parallax effect contact page

window.addEventListener("scroll", function () {
  const parallax = document.querySelector("#contact");
  let offset = window.pageYOffset;
  parallax.style.backgroundPositionY = offset * -0.1 + "px";
});

//Gallery highlight selector-----------------------------------------------------------------------------------

function selectedPhoto(thumbnail, id){
  const highlight = document.querySelector(id);
  highlight.src = thumbnail.src;
}

function filmHighlight() {
  $(document).ready(function () {
    $("div.film-thumbnails img").click(function (e) {
      e.preventDefault();

      $("#current-film").attr("src", $(this).attr("href"));
    });
  });
}
