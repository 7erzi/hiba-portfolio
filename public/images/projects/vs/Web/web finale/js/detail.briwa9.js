 let qty = 1;
  const qtyDisplay = document.getElementById("qty");

  function increaseQty() {
    qty++;
    qtyDisplay.innerText = qty;
  }

  function decreaseQty() {
    if (qty > 1) {
      qty--;
      qtyDisplay.innerText = qty;
    }
  }


  const leftbox = document.getElementById("left-box");

  const img = leftbox.querySelector('img');

  leftbox.addEventListener('mousemove' , function(e){
    const bounds = leftbox.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width)*100;
    const y = ((e.clientY - bounds.top) / bounds.height)*100;
 
    img.style.transformOrigin = `${x}% ${y}%`;
     img.style.transform ='scale(1.3)';

      });
 
     
     leftbox.addEventListener('mouseleave', function() {
        img.style.transform = 'scale(1)';
        img.style.transformOrigin = 'center center';
     });

     const addtocart = document.getElementById('add-to-cart');
     addtocart.addEventListener('click' ,function(){
      alert('Votre Produit est dans le panier');
     });
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