import $ from "jquery";
import {
  updatePackageVisibility,
  calculateTotal,
  updateWhatsAppButton,
} from "./pricing-calculator.js";


// General -----------------------------------------------------------------------------------------

//Header and Footer
$(function () {
  $("#header").load("header.html");
  $("#footer").load("footer.html");
});

// Initialize all event listeners when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu initialization
  initializeMobileMenu();
  
  // Control buttons initialization
  initializeControlButtons();
  
  // Gallery initialization
  initializeGallery();
  
  // Animation initialization
  initializeAnimations();
  
  // Scroll effects initialization
  initializeScrollEffects();
});

// Mobile menu functions
function initializeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuButton = document.querySelector('.mobile-menu-button'); // Add this class to your menu button
  
  // Toggle menu
  menuButton?.addEventListener('click', () => {
    mobileMenu.classList.toggle("hidden");
  });
  
  // Close menu when clicking links
  const mobileLinks = mobileMenu.getElementsByTagName("a");
  Array.from(mobileLinks).forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// Control buttons initialization
function initializeControlButtons() {
  document.querySelectorAll(".control").forEach((button) => {
    button.addEventListener("click", function() {
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");
      document.querySelector(".active").classList.remove("active");
      document.getElementById(button.dataset.id).classList.add("active");
    });
  });
}

// Gallery functions
function initializeGallery() {
  // Photo gallery
  document.querySelectorAll('.gallery-thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      const targetId = thumbnail.dataset.targetId; // Add data-target-id to your thumbnails
      const highlight = document.querySelector(targetId);
      highlight.src = thumbnail.src;
    });
  });
  
  // Film gallery
  $(document).ready(function() {
    $("div.film-thumbnails img").click(function(e) {
      e.preventDefault();
      $("#current-film").attr("src", $(this).attr("href"));
    });
  });
  
  // Fullscreen viewer
  document.querySelectorAll('.fullscreen-enabled').forEach(img => {
    img.addEventListener('click', () => {
      const viewer = document.createElement("div");
      viewer.className = "fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50";
      
      const image = document.createElement("img");
      image.src = img.src;
      image.className = "max-h-[90vh] max-w-[90vw] object-contain";
      
      viewer.appendChild(image);
      viewer.addEventListener("click", () => viewer.remove());
      document.body.appendChild(viewer);
    });
  });
}

// Scroll effects
function initializeScrollEffects() {
  // Header scroll
  const header = document.getElementById("header");
  const sticky = header.offsetTop;
  
  window.onscroll = function() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
    
    // Parallax effects
    const parallaxElements = document.querySelectorAll("#home, #contact");
    parallaxElements.forEach(element => {
      if (element) {
        let offset = window.pageYOffset;
        element.style.backgroundPositionY = offset * -0.1 + "px";
      }
    });
  };
}

// Animation initialization
function initializeAnimations() {
  setTimeout(() => {
    document.body.classList.remove("opacity-0");
  }, 100);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "50px",
    }
  );

  document.querySelectorAll(".opacity-0").forEach((el) => {
    observer.observe(el);
  });
}

// ---------------------------------------------------------------- Mobile menu toggle -------------------------------- //

// Mobile menu toggle
export function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  mobileMenu.classList.toggle("hidden");
}

// Close mobile menu when clicking a link
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = mobileMenu.getElementsByTagName("a");

  Array.from(mobileLinks).forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
});

(function () {
  [...document.querySelectorAll(".control")].forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");
      document.querySelector(".active").classList.remove("active");
      document.getElementById(button.dataset.id).classList.add("active");
    });
  });
})();

// ---------------------------------------------------------------- Header follow scrolll -------------------------------- //

window.onscroll = function () {
  headerScroll();
};
const header = document.getElementById("header");
const sticky = header.offsetTop;

function headerScroll() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
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

function selectedPhoto(thumbnail, id) {
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
  const viewer = document.createElement("div");
  viewer.className =
    "fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50";

  const image = document.createElement("img");
  image.src = img.src;
  image.className = "max-h-[90vh] max-w-[90vw] object-contain";

  viewer.appendChild(image);

  viewer.addEventListener("click", () => {
    viewer.remove();
  });

  document.body.appendChild(viewer);
}

// Initialize animations and calculator when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Animation initialization
  setTimeout(() => {
    document.body.classList.remove("opacity-0");
  }, 100);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "50px",
    }
  );

  document.querySelectorAll(".opacity-0").forEach((el) => {
    observer.observe(el);
  });

  // Pricing calculator initialization
  document
    .getElementById("package-type")
    .addEventListener("change", updatePackageVisibility);
  document
    .getElementById("hourly-base")
    .addEventListener("change", updatePackageVisibility);

  // Combined inputs array for both calculate total and WhatsApp button
  const allInputs = [
    "package-type",
    "wedding-package",
    "hourly-base",
    "extra-hours",
    "num-days",
    "location",
    "event-date",
    "student-discount",
  ];

  allInputs.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      if (element.type === "checkbox") {
        element.addEventListener("change", () => {
          calculateTotal();
          updateWhatsAppButton();
        });
      } else {
        element.addEventListener("change", () => {
          calculateTotal();
          updateWhatsAppButton();
        });
      }
    }
  });

  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("event-date").min = today;

  // Initial calculations
  updatePackageVisibility();
  updateWhatsAppButton();
});
