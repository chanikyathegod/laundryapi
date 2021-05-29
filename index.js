const express = require('express');
const { Mongoose } = require('mongoose');
const app = express()
const port = 3000
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var bodyParser = require('body-parser');

//import routes

const authRoute = require('./routes/auth');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();


// Connect MongoDB at default port 27017.
mongoose.connect(process.env.DB_Connect, { useNewUrlParser: true,    useCreateIndex: true, useUnifiedTopology: true}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});



//auth  middleware

app.use('/api/user',authRoute);

app.get('/', (req, res) => res.send('Helloasd as!'))
app.listen(port, () => console.log(`Example app listening on port port!`))


