const cartIcon = document.getElementById('cart-icon');
  const cartContent = document.getElementById('cart-content');

  // Toggle cart content visibility on icon click
  cartIcon.addEventListener('click', (e) => {
    // Prevent toggling while dragging
    if (isDragging) return;
    if (cartContent.style.display === 'block') {
      cartContent.style.display = 'none';
    } else {
      cartContent.style.display = 'block';
      positionCartContent();
    }
  });

  // Close cart if clicking outside
  document.addEventListener('click', (e) => {
    if (!cartIcon.contains(e.target) && !cartContent.contains(e.target)) {
      cartContent.style.display = 'none';
    }
  });

  let isDragging = false;
  let offsetX, offsetY;

  cartIcon.addEventListener('pointerdown', (e) => {
    isDragging = true;
    offsetX = e.clientX - cartIcon.getBoundingClientRect().left;
    offsetY = e.clientY - cartIcon.getBoundingClientRect().top;
    cartIcon.style.transition = 'none'; // disable animation while dragging
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;

    // Keep inside viewport bounds
    const minLeft = 0;
    const minTop = 0;
    const maxLeft = window.innerWidth - cartIcon.offsetWidth;
    const maxTop = window.innerHeight - cartIcon.offsetHeight;
    left = Math.min(Math.max(left, minLeft), maxLeft);
    top = Math.min(Math.max(top, minTop), maxTop);

    cartIcon.style.left = left + 'px';
    cartIcon.style.top = top + 'px';
    cartIcon.style.right = 'auto';
    cartIcon.style.bottom = 'auto';

    // Move cart content with icon if visible
    if (cartContent.style.display === 'block') {
      positionCartContent();
    }
  });

  window.addEventListener('pointerup', () => {
    if (isDragging) {
      isDragging = false;
      cartIcon.style.transition = ''; // restore animation
    }
  });

  function positionCartContent() {
    const iconRect = cartIcon.getBoundingClientRect();
    const contentWidth = cartContent.offsetWidth;
    const contentHeight = cartContent.offsetHeight;

    // Try to place cart content to the left of icon, if not enough space place right
    let left = iconRect.left - contentWidth - 10;
    if (left < 0) {
      left = iconRect.right + 10;
    }

    // Align top of cart content with icon top but keep inside viewport vertically
    let top = iconRect.top;
    if (top + contentHeight > window.innerHeight) {
      top = window.innerHeight - contentHeight - 10;
    }
    if (top < 0) top = 10;

    cartContent.style.left = left + 'px';
    cartContent.style.top = top + 'px';
  }
          function toggleMenu() {
      document.querySelector('.menu').classList.toggle('active');
    }

      const burger = document.querySelector('.burger');
  const menuUL = document.querySelector('.menu > ul');
  const categories = document.querySelector('.has-sous-nav');

  burger.addEventListener('click', () => {
    menuUL.classList.toggle('active');
  });

 
  categories.querySelector('a').addEventListener('click', e => {
    if(window.innerWidth <= 992) {
      e.preventDefault();
      categories.classList.toggle('active');
    }
  });