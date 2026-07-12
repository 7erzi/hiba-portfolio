let openshopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listcard = document.querySelector('#listCard');
console.log(listcard)
let body = document.querySelector('body');
let total = document.querySelector('#total');
let quantity = document.querySelector('#quantity');


openshopping.addEventListener('click' ,()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click',()=>{
    body.classList.remove('active');
})
let products = [
    {
      
        id:1,
        name:'Chebakia Au Amande',
        image:'xbakia.jpg',
        price:150000
    },
     {
        id:2,
        name:'Briwat Au Miel',
        image:'briwa5 edité.jpg',
        price:130000
    },
     {
        id:3,
        name:'Selou Au Amlou',
        image:'7cbd8dfd60a9aa8ff532c6b660121a3f.jpg',
        price:220000
    },
     {
        id:4,
        name:'Briwat Au Chocoamandes',
        image:'briwa7.jpg',
        price:125000
    },
     {
        id:5,
        name:'Sigar Au Pistache',
        image:'sigar7.jpg',
        price:150000
    },
     
     {
        id:8,
        name:'Pack Healthy',
        image:'pack7.jpg',
        price:160000
    },
       {
        id:5,
        name:'Briwat Au Chocolat',
        image:'briwa2.jpeg',
        price:160000
    },
       {
        id:5,
        name:'Chebakia Au Sésames',
        image:'CHEBAKIA POUR LES DEBUTANTS - Les Recettes de Touria.jpeg',
        price:100000
    },
       {
        id:5,
        name:'Zellabia',
        image:'Recette zlabia _ Gâteau et cuisine Rachida.jpeg',
        price:120000
    },
       {
        id:5,
        name:'Sigar Au Pistache',
        image:'سلو فاسي راقي.jpeg',
        price:150000
    },
        {
        id:5,
        name:'Sigar Au Pistache',
        image:'selouq.jpeg',
        price:130000
    },
];
  



let listcards = [];
function initApp(){
    products.forEach((value,key)=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
        <img src="img/${value.image}"/>
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}</div>
        <button onclick="addToCard(${key})">Add To Card</button>

        `;
        list.appendChild(newDiv);

       
  
    })
}
initApp();
function addToCard(key){
    if(listcards[key]==null){
        listcards[key] = products[key];
        listcards[key].quantity = 1;
        console.log(listcards)
    }
    reloadcard();
}
function reloadcard(){
    console.log(listcard)
    listcard.innerHTML = '';
    let count = 0;
    let totalprice = 0;
    listcards.forEach((value,key)=>{
        totalprice = totalprice + value.price;
        count = count + value.quantity;
        console.log(count)
     
      listcard.innerHTML+='<li class="prouduitPanier"><img src="img/'+value.image+'"><span>'+value.name+''+value.price+''+value.quantity+'</span>'+'<button onclick="changequantity(${key},${value.quantity - 1})">-</button><class="quantity"'+value.quantity+'><button onclick="changequantity(${key},${change.quantity + 1})">+</button>  </li>'
    })
   
    total.innerText = totalprice.toLocaleString();
    quantity.innerText = count;
    
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
    cartIcon.style.transition = 'none'; 
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;

   
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

 
    if (cartContent.style.display === 'block') {
      positionCartContent();
    }
  });

  window.addEventListener('pointerup', () => {
    if (isDragging) {
      isDragging = false;
      cartIcon.style.transition = ''; 
    }
  });

  function positionCartContent() {
    const iconRect = cartIcon.getBoundingClientRect();
    const contentWidth = cartContent.offsetWidth;
    const contentHeight = cartContent.offsetHeight;

 
    let left = iconRect.left - contentWidth - 10;
    if (left < 0) {
      left = iconRect.right + 10;
    }

   
    let top = iconRect.top;
    if (top + contentHeight > window.innerHeight) {
      top = window.innerHeight - contentHeight - 10;
    }
    if (top < 0) top = 10;

    cartContent.style.left = left + 'px';
    cartContent.style.top = top + 'px';
  }
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

  // Toggle dropdown submenu on mobile
  categories.querySelector('a').addEventListener('click', e => {
    if(window.innerWidth <= 992) {
      e.preventDefault();
      categories.classList.toggle('active');
    }
  });