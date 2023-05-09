const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(express.json());

// Connexion à la base de données
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

// Route pour récupérer tous les utilisateur 
app.get('/Utilisateur', (req, res) => {
  db.all('SELECT * FROM utilisateur', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    } else {
      res.send(rows);
    }
  });
});

// Route pour récupérer un utilisateur par son id
app.get('/Utilisateur/:idUtilisateur', (req, res) => {
  db.get('SELECT * FROM Utilisateur  WHERE idUtilisateur = ?', [req.params.idUtilisateur], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    } else if (!row) {
      res.status(404).send('Utilisateur not found');
    } else {
      res.send(row);
    }
  });
});

// Route pour ajouter un utilisateur
app.post('/Utilisateur', (req, res) => {
  const { idUtilisateur, nomUtilisateur, prenomUtilisateur, email, password, datedenaissance, tel, sexe } = req.body;
  if (!idUtilisateur || !nomUtilisateur || !prenomUtilisateur || ! email || ! password || !datedenaissance || !tel || !sexe) {
    res.status(400).send('Missing required fields');
  } else {
    db.run('INSERT INTO Utilisateur(idUtilisateur, nomUtilisateur, prenomUtilisateur, email, password, datedenaissance, tel, sexe) VALUES(?, ?)', [ idUtilisateur, nomUtilisateur, prenomUtilisateur, email, password, datedenaissance, tel, sexe], function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
      } else {
        res.status(201).send(`Utilisateur added with idUtilisateur: ${this.lastIDUtilisateur}`);
      }
    });
  }
});

// Route pour mettre à jour un utilisateur
app.put('/Utilisateur/:idUtilisateur', (req, res) => {
  const { idUtilisateur, nomUtilisateur, prenomUtilisateur, email, password, datedenaissance, tel, sexe } = req.body;
  if (!idUtilisateur || !nomUtilisateur || !prenomUtilisateur || ! email || ! password || !datedenaissance || !tel || !sexe) {
    res.status(400).send('Missing required fields');
  } else {
    db.run('UPDATE Utilisateur SET nomUtilisateur = ?,prenomUtilisateur = ? WHERE id = ?', [idUtilisateur,nomUtilisateur,prenomUtilisateur,email,password, datedenaissance, tel, sexe, req.params.id], function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
      } else if (this.changes === 0) {
        res.status(404).send('Utilisateur not found');
      } else {
        res.send(`Utilisateur with id ${req.params.idUtilisateur} updated`);
      }
    });
  }
});

// Route pour supprimer un utilisateur
app.delete('/Utilisateur/:idUtilisateur', (req, res) => {
  db.run('DELETE FROM Utilisateur WHERE idUtilisateur = ?', [req.params.idUtilisateur], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    } else if (this.changes === 0) {
      res.status(404).send('Utilisateur not found');
    } else {
      res.send(`Utilisateur with idUtilisateur ${req.params.idUtilisateur} deleted`);
    }
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
