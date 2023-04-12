const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

dotenv.config();

let db;
let dbName = process.env.dbName         // Name of the MongoDB Project
let connectionString = process.env.MONGO_URI;

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
})
.then(client => {
    console.log(`Connected to ${dbName} database`)
    db = client.db(dbName)
})
.catch(error => console.error(error))

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/add-new-date', (req, res) => {

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