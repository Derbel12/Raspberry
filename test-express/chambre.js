
module.exports=app =>{
const router = require('express').Router();
const db = require('./db');

// Obtenir tous les chambre
router.get('/', (req, res) => {
  db.all('SELECT * FROM chambre', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
});
});

// Obtenir tous les chambre
// Obtenir un chambre par son ID
router.get('/:idChambre', (req, res) => {
  const idChambre = req.params.idChambre;
  db.get('SELECT * FROM chambre WHERE idChambre = ?', idChambre, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

// Créer un nouvel chambre
router.post('/', (req, res) => {
  const { nomChambre,idUtilisateur } = req.body;
 db.get('SELECT * FROM chambre where nomChambre=?',[nomChambre],(errors,row)=>{
if(row ){
 res.json({message:"chambre Déja Existant"});

}else {
  db.run('INSERT INTO chambre (nomChambre) VALUES (?)', [nomChambre ],(err,rows) =>{
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ idChambre:rows});
    }
  });
}
});
});



// Mettre à jour un chambre par son ID
router.put('/:idChambre', (req, res) => {
  const idChambre = req.params.idChambre;
  const {nomChambre } = req.body;
  db.run('UPDATE chambre SET nomChambre = ?, WHERE idChambre =?',[idChambre, nomChambre], function (err) {
     if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes > 0) {
      res.json({ message: 'chambre updated successfully' });
    } else {
      res.status(404).json({ message: 'chambre not found' });
    }
  });
});


// Supprimer un chambre par son ID
router.delete('/:idChambre', (req, res) =>{
const idChambre = req.params.idChambre;
db.run("delete from chambre where  idChambre=?",[idChambre], function(err){
 if (err)
 {      res.status(500).json({ error: err.message });    } 
else if (this.changes > 0) 
{      res.json({ message: 'chambre Deleted  successfully' });    } 
else {      res.status(404).json({ message: 'chambre not found' });    }

})
});
app.use('/api/chambre',router);
}

