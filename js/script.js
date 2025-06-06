$(document).ready(function(){
    $('.feedback-slider').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        items: 1,
        autoplay: true,
        navText: ["<i class = 'fas fa-arrow-left'></i>", "<i class = 'fas fa-arrow-right'></i>"]
    });

    let resizeTimer;
    $(window).resize(function(){
        $(document.body).addClass('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            $(document.body).removeClass('resize-animation-stopper');
        }, 400);
    });

    $('.navbar-show-btn').click(function(){
        $('.navbar-box').addClass('navbar-box-show');
    });

    $('.navbar-hide-btn').click(function(){
        $('.navbar-box').removeClass("navbar-box-show");
    })
});

document.querySelectorAll('.showhidepw').forEach(item => {
    item.addEventListener('click', function () {
        const wrapper = this.closest('.input-field');
        const passwordInput = wrapper.querySelector('input');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        } else {
            passwordInput.type = 'password';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        }
    });
});
    
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

document.getElementById('prevBtn').addEventListener('click', () => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    slides[currentIndex].classList.add('active');
});

document.getElementById('nextBtn').addEventListener('click', () => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    slides[currentIndex].classList.add('active');
});

window.addEventListener("DOMContentLoaded", () => {
  const userNav = document.getElementById("userNav");
  const loginNav = document.getElementById("loginNav");
  const username = document.getElementById("username");

  // Check if the user is logged in
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is logged in, display userNav and hide loginNav
      userNav.style.display = 'block';  // Show user dropdown
      loginNav.style.display = 'none';  // Hide login link

      // Update username with display name or email
      username.textContent = user.displayName || user.email || "User";

      // Optionally, redirect to another page after login if required
      // window.location.href = "home.html";
    } else {
      // If no user is logged in, show the login link
      userNav.style.display = 'none';
      loginNav.style.display = 'block';
    }
  });
});