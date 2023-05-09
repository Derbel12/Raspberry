const sqlite3 = require('sqlite3').verbose();

// Créer une nouvelle instance de base de données SQLite
const db = new sqlite3.Database('./base_mais.db');

// Créer les tables nécessaires et effectuer d'autres initialisations si nécessaire

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Utilisateur (
    idUtilisateur INTEGER PRIMARY KEY AUTOINCREMENT,
    prenomUtilisateur TEXT,
    nomUtilisateur TEXT,
    email TEXT,
    password TEXT,
    date_de_naissance TEXT,
    tel INTEGER,
    sexe TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS chambre (
    idChambre INTEGER PRIMARY KEY AUTOINCREMENT,
    nomChambre TEXT,
idUtilisateur integer
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS equipement (
    idEquipement INTEGER PRIMARY KEY AUTOINCREMENT,
    nomEquipement TEXT,
nomChambre text,
etat integer,
gpio integer
  )`);
});

module.exports = db;

