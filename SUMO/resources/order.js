let totalPrice = 0; /// tot o sa schimb pretul total si l am declarat global sa nu l mai selectez de 100 de ori
const firstDiv = document.getElementsByClassName('mesaj')[0];
let order1 = localStorage.getItem("comanda");
order1 = JSON.parse(order1);

let order2 = uniqueBy(order1, "name");

function uniqueBy(arr, prop){
    return arr.reduce((a, d) => {
      if (!a.includes(d[prop])) { a.push(d[prop]); }
      return a;
    }, []);
  } /// inspirat de pe StackOverflow
  /// https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript


function searchPrice(arr, name){
    for(element of arr){
        if(element.name == name) return element.price;
    }
}

function getNumber(arr, name){
    let counter = 0;
    for(element of arr){
        if(element.name == name) counter++;
    }
    return counter;
}

function compare(a, b) {
    if (a.name < b.name){
      return -1;
    }
    if (a.name > b.name){
      return 1;
    }
    return 0;
  }

const addToOrder = (arr, obj) => {
    arr.push(obj);
    arr.sort(compare);
    localStorage.setItem('comanda', JSON.stringify(arr));
}

const substractFromOrder = (arr, obj) => {
    let name = obj.name;
    let counter = 0;
    for(element of arr){
        if(element.name === name)
            arr.splice(counter, 1)
            //console.log("new array:", arr);
            localStorage.setItem('comanda', JSON.stringify(arr));
            return;
    }
    
}


const updatePrice = () => {
    const prices = document.getElementsByClassName('pret');
    const quantities = document.getElementsByClassName('cantitate');
    //console.log(prices);
    let total = 0;
    let counter = 0;
    for(price of prices){
        total = total + parseInt(price.innerText.substring(0, price.innerText.length - 1)) * parseInt(quantities[counter].innerText);

        counter++;
    }

    const discount = localStorage.getItem('reducere');
    //console.log(discount);
    if(discount !== 0){
        total = (total - total * discount / 100).toFixed(2);
    }
    //console.log(total);
    localStorage.setItem("total", total);
    return Math.max(0, total) + '$';
}

const manageQuantity = (event) =>{
    const trigger = event.target;
    const collection = event.currentTarget;
    //console.log("trigger:", trigger);
    //console.log("collection:", collection);
    const quant = collection.childNodes[4];
    const name = collection.childNodes[1];
    let price = collection.childNodes[2];
    textPrice = parseInt(price.innerText.substring(0, price.innerText.length - 1));

    const obj = {name: name.innerText.charAt(0).toLowerCase() + name.innerText.slice(1),
                    price: textPrice};

    //console.log(obj);

    if(trigger.classList[0] == 'plus'){
        if(parseInt(quant.innerText) < 99){
            quant.innerText = parseInt(quant.innerText.substring(0, price.innerText.length - 1)) + 1;
            addToOrder(order1, obj);
            totalPrice.innerText = updatePrice();
        }
    }

    if(trigger.classList[0] == 'minus'){
        if(parseInt(quant.innerText) === 1) {collection.remove(); event.stopPropagation()}
        quant.innerText = parseInt(quant.innerText.substring(0, price.innerText.length - 1)) - 1;
        substractFromOrder(order1, obj);
        totalPrice.innerText = updatePrice();
    }

}


const manageCart = () => {

    ///partea de curatare
    //const firstDiv = document.getElementsByClassName('mesaj')[0]; -> am mutat o global
    firstDiv.remove();

    ///pentru fiecare element din order2 adaugam cate un div
    const container = document.getElementsByClassName('list')[0];
    document.getElementById('lista').style.alignContent = 'flex-start';
    let counter = 0;
    for(elem of order2){
        counter++;
        const bigDiv = document.createElement('div');
        bigDiv.classList.add('mancare');
        
        const numDiv = document.createElement('div');
        numDiv.classList.add('numar');
        numDiv.innerText = parseInt(counter) + '.';
        bigDiv.appendChild(numDiv);
        
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('nume');
        titleDiv.innerText = elem.charAt(0).toUpperCase() + elem.slice(1);
        bigDiv.appendChild(titleDiv);
        
        
        const priceDiv = document.createElement('div');
        priceDiv.classList.add('pret');
        priceDiv.innerText = parseInt(searchPrice(order1, elem)) + '$';
        bigDiv.appendChild(priceDiv);

        const buttonMinus = document.createElement('button');
        buttonMinus.innerText = '-';
        buttonMinus.classList.add('minus');
        bigDiv.appendChild(buttonMinus);

        const amountDiv = document.createElement('div');
        amountDiv.innerText = parseInt(getNumber(order1, elem));
        amountDiv.classList.add('cantitate');
        bigDiv.appendChild(amountDiv);

        const buttonPlus = document.createElement('button');
        buttonPlus.innerText = '+';
        buttonPlus.classList.add('plus');
        bigDiv.appendChild(buttonPlus);
        bigDiv.addEventListener('click', manageQuantity) ////

        container.appendChild(bigDiv);

    }

    const wrapper = document.getElementById('wrap');
    const total = document.createElement('div');
    const totalText = document.createElement('span');
    totalText.innerText = "Total price: ";
    totalText.classList.add("scris_pret")
    total.appendChild(totalText);
    totalPrice = document.createElement('span');
    totalPrice.classList.add("scris_pret");
    totalPrice.innerText = updatePrice();
    total.appendChild(totalPrice);
    
    wrapper.appendChild(total);
    total.classList.add('total');

}


const clearOrder = (clearButton, orderButton) => {
    const list = document.getElementById('lista');
    while (list.firstChild) { 
        //console.log(list.firstChild);
        list.removeChild(list.firstChild);
    }

    const total = document.getElementsByClassName('total')[0];
    total.remove();

    

    clearButton.remove();
    orderButton.remove();
    localStorage.setItem("comanda", '[]');
    

    list.style.alignContent = 'center';
    list.appendChild(firstDiv);

}

const placeOrder = () => {
    ///window.open("form.html", "_blank"); -> asta deschide in pagina noua
    window.location = "form.html";
}

const addButtonsBottom = () => {
    const clearButton = document.createElement('button');
    const orderButton = document.createElement('button');

    clearButton.classList.add('red-button');
    orderButton.classList.add('red-button');

    clearButton.innerText = 'Clear all';
    orderButton.innerText = 'Place order';

    clearButton.addEventListener('click', () => {clearOrder(clearButton, orderButton)});
    orderButton.addEventListener('click', placeOrder);

    const flexContainer = document.getElementById('butoane');
    flexContainer.appendChild(clearButton);
    flexContainer.appendChild(orderButton);

}

window.onload = () => {
    if(order1.length != 0){
        manageCart() ///pentru partea de comanda
        addButtonsBottom() /// cele doua butoane de jos
    }
}