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
        name:'Chebakia à mande',
        image:'xbakia.jpg',
        price:150000
    },
     {
        id:2,
        name:'PRODUIT NAME 2',
        image:'briwa5 edité.jpg',
        price:130000
    },
     {
        id:3,
        name:'PRODUIT NAME 3',
        image:'7cbd8dfd60a9aa8ff532c6b660121a3f.jpg',
        price:220000
    },
     {
        id:4,
        name:'PRODUIT NAME 4',
        image:'briwa7.jpg',
        price:1250000
    },
     {
        id:5,
        name:'PRODUIT NAME 5',
        image:'sigar7.jpg',
        price:150000
    },
     {
        id:6,
        name:'PRODUIT NAME 6',
        image:'bch.jpg',
        price:160000
    },
     {
        id:7,
        name:'PRODUIT NAME 6',
        image:'m7encha.jpg',
        price:180000
    },
     {
        id:8,
        name:'PRODUIT NAME 6',
        image:'pack7.jpg',
        price:160000
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
    
}