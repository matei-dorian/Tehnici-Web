let order = {firstName: "",
             lastName: "",
             gender: "",
             address: "",
             card: "",
             sauce: "no sauce",
             cutlery: false,
             extras: "",
             date: "",
             items: [],
             price: 0
           } /// obiectul va fi completat cand se apasa pe submit si trimis serverului



function isCreditCard(str){
    regexp = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
    if (regexp.test(str))
        return true;
        
    return false;
                     
}

const validateData = async (event) => {
    event.preventDefault();

    //console.log(order.firstName);

    if(order.firstName === ""){
       
        alert("First name is missing");
        return;
        
    }

    if(order.lastName === ""){
        alert("Last name is missing");
        return;
       
    }

    if(order.address === ""){
        alert("Address is missing");
        return;
       
    }

    if(order.card === ""){
        alert("Credit card number is missing");
        return;
        
    }

    if(isCreditCard(order.card) === false){
        alert("Please provide a valid card number");
        return;
    }

    
    const gender = document.querySelectorAll('[type=radio]');
    for(elem of gender)
        if(elem.checked) order.gender = elem.value; 
    
    const sauce = document.getElementById('sauce').value;
    order.sauce = sauce;

    const cutlery = document.getElementById('question');
    if(cutlery.checked === true)
        order.cutlery = cutlery.value;
    else 
        order.cutlery = "No";

    //console.log(order);
    /// de trimis order catre server
    const response = await fetch('http://localhost:7000/orders', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ orderName: order })
      });




    localStorage.setItem('reducere', 0);
    localStorage.setItem('comanda', JSON.stringify([]));
    localStorage.setItem('total', 0);
    localStorage.setItem('folosit', 'da');
    alert("Your order was succesfully registered. Click ok to return back to the Home Page.");
    window.location = "Home_page.html";
}

window.onload = () => {

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const yyyy = today.getFullYear(); 
    const date = mm + '/' + dd + '/' + yyyy;
    /// pentru data curenta: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    order.date = date;


    const submitButton = document.getElementById('submitButton');
    const firstName = document.getElementById('fname');
    const lastName = document.getElementById('lname');
    
    const address = document.getElementById('address');
    const card = document.getElementById('card');
    
    const extras = document.getElementById('extras');
    const total = localStorage.getItem('total');
    let items = localStorage.getItem('comanda');
    items = JSON.parse(items);

    order.items = items;
    order.price = parseFloat(total);

    //prenume
    firstName.onchange = (event) => {
        let text = firstName.value;
        text = text[0].toUpperCase() + text.slice(1);
        order.firstName = text;
        //console.log(order);
    }

    //nume
    lastName.onchange = (event) => {
        let text = lastName.value;
        text = text[0].toUpperCase() + text.slice(1);
        order.lastName = text;
        //console.log(order);
    }

    //adresa
    address.onchange = (event) => {
        let text = address.value;
        order.address = text;
        //console.log(order);
    }

    //card
    card.onchange = (event) => {
        let text = card.value;
        order.card = text;
        //console.log(order);
    }

    ///extras
    extras.onchange = (event) => {
        let text = extras.value;
        order.extras = text;
        //console.log(order);
    }


    //console.log(order);

    submitButton.onclick = (event) => {let response = validateData(event)};
}