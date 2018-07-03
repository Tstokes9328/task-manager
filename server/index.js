const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())

//To-Do List Data
let todo = []

//EndPoints
app.get('/get/list', (req, res) => {
    res.status(200).send(todo);
})

app.post('/post/item', (req, res) => {
    let {input} = req.body;
    todo.push(input);
    res.status(200).send('new item added')
})

app.delete('/delete/item/:id', (req, res) => {
    let {id} = req.params;
    todo.splice(id, 1);
    res.status(200).send('item deleted')
})

app.listen(3005, () => console.log('Server is listening on Port 3005'))