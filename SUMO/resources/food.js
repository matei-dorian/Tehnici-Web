let order = [];

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
const randomColor = () => { 
    return `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`;
} /// functie luata din laboratoare


const addToCart = (collection, index, event) => { ///la fiecare click pe buton adaugam la comanda
    const button = event.target;
    //console.log(button);
    setTimeout(() => { button.style.color = "white";
                        button.style.backgroundColor = "orange";
                      },
                80);
    order.push(collection[index - 1]);
    localStorage.setItem('comanda', JSON.stringify(order));
    //console.log(order);

}


const modify = (element, index, collection) => {
    ///cream elementul
    const div = document.createElement('div');
    div.style.height = '100%';
    div.style.width = '100%';
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    div.classList.add('Umbra');

    const h1 = document.createElement('h1');
    h1.classList.add("Titlu");
    h1.innerText = collection[index - 1].name.toUpperCase();
    div.appendChild(h1);

    const button = document.createElement('button');
    button.classList.add("Buton_cumpara");
    button.innerText = "ADD TO CART";
    div.appendChild(button);

    element.onclick = () => {console.log(div);} 

    ///la hover il adaugam
    element.onmouseenter = () => {
        element.appendChild(div);
        button.onclick = (event) => {
            button.style.color = "orange";
            button.style.backgroundColor = "white";
            addToCart(collection, index, event);
            event.stopPropagation();
        }

      
    }
    
    ///cand nu mai facem hover il scoatem
    element.onmouseleave = () => {
       element.removeChild(element.firstChild);
    }

}


const generateImages = (collection) => {
    const grid = document.getElementById("Grid");

    while (grid.firstChild) { /// curatam grid-ul
        grid.removeChild(grid.firstChild);
    }

    let counter = 0;
    for(let item of collection){///pentru fiecare fel de mancare trebuie sa cream un div si sa i dam append
        //console.log(item);
        counter ++;
        const div = document.createElement('div');
        const imageName = 'url("food/' + item.name + '.jpg")';
        div.style.backgroundImage = imageName;
        div.classList.add("Imagine");
        div.setAttribute('id', 'p' + counter.toString());
        //console.log(imageName);
        grid.appendChild(div);
    }
    /// dupa ce am ajuns aici avem imaginile care ne trebuie -> trebuie sa facem efectele pe hover/click
    
    counter = 0;
    for(let item of collection){
        counter++;
        const p = document.getElementById('p' + counter.toString()); 
        modify(p, counter, collection);
    }
} 


const selectElement = (button) => {
    const text = button.innerHTML;
    if(text == 'Sushi') return sushi;
    if(text == 'Noodles') return noodles;
    if(text == 'Menus') return menus;
    if(text == 'Desserts') return desserts;
    if(text == 'Drinks') return drinks;
    return null;
}


const moveButton = (event) => {
    const button = document.getElementsByClassName('reducere')[0];
    const y = window.getComputedStyle(button).top;
    const x = window.getComputedStyle(button).left;
    
    
                    

    if (event.code === 'ArrowUp') {
        button.style.top = (parseInt(window.getComputedStyle(button).top) - 10) + 'px';
        // clearInterval(timer);
        // const timer = setTimeout(() => {button.style.top = y;
        //     button.style.left = x;
        //    event.stopPropagation()}, 5000);
    }

    else
        if (event.code === 'ArrowDown') {
        button.style.top = (parseInt(window.getComputedStyle(button).top) + 10) + 'px';
        // clearInterval(timer);
        // const timer = setTimeout(() => {button.style.top = y;
        //     button.style.left = x;
        //     event.stopPropagation()}, 5000);
    }
    else
    if (event.code === 'ArrowLeft') {
        button.style.left = (parseInt(window.getComputedStyle(button).left) - 10) + 'px';
    //    clearInterval(timer);
    //     const timer = setTimeout(() => {button.style.top = y;
    //        button.style.left = x;
    //        event.stopPropagation()}, 5000);
    }
    else
    if (event.code === 'ArrowRight') {
        button.style.left = (parseInt(window.getComputedStyle(button).left) + 10) + 'px';
        // clearInterval(timer);
        // const timer = setTimeout(() => {button.style.top = y;
        //    button.style.left = x;
        //    event.stopPropagation()}, 5000);
    }



    //console.log("event1:", event);
    button.onclick = () => {button.remove();
                            localStorage.setItem("folosit", "da");
                            localStorage.setItem("reducere", "25");
                            //clearInterval(timer);
                            event.stopPropagation();
                         }

    
}


const easterEgg = () =>{
    const raspuns = localStorage.getItem("folosit");
    if(raspuns !== "da"){
        const button = document.createElement('button');
        button.innerText = "25%";
        button.classList.add("reducere");

        button.style.color = randomColor();
        button.style.background = randomColor();
        let bg = window.getComputedStyle(button).backgroundColor;
        const txtc = window.getComputedStyle(button).color;
        //console.log("bg:", bg);
        //console.log("txtc:", txtc);

        const wrapper = document.getElementById("wrap");
        wrapper.appendChild(button);

        
        const y = window.getComputedStyle(button).top;
        const x = window.getComputedStyle(button).left;

        const timer = setInterval(() => {button.style.top = y;
            button.style.left = x;
        }, 10000);
            
        document.addEventListener('keydown', moveButton);
    }
}

const init = () => {
    const discount = localStorage.getItem("reducere");
    //const orderr = localStorage.getItem("comanda");
    const used = localStorage.getItem("folosit");
    const price = localStorage.getItem("total");

    if(discount === null)
        localStorage.setItem("reducere", 0);

    //if(orderr === null)
        //localStorage.setItem("comanda", {});

    if(used === null)
        localStorage.setItem("folosit", 'nu');

    if(price === null)
        localStorage.setItem("total", 0);
}

window.onload = async ()  => {

    ///partea de initializare
    const response = await fetch('http://localhost:7000/food');
    const items = await response.json();
    //console.log(items);
    sushi = items[0].sushi;
    noodles = items[1].noodles;
    menus = items[2].menus;
    desserts = items[3].desserts;
    drinks = items[4].drinks;
    //console.log(sushi);

    const menuButtons = document.querySelectorAll(".menu_buttons li + li");
    //console.log(butoaneMeniu);
    init();
    temp = localStorage.getItem('comanda');
    //console.log("temp", temp);
    if(!temp) order = []; //console.log('aici');
    else order = JSON.parse(temp);
    //console.log("order:", order); 
    
    generateImages(sushi);
    
    /// pentru easter egg-ul cu reducerea
    easterEgg();



    let counter = 0;

    for(let button of menuButtons){
        const collection = selectElement(button);
        //console.log(collection);
        button.onclick = () => {generateImages(collection)}; /// ca sa nu se execute right away
    }


}