const express = require('express');
const usersRoutes = require('./routes/orders-routes');
const foodRoutes = require('./routes/food-routes');
const imagesRoutes = require('./routes/images-routes');
const cors = require('cors');

const app = express();
const port = 7000;


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/static', express.static('resources'));
app.use('/orders', usersRoutes);
app.use('/food', foodRoutes);
app.use('/images', imagesRoutes);


app.get('/home', (req, res) => {
    res.redirect('/static/Home_page.html');
  });

app.get('/about', (req, res) => {
    res.redirect('/static/About_us.html');
});

app.get('/menu', (req, res) => {
    res.redirect('/static/Food.html');
});

app.get('/myorder', (req, res) => {
    res.redirect('/static/order.html');
});

app.get('/manager', (req, res) => {
    res.redirect('/static/requests.html');
});

app.get('/', (req, res) => {
    res.redirect('/static/Home_page.html');
  });

app.use((req, res) => {
    res.status(404).sendFile('./resources/404.html', {root: __dirname});
})

app.listen(port, () => {
  console.log('server is up and running');
});

