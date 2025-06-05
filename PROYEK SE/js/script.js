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
    

function validateLogin(){
    const logEmail = document.getElementById("login-email")
    const logPassword = document.getElementById("login-password");
    if(logEmail.value.trim() === "" || logPassword.value.trim() === "" ){
        alert("All Field Must Be Filled");
    }
    else if(!logEmail.value.endsWith("@gmail.com")){
        alert("Email must end with @gmail.com");
    }
    else{
        form.submit();
    }

}

function validateRegister(){
    
    const signupName = document.getElementById("signup-name");
    const signupEmail = document.getElementById("signup-email")
    const signupPhone = document.getElementById("signup-phone");
    const signupPassword = document.getElementById("signup-password");
    const signupConfirmpw = document.getElementById("signup-confirmpw");

    const minLength = 8;
    if(signupName.value.trim() === "" || signupEmail.value.trim() === "" || signupPhone.value === "" 
    || signupPassword.value.trim() === "" || signupConfirmpw.value.trim() === ""){
        alert("All Field Must Be Filled");
    }
    else if(!signupPhone.value.startsWith("0")){
        alert("Phone Number must start with 0")
    }
    else if(signupPhone.value.length < 10 || signupPhone.value.length > 15) {
        alert("Phone number must be between 10 to 15 digits");
    }
    else if(signupPassword.value.length < minLength){
        alert("Password must be at least " + minLength + " characters long");
    }
    else if(signupPassword.value !== signupConfirmpw.value){
        alert("Password and confirm password do not match");
    }
    else{
        form.submit();
    }
}

// img - carousel
// const initSlider = () => {
//     const imageLists = document.querySelectorAll(".slider-wrapper .img-list");
//     const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
//     const sliderScrollbar = document.querySelector(".carousel .slider-scrollbar");
//     const scrollbarThumb = document.querySelector(".scrollbar-thumb");

//     if (scrollbarThumb) {
//         scrollbarThumb.addEventListener("mousedown", (e) => {
//             const startX = e.clientX;
//             const thumbPosition = scrollbarThumb.offsetLeft;

//             const handleMouseMove = (e) => {
//                 const deltaX = e.clientX - startX;
//                 const newThumbPosition = thumbPosition + deltaX;
//                 const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

//                 const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));

//                 imageLists.forEach(imageList => {
//                     const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
//                     const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

//                     scrollbarThumb.style.left = `${boundedPosition}px`;
//                     imageList.scrollLeft = scrollPosition;
//                 });
//             };

//             const handleMouseUp = () => {
//                 document.removeEventListener("mousemove", handleMouseMove);
//                 document.removeEventListener("mouseup", handleMouseUp);
//             };

//             document.addEventListener("mousemove", handleMouseMove);
//             document.addEventListener("mouseup", handleMouseUp);
//         });
//     }

//     imageLists.forEach(imageList => {
//         const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
//         const handleSlideButtons = () => {
//             const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
//             slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
//             slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft - 1 ? "none" : "block";
//         };

//         slideButtons.forEach(button => {
//             button.addEventListener("click", () => {
//                 const direction = button.id === "prev-slide" ? -1 : 1;
//                 const scrollAmount = imageList.clientWidth * direction;
//                 imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
//             });
//         });

//         const updateScrollThumbPosition = () => {
//             const scrollPosition = imageList.scrollLeft;
//             const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
//             scrollbarThumb.style.left = `${thumbPosition}px`;
//         };

//         imageList.addEventListener("scroll", () => {
//             handleSlideButtons();
//             updateScrollThumbPosition();
//         });

//         handleSlideButtons();
//     });
// };

// window.addEventListener("load", initSlider);

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

// Fungsi logout
function logout() {
  auth.signOut().then(() => {
    window.location.href = 'login.html';
  }).catch((error) => {
    alert('Gagal logout: ' + error.message);
  });
}

// Cek status autentikasi dan update UI
function checkAuthState() {
  auth.onAuthStateChanged((user) => {
    const loginLink = document.querySelector('a[href="login.html"]');
    const navItem = loginLink ? loginLink.parentElement : null;
    
    if (user) {
      // Jika user sudah login
      if (navItem) {
        loginLink.textContent = 'Logout';
        loginLink.href = '#';
        loginLink.onclick = logout;
      }
    } else {
      // Jika user belum login
      if (navItem) {
        loginLink.textContent = 'Login';
        loginLink.href = 'login.html';
        loginLink.onclick = null;
      }
    }
  });
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  checkAuthState();
  
  // Kode inisialisasi lainnya...
});