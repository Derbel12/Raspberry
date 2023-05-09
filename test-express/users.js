module.exports=app =>{
const router = require('express').Router();
const db = require('./db');

// Obtenir tous les utilisateurs
router.get('/', (req, res) => {
  db.all('SELECT * FROM Utilisateur', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Obtenir tous les utilisateurs
router.post('/login', (req, res) => {
const {email,password}=req.body;
  db.all('SELECT * FROM Utilisateur where email=? and password=?',[email,password], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {      res.json(rows);
    }
  });
});
// Obtenir un utilisateur par son ID
router.get('/:idUtilisateur', (req, res) => {
  const idUtilisateur = req.params.idUtilisateur;
  db.get('SELECT * FROM Utilisateur WHERE idUtilisateur = ?', idUtilisateur, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

// Créer un nouvel utilisateur
router.post('/', (req, res) => {
  const { prenomUtilisateur,nomUtilisateur,email,password,date_de_naissance,tel,sexe } = req.body;
 db.get('SELECT * FROM Utilisateur where email=? ',email,(errors,row)=>{
if(row ){
 res.json({message:"Utilisateur Déja Existant"});

}else {
  db.run('INSERT INTO Utilisateur (prenomUtilisateur,nomUtilisateur,email,password,date_de_naissance,tel,sexe) VALUES (?, ?,?,?,?,?,?)',[prenomUtilisateur,nomUtilisateur,email,password,date_de_naissance,tel,sexe ],
  (err,rows) =>{
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ idUtilisateur:rows});
    }
  });
}
});
});

// Mettre à jour un utilisateur par son ID
router.put('/:idUtilisateur', (req, res) => {
  const idUtilisateur = req.params.idUtilisateur;
  const { prenomUtilisateur,nomUtilisateur,email,password,date_de_naissance,tel,sexe } = req.body;
  db.run('UPDATE Utilisateur SET prenomUtilisateur = ?, nomUtilisateur = ? email =? password =? date_de_naissance =? tel =? sexe WHERE idUtilisateur = ?', [idUtilisateur, prenomUtilisateur,nomUtilisateur,email,password,date_de_naissance,tel,sexe  ], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes > 0) {
      res.json({ message: 'Utilisateur updated successfully' });
    } else {
      res.status(404).json({ message: 'Utilisateur not found' });
    }
  });
});

// Supprimer un utilisateur par son ID
router.delete('/:idUtilisateur', (req, res) =>{
const idUtilisateur = req.params.idUtilisateur;
db.run("delete from Utilisateur where  idUtilisateur=?",[idUtilisateur], function(err){
 if (err)
 {      res.status(500).json({ error: err.message });    } 
else if (this.changes > 0) 
{      res.json({ message: 'Utilisateur Deleted  successfully' });    } 
else {      res.status(404).json({ message: 'Utilisateur not found' });    }

})
});
app.use('/api/users',router);
}
