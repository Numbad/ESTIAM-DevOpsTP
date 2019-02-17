var express = require('express');
var app = express();
var mysql = require('mysql');
var obj = {
};

var con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "azerty123",
   database :"tp_db"
 });
 
 con.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
 });
 app.use(function (req, res, next) {
   res.header('Access-Control-Allow-Credentials', true);
   res.header('Access-Control-Allow-Origin', req.headers.origin);
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
   res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
   next();
});
 app.get('/', function (req, res) {
   console.log("DEBUT get Index.....");
   con.query('SELECT * FROM indexCpt', (err,rows) => {
      if(err) throw err;
      console.log('Get Index done!\n');
      if(rows[0] == null){
         var newCpt = 0;
         var sql = "INSERT INTO indexCpt (cpt) values ("+newCpt+")";
         console.log('Debut Insert Index!\n');
         con.query(sql, function (err, result) {
            if (err) throw err;
            res.send("<h1> Le compteur est null </h1>")
            console.log('Update Index Done');
         });
      } else{
         var newCpt = parseInt(rows[0]['cpt']) + 1;
         var sql = "UPDATE indexCpt SET cpt='"+newCpt+"'";
         console.log('Debut Update Index!\n');
         con.query(sql, function (err, result) {
            if (err) throw err;
            res.send("<h1>Nouvelle valeur : " + newCpt + '</h1>')
            console.log('Update Index Done');
         });
      }
      
   });
   console.log("FIN get Index.....");

});

var server = app.listen(8080, function () {
   var port = server.address().port
   console.log("le serveur tourne sur  %s", port)
})