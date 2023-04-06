/*

function handler (req, res) { //create server
fs.readFile(__dirname + '/public/index.html', function (err,data){ //read file index.html in public filder
if (err){
res.writeHead(404, {'Content-Type': 'text/html'}); //write HTML
return res.end("404 NOT FOUND");
}
res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
res.write(data); //write data from index.html
return res.end();
});
} 

*/
// led.js

// Chargement des modules

var express = require('express');
var cors= require("cors");

//var wiringPi = require('wiringpi-node');

//var LED=new Gpio (22,'out');
////var ED0=new Gpio (4,'out');
// cap=new Gpio (17,'in','both');
 

// Initialisation du module Express

var app = express();
let corsopts={
    origin:"*", methods:['POST','GET']};
    
app.use(cors(corsopts));
    

 

// Initialisation du module wiringPi et parametrage de la LED

 
 

// Ecoute de l'adresse /on (en local http://localhost:8080/on)

// Allume la LED



// Ecoute de l'adresse /bascule (en local http://localhost:8080/bascule)

// Change la LED d'etat
 

 

// Si vous voulez gérer les erreurs 404,

// vous devez inclure les lignes suivantes obligatoirement à la fin de votre code

// car les route sont analysees dans l'ordre

// Si vous mettez cette route en premier, elle sera toujours utilisee et rien ne marchera 

// (juste avant app.listen) :

 

// ... Tout le code de gestion des routes (app.get) se trouve au-dessus

 
 
app.use(express.json());
app.use (express.urlencoded({extended:true}));
 
require("./App/controllers/led")(app);
console.log('Serveur lancé: CTRL-C pour arrêter');

 
var http = require('http').createServer(app); //require http server, and create server with function handler()
//var fs = require('fs'); //require filesystem module

http.listen(8080); //listen to port 8080
