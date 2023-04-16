const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
const moment = require('moment');

dotenv.config();

let db;
let dbName = process.env.dbName; // Name of the MongoDB Project
let connectionString = process.env.MONGO_URI;

// Establishing database connection
MongoClient.connect(connectionString, {
    useUnifiedTopology: true
})
.then(client => {
    console.log(`Connected to ${dbName} database`)
    db = client.db(dbName)
})
.catch(error => console.error(error))

// Assigning the express method to a variable app.
const app = express();

// Telling the server that our template engine is going to be ejs
app.set('view engine', 'ejs');

// Accepting request data from client side forms
app.use(express.urlencoded({ extended: true }))

// Accepting all other request data other than client side forms
app.use(express.json())

// Express automatically makes the route for the static files in the public directory
app.use(express.static('public'));

// API for root (/) route. It eventually renders the index.ejs 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// API for adding new data from admin-side
app.post('/add-new-data', (req, res) => {

    const month = req.body.month;
    const day = req.body.day;

    const dob = `${day}-${month}`;    

    const personality = req.body.personality;
    const profession = req.body.profession;

    const personalityInfo = `${personality}, ${profession}`;

    // let allowedDateFormats = ['DD MMM', 'DDMMM', 'DD MMMM', 'DDMMMM', 'DD-MMM', 'DD-MMMM', 'DD/MMM', 'DD/MMMM', 'DD-MM', 'DD/MM'];
    let result = moment(dob, 'D-MMMM', true).isValid();

    if(result){ 
        
        db.collection('days').findOne({ 'dob': dob })        
        .then(checkResult => {
            if(!checkResult){
                db.collection('days').insertOne({
                    dob: dob,                    
                    event: req.body.event,
                    personalityInfo: personalityInfo
                })
                .then(resultData => {
                    console.log('Data added successfully!!');
                    res.redirect('/');
                })
            } else {
                res.json('This date has already been saved. Please try adding another date.')
            }  
        })
        .catch(err => console.error(err));  
        
    } else {
        res.json('Wrong Input.. Please try again!')
    }
})
        
app.post('/check-bday', (req, res) => {    
    const month = req.body.month;
    const day = req.body.day;

    const dob = `${day}-${month}`;
    // res.json(`You selected ${month} ${day}`);
    
    db.collection('days').findOne({ 'dob': dob })
    .then(data =>{        
        res.render('indexx.ejs', { info : data } )        
    })
    .catch(err => console.error(err));
})

app.get('/admin/add-data', (req, res) => {
    res.sendFile(__dirname + '/admin/index.html')
})

app.get('/admin/view-all-records', (req, res) => {        
    // res.json(`You selected ${month} ${day}`);
    
    db.collection('days').find().toArray()
    .then(data =>{        
        res.render('../admin/viewAllRecordsByAdmin.ejs', { info : data } )        
    })
    .catch(err => console.error(err));
})

app.delete('/delete-record', (req, res) => {
    console.log(req);
    db.collection('days').deleteOne({ dob: req.body.recordToBeDeleted })
    .then(result => {
        console.log('Record deleted')
        res.json('Deleted');
    })
    .catch(err => {
        console.log(`Error ${err}}`);
    })
})

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})