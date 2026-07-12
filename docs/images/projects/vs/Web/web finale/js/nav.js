let slideIndex = 0;
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = dots.length;

    function showSlide(index) {
      slides.style.transform = ` translateX(-${index * 100}%) `;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    }

    function nextSlide() {
      slideIndex = (slideIndex + 1) % totalSlides;
      showSlide(slideIndex);
    }

    function currentSlide(index) {
      slideIndex = index;
      showSlide(slideIndex);
    }
      // Auto slide
    setInterval(nextSlide, 3000); 

    function toggleMenu() {
      document.querySelector('.menu').classList.toggle('active');
    }

      const burger = document.querySelector('.burger');
  const menuUL = document.querySelector('.menu > ul');
  const categories = document.querySelector('.has-sous-nav');

  burger.addEventListener('click', () => {
    menuUL.classList.toggle('active');
  });

  // Toggle dropdown submenu on mobile
  categories.querySelector('a').addEventListener('click', e => {
    if(window.innerWidth <= 992) {
      e.preventDefault();
      categories.classList.toggle('active');
    }
  });
