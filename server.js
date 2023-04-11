const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/check-bday', (req, res) => {
    console.log(req.body)
})

app.get('/admin/add-data', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})