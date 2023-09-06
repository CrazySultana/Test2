/*import React,{useEffect,useState} from "react";
import "./styles.css";
export default function App () {
let[pendingOrders,setPendingOrders]=useState([]);

useEffect(() => {
setPendingOrders(JSON.parse(localStorage.getItem("listCards")),[]);
})

const pending=()=>{
return setPendingOrders(pendingOrders+JSON.parse(localStorage.getItem("listCards")));
}

for (var x=0; x<pendingOrders.length; x++){
return (

);
}
}*/
//const _ = require("lodash");

let listOfOrders = document.querySelector('.listOfOrders');
let refresh = document.querySelector('.refresh');
let begin = document.querySelector('.begin');


let orderssl=[];
let pendingOrders=[];
let loadOrders=[];

/*orderssl=JSON.parse(localStorage.getItem("listCards"));
//pendingOrders=JSON.parse(localStorage.getItem("listedOrders"));
pendingOrders.push(...orderssl);
const table=localStorage.getItem("tableNo");*/
//var tableno=localStorage.getItem("tableNo");
//console.log(table);


//refr();

//window.addEventListener("storage", refr);


function done(x){
	pendingOrders.splice(x,1);
	//localStorage.setItem("listCards",pendingOrders);
	//refr();
	const table=localStorage.getItem("tableNo");
	listOfOrders.innerHTML="";
	printorders(pendingOrders,table);
	}

	
/*function refr(){
	listOfOrders.replaceChildren();
	orderssl=JSON.parse(localStorage.getItem("listCards"));
	const table=localStorage.getItem("tableNo");
	pendingOrders.push(...orderssl);

	printorders(pendingOrders,table);
}*/
	const table =0;
function refr(){
		fetch("http://localhost:3000/orders",{mode: 'cors'})
		.then(rep => rep.json())
		.then(data =>{
			pendingOrders=JSON.parse(data);
			for (var x=0; x< (pendingOrders.length); x++){
	    	if(pendingOrders[x] != null ){
			pendingOrders[x].tableNumber= table;
			let newDiv = document.createElement('ref2');
			newDiv.classList.add('order');
			newDiv.innerHTML = `

				<div><img src="image/${pendingOrders[x].image}"/></div>
				<div>Name: ${pendingOrders[x].name}</div>

				<div>
					<div class="count">Quantity: ${pendingOrders[x].quantity}</div>
						<div>Table No.: ${pendingOrders[x].tableNumber} </div>
	
					<div >
					<button class=check style="font-size: 20px;" onclick="done(${x})">Done</button>

					</div>
			</div>`;
				listOfOrders.appendChild(newDiv);
	}

}
		})
}


	

function printorders(pendingOrders,table){
	for (var x=0; x< (pendingOrders.length); x++){
		if(pendingOrders[x] != null ){
			pendingOrders[x].tableNumber= table;
			let newDiv = document.createElement('ref2');
			newDiv.classList.add('order');
			newDiv.innerHTML = `

				<div><img src="image/${pendingOrders[x].image}"/></div>
				<div>Name: ${pendingOrders[x].name}</div>

				<div>
					<div class="count">Quantity: ${pendingOrders[x].quantity}</div>
						<div>Table No.: ${pendingOrders[x].tableNumber} </div>
	
					<div >
					<button class=check style="font-size: 20px;" onclick="done(${x})">Done</button>

					</div>
			</div>`;
				listOfOrders.appendChild(newDiv);
	}

}
}

