const { v4: uuidv4 } = require('uuid'); /// am cautat pe net ca spunea ca e deprecated varianta simpla

const readJSONFile = require('../utils/readJSONFiles');
const fs = require('fs');

const getAllOrders = (req, res) => {
    const orders = readJSONFile('./db/orders.json');
    res.send(orders);
}

const saveOrder = (req, res) => {
    const newOrder = req.body.orderName;
    newOrder.id = uuidv4();
    console.log(newOrder);
    const orders = readJSONFile('./db/orders.json');
    orders.push(newOrder);
  
    fs.writeFileSync('./db/orders.json', JSON.stringify(orders));
  
    res.send(newOrder);
  }

const getOrderById = (req, res) => {
    const id = req.params.id;
    const orders = readJSONFile('./db/orders.json');

    const order = orders.find(order => order.id === id);
    //console.log(order);

    if(order)
        res.send(order);
    else
        console.log("index not found");
        res.send([]);
}

const getOrdersByName = (req, res) => {
    const lname = req.params.nume;
    const fname = req.params.prenume;
    const name = fname + " " + lname;
    const orders = readJSONFile('./db/orders.json');
    let answer = [];
    console.log(name);
    for(order of orders)
        if(order.firstName === fname && order.lastName === lname)
            answer.push(order);

    if(answer.length > 0)
        res.send(answer);
    else 
        res.send([]);    
}
  
const getLastOrder = (req, res) => {
    const orders = readJSONFile('./db/orders.json');
    const answer = orders[orders.length - 1];
    res.send(answer);
}
  
  exports.getLastOrder = getLastOrder;
  exports.getOrdersByName = getOrdersByName;
  exports.getOrderById = getOrderById;
  exports.getAllOrders = getAllOrders;
  exports.saveOrder = saveOrder;