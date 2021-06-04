const url = 'http://localhost:7000/orders';

const showItems = (list) => {
    let obj = [];
    for(elem of list)
        obj.push(elem.name);
    alert(JSON.stringify(obj));
}

const renderObj = (list, obj) =>{
    //console.log(obj);

    const bg = document.createElement('div');
    bg.classList.add('info');

    const id = document.createElement('div');
    id.innerText = "ID: " + obj.id;
    bg.appendChild(id);

    const name = document.createElement('div');
    name.innerText = "Name: " + obj.lastName + " " +  obj.firstName;
    bg.appendChild(name);

    const gender = document.createElement('div');
    gender.innerText = "Gender: " + obj.gender;
    bg.appendChild(gender);

    const address = document.createElement('div');
    address.innerText = "Address: " + obj.address;
    bg.appendChild(address);

    const card = document.createElement('div');
    card.innerText = "Credit card:" + obj.card;
    bg.appendChild(card);

    const sauce = document.createElement('div');
    sauce.innerText = "Sauce: " + obj.sauce;
    bg.appendChild(sauce);

    const cutlery = document.createElement('div');
    cutlery.innerText = "Cutlery: " + obj.cutlery;
    bg.appendChild(cutlery);

    const date = document.createElement('div');
    date.innerText = "Date: " + obj.date;
    bg.appendChild(date);

    const price = document.createElement('div');
    price.innerText = "Price: " + obj.price + '$';
    bg.appendChild(price);


    const h2 = document.createElement('h2');
    h2.innerText = "Click to see the items";
    bg.appendChild(h2);

    console.log('items', obj.items);
    bg.addEventListener('click', () => showItems(obj.items));


    list.appendChild(bg);

}


const clearChildren = (elem) => {
    while (elem.firstChild) { 
        elem.removeChild(elem.firstChild);
    }
}

const generateAnswer1 = async () => {
    const response = await fetch(url);
    const orders = await response.json();

    const list = document.getElementById('lista');
    clearChildren(list);
    for(obj of orders)
        renderObj(list, obj);
  
    //console.log(orders);
    //return question;
}
  

const generateAnswer2 = async () => {
    const response = await fetch(url + '/last');
    const order = await response.json();

    const list = document.getElementById('lista');
    clearChildren(list);
    renderObj(list, order);
}


const generateAnswer3 = async () => {
    const id = prompt("ID:");
    const response = await fetch(url + '/' + id);
    const order = await response.json();
    //console.log(order);
    
    const list = document.getElementById('lista');
    clearChildren(list);
    if(order.length === 0) alert("Index not found");
    else renderObj(list, order);
    

}


const generateAnswer4 = async () => {
    let name = prompt("Name:");
    name = name.split(" ");

    const fname = name[0];
    const lname = name[1];
    //console.log(fname, lname);

    const response = await fetch(url + '/' + lname + '/' +fname);
    const orders = await response.json();

    const list = document.getElementById('lista');
    clearChildren(list);

    if(orders.length === 0) alert("Name not found");
    else
        for(obj of orders)
            renderObj(list, obj);
    
    
}


const generateAnswer5 = async () => {
    const id = prompt("ID:");
    await fetch(url + '/' + id, { method: 'DELETE' });
    alert("Order deleted!");
}



window.onload = async () => {


    const b1 = document.getElementById('b1');
    const b2 = document.getElementById('b2');
    const b3 = document.getElementById('b3');
    const b4 = document.getElementById('b4');
    const b5 = document.getElementById('b5');

    b1.onclick = async () => {
        await generateAnswer1();
    }
    
    b2.onclick = async () => {
        await generateAnswer2();
    }

    b3.onclick = async () => {
        await generateAnswer3();
    }

    b4.onclick = async () => {
        await generateAnswer4();
    }

    b5.onclick = async () => {
        await generateAnswer5();
    }
}