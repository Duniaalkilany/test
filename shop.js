
let products=[];
function Items (name,tag,price,incart){
    this.name=name;
    this.tag=tag;
    this.price=price;
    this.incart=incart;

    products.push(this);
}
new Items ('chirt1','chirt1',10,0)
new Items ('chirt2','chirt2',20,0)
new Items ('chirt3','chirt3',30,0)
new Items ('chirt4','chirt4',40,0)


/*let products=[
    {
     name:'chirt1',
        tag:'chirt1',
        price:10,
        incart:0


    },

    {
        name:'chirt2',
        tag:'chirt2',
        price:20,
        incart:0   

    },

    {
        name:'chirt3',
        tag:'chirt3',
        price:30,
        incart:0    

    },


    {
        name:'chirt4',
        tag:'chirt4',
        price:40,
        incart:0    

    }

];*/

carts=document.querySelectorAll('.add-cart');
for (let i = 0; i < carts.length; i++) {
   carts[i].addEventListener('click',()=>{cartNumbers (products[i]);

totalCost(products[i])})
    
}


function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }




}

function cartNumbers (product){
//console.log('the product clicked is ',products);
let productNumbers=localStorage.getItem('cartNumbers');
productNumbers=parseInt(productNumbers)

if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers+1) 
    document.querySelector('.cart span').textContent=productNumbers+1;
    
}
else{
    localStorage.setItem('cartNumbers',1)
    document.querySelector('.cart span').textContent=1;

}

setItems(product)
}

function setItems (product){

    let cartItems =localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    if(cartItems!= null){
        if(cartItems[product.tag]==undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].incart+=1;
    }else{product.incart=1;
        cartItems = {
            [product.tag]:product
        }
    }
   // console.log(cartItems);
//console.log('inside setItems');
//onsole.log('my product is ',product);

//object:
 
localStorage.setItem('productsInCart',JSON.stringify(cartItems));

}

function totalCost (product){
//console.log('the total price is' ,product.price);
let cartCost =localStorage.getItem('totalCost');
//console.log('my cart cost ',cartCost);
//console.log(typeof cartCost);

//console.log(typeof cartCost);
if(cartCost != null ){
    cartCost=parseInt(cartCost);
    localStorage.setItem('totalCost',cartCost+product.price);

}else{
    localStorage.setItem('totalCost',product.price)
}

}

function displayCart (){
let cartItems = localStorage.getItem('productsInCart');
cartItems=JSON.parse(cartItems)
//console.log(cartItems);
productContainer = document.querySelector('.products');
if(cartItems && productContainer){
    productContainer.innerHTML='';
    Object.values(cartItems).map(item =>{
        productContainer.innerHTML+=`
        <div class='product'>
        <button id>x</button>
        <img src="images/${item.tag}.jpg">
        <span>${item.name}</span>
        </div>
        <div class='price'>${item.price}</div>
<div class='quantity'>
<input type=number value=${item.incart}>
</div>
<div class='total'>${item.incart * item.price}</div>
        
        `  
    });
    
}
}

onLoadCartNumbers();
displayCart ();




