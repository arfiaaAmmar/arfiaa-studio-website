// General -----------------------------------------------------------------------------------------

//Header and Footer 
$(function () {
  $("#header").load("header.html");
  $("#footer").load("footer.html");
});

// ---------------------------------------------------------------- Mobile menu toggle -------------------------------- //

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('hidden');
}

// Close mobile menu when clicking a link
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.getElementsByTagName('a');
  
  Array.from(mobileLinks).forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
});

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

// Fullscreen image viewer
function fullscreen(img) {
  const viewer = document.createElement('div');
  viewer.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50';
  
  const image = document.createElement('img');
  image.src = img.src;
  image.className = 'max-h-[90vh] max-w-[90vw] object-contain';
  
  viewer.appendChild(image);
  
  viewer.addEventListener('click', () => {
    viewer.remove();
  });
  
  document.body.appendChild(viewer);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Remove initial opacity-0 from body after a small delay
  setTimeout(() => {
    document.body.classList.remove('opacity-0');
  }, 100);

  // Set up intersection observer for fade-in and slide animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Observe all elements with opacity-0 class
  document.querySelectorAll('.opacity-0').forEach((el) => {
    observer.observe(el);
  });
});
