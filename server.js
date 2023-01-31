const express = require('express');
const morgan = require('morgan')

const db = require('./db');

const PORT = process.env.port || 3000
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let count = 0;


app.get('/', (req, res) => {
    count++;
    res.send(`Hello World!  ${count} \n`);
} );

app.listen(3000,() => console.log (`Server is running on port $PORT`));
