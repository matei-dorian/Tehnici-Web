window.onload = async () => {
    const response = await fetch('http://localhost:7000/images');
    const items = await response.json();
    //console.log(items);

    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    const img4 = document.getElementById('img4');
    const img5 = document.getElementById('img5');

    img1.src = items[0].image1;
    img2.src = items[0].image2;
    img3.src = items[0].image3;
    img4.src = items[0].image4;
    img5.src = items[0].image1;

    const scrollUp = document.getElementById('Scroll');
    scrollUp.onclick = () => {document.getElementById('Home').scrollIntoView();}

    const toMenu = document.getElementById('toMenu');
    toMenu.onclick = () => {window.location = 'Food.html';}

}