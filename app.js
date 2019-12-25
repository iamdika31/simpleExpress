const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/',(req,res) =>{
    res.render('submit-form');
});

app.get('/create',(req,res) =>{
   res.render('index',{
       nama: req.query['nama'],
       email: req.query['email'],
       notelp: req.query['notelp']
    });  
});


app.listen(port,()=>{
    console.log('berjalan pada :' +port)
});