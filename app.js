const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactF', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;



const contactSchema = new mongoose.Schema({
    yname: String,
    email: String,
    subject: String,
    desc: String
});

const Contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    // const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('index.pug', params);
})


app.get('/about', (req, res) => {
    // const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('about.pug');
})

app.get('/services', (req, res) => {
    // const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('services.pug');
})

app.get('/contact', (req, res) => {
    // const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('contact.pug');
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
       myData.save().then(()=>{
        res.send("This item has been saved to the database")
       }).catch(()=>{
        res.status(400).send("item was not saved to the databse")
   })
    res.status(200).render('contact.pug');
})


app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
