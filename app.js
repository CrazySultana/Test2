let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let list2 = document.querySelector('.list2');
let list3 = document.querySelector('.list3');
let list4 = document.querySelector('.list4');

let listCard = document.querySelector('.listCard');
let TrackOrder = document.querySelector('.TrackOrder');
let placeOrder = document.querySelector('.placeOrder');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
});
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
});

let newDiv1 = document.createElement('to');
newDiv1.innerHTML = `
    
    <div>
        <button onclick="reloadOrders()">Place Order</button>
    </div>`;
    placeOrder.appendChild(newDiv1);

let products = [
    {
        id: 1,
        name: 'PRODUCT NAME 1',
        image: '1.PNG',
        category:'appetizer',
        price: 120000,
        tableNumber:0
    },
    {
        id: 2,
        name: 'PRODUCT NAME 2',
        category:'appetizer',
        image: '2.PNG',
        price: 120000,
        tableNumber:0

    },
    {
        id: 3,
        name: 'PRODUCT NAME 3',
        image: '3.PNG',
        category:'main',
        price: 220000,
        tableNumber:0

    },
    {
        id: 4,
        name: 'PRODUCT NAME 4',
        image: '4.PNG',
        category:'main',
        price: 123000,
        tableNumber:0

    },
    {
        id: 5,
        name: 'PRODUCT NAME 5',
        image: '5.PNG',
        category:'main',
        price: 320000,
        tableNumber:0

    },
    {
        id: 6,
        name: 'PRODUCT NAME 6',
        image: '6.PNG',
        category:'main',
        price: 120000,
        tableNumber:0

    },
     {
        id: 7,
        name: 'PRODUCT NAME 7',
        image: '7.PNG',
        category:'dessert',
        price: 120000,
        tableNumber:0

    }, {
        id: 8,
        name: 'PRODUCT NAME 8',
        image: '8.PNG',
        category:'dessert',
        price: 120000,
        tableNumber:0

    }, {
        id: 9,
        name: 'PRODUCT NAME 9',
        image: '9.PNG',
        category:'drinks',
        price: 120000,
        tableNumber:0

    }, {
        id: 10,
        name: 'PRODUCT NAME 10',
        image: '10.PNG',
        category:'drinks',
        price: 120000,
        tableNumber:0

    }
];
let listCards  = [];
let listedOrders  = [];

function initApp(){
    products.forEach((value, key) =>{
        if(value.category=='appetizer'){
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button style="font-size: 20px;" onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    }})
    products.forEach((value, key) =>{
         if(value.category=='main'){
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button style="font-size: 20px;" onclick="addToCard(${key})">Add To Cart</button>`;
        list2.appendChild(newDiv);
   } })
    products.forEach((value, key) =>{
         if(value.category=='dessert'){
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button style="font-size: 20px;" onclick="addToCard(${key})">Add To Cart</button>`;
        list3.appendChild(newDiv);
    }})
    products.forEach((value, key) =>{
         if(value.category=='drinks'){
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button style="font-size: 20px;" onclick="addToCard(${key})">Add To Cart</button>`;
        list4.appendChild(newDiv);
    }})
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function getdata(listCards){
    fetch("http://localhost:3000/orders",{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(listCards),
        mode: 'cors'})
    .then(rep => rep.json())
    .then(data =>{
 //const postArrayJson = new JSONArray(data);
delete data;
       /* for (var x=0; x< (listCards.length); x++){
        data.orders.push({
        name: 'listCards[x].name',
        image: 'listCards[x].image',
        price:'listCards[x].price',
        tableNumber:0
        }
       
        );
        }
                for (var x in (data.rows)){
            delete data.rows[i]
        }
        */
        console.log(data);
    });
}







function reloadOrders(){
    products.forEach((value) =>{
        value.tableNumber=document.getElementById('table').value;
    })
    getdata(listCards);
    window.alert("Order Placed Successfully");
    for(let x in listCards){
        delete listCards[x];
    }

 /*   const table=document.getElementById('table').value;
    if (typeof(Storage) !== "undefined"){
    localStorage.clear();
    localStorage.setItem("listCards",JSON.stringify(listCards));
    localStorage.setItem("tableNo",table);

    window.alert("Order Placed Successfully");
    for(let x in listCards){
        delete listCards[x];
    }
}
else { window.alert("Error Placing Order");}*/
}





function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}