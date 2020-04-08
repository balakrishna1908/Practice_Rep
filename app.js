
// webserver creation using Express js module

const Joi = require('joi');

const express = require('express');

const app = express();

app.use(express.json()); // to use input vlues given inside body of request


let customers = [{
    id: 1,
    name: 'customer1'
},
{
    id: 2,
    name: 'customer2'
},
{
    id: 3,
    name: 'customer3'
}];

app.get('/', (req, res) => {

    res.send('Hello Welocome to Express js');

});
app.get('/api/customers', (req, res) => {

    res.send(customers);
})

app.post('/api/customers', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    let customer = {
        id: customers.length + 1,
        name: req.body.name
    }
    customers.push(customer);
    res.send(customer);

});
app.put('/api/customers/:id', (req, res) => {
    let updateCust = customers.filter(cust => {
        return cust.id == req.params.id
    })
    if (updateCust.length <= 0) {
        return res.status(400).send('Entered customer ID is not available..!!');
    }
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    updateCust[0].name = req.body.name;
    res.send(updateCust[0]);

});
app.delete('/api/customers/:id', (req, res) => {
    let updateCust = customers.filter(cust => {
        return cust.id == req.params.id
    })
    
    if (updateCust.length <= 0) {
        return res.status(400).send('Entered customer ID is not available..!!');
    }
    let index = customers.indexOf(updateCust[0]);
    customers.splice(index, 1);
    // const schema = {
    //     name: Joi.string().min(3).required()
    // }

    // const { error } = Joi.validate(req.body, schema);
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }
    // updateCust[0].name = req.body.name;
    res.send(customers);

});
const Port = process.env.port || 5000;

app.listen(Port, () => console.log('Listening On 5000 using express js'));



// webserver creation Using Http module


// const http = require('http');

// const server = http.createServer((req, res)=>{
//     if(req.url === '/'){
//         res.write('Welcome To Node');
//         res.end();
//     }
//     if(req.url === '/api/customers'){
//         res.write(JSON.stringify([1,2,3]));
//         res.end();
//     }
// });

// server.listen(3000);

// console.log('Listening on Port 3000');
// http.get('/', (req, res)=>{
//     if(req.url === '/'){
//         console.log('Welcome To Nopde');
//     }
//     if(req.url === '/api/customers'){
//         res.send([1,2,3]);
//     }
// })
