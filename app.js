const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const con = require('./lib/mysql/connection');
con.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
      if (error) throw error;
      console.log('The solution is: ', results[0].solution);
    });
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/',(req,res) =>{
    //res.render('submit-form');
    let dataDivisi = '';
    con.query('select * from divisi',(err,data) =>{
        dataDivisi = data
    })
    con.query('select k.*, d.nama as namaDivisi from karyawan k INNER JOIN divisi d on k.divisi = d.id',(err,data) =>{
        res.render('index2',{ dataKaryawan:data, dataDivisi:dataDivisi});
    })
    
});


app.get('/create',(req,res) =>{
    res.redirect('/');
})
app.post('/create',(req,res) =>{
    const {nama,gaji,jabatan,divisi} = req.body;
    con.query('INSERT into karyawan set ?',{nama,gaji,jabatan,divisi},(err) =>
    {
        if(err) throw err;
        res.redirect('back');
    });
})


// app.get('/create',(req,res) =>{
//    res.render('index',{
//        nama: req.query['nama'],
//        email: req.query['email'],
//        notelp: req.query['notelp']
//     });  
// });


app.listen(port,()=>{
    console.log('berjalan pada :' +port)
});