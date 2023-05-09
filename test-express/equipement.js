module.exports=app =>{
const router = require('express').Router();
const db = require('./db');

// Obtenir tous les  Equipement
router.get('/', (req, res) => {
  db.all('SELECT * FROM equipement', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Obtenir tous les equipements
router.post('/', (req, res) => {
const {nomEquipement,nomChambre,gpio}=req.body;
  db.all('SELECT * FROM equipement where nomEquipement=? and nomChambre=? and gpio=? ',[nomEquipement,nomChambre,gpio], (err, rows) => {   
    if (err) {
      res.status(500).json({ error: err.message });
    } else {  res.json(rows);
    }
  });
});


// Obtenir un Equipement par son ID
router.get('/:idEquipement', (req, res) => {
  const idEquipement = req.params.idEquipement;
  db.get('SELECT * FROM Equipement WHERE idEquipement = ?', idEquipement, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: 'Equipement not found' });
    }
  });
});

// Créer un nouvel equipement
router.post('/', (req, res) => {
  const { nomEquipement,nomChambre,gpio } = req.body;
  db.run('SELECT * FROM equipement Where nomEquipement=? and nomChambre=? and gpio=?', nomEquipement,nomChambre,gpio,(errors,row)=>  {
if(row ){
 res.json({message:"equipement Déja Existant"});
 }else {
db.run('INSERT INTO equipement (nomEquipement,nomChambre,gpio) VALUES (?,?,?)',[ nomEquipement,nomChambre,gpio], (err,rows) =>{
   if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ idEquipement:rows});
    }
  });
}
});
});
// Mettre à jour un Equipement par son ID
router.put('/:idEquipement', (req, res) => {
  const idEquipement = req.params.idEquipement;
  const {  nomEquipement,etat,nomChambre,gpio } = req.body;
  db.run('UPDATE Equipement SET nomEquipement = ?, nomChambre=? gpio=?  WHERE idEquipement = ?', [idEquipement, nomEquipement,nomChambre,gpio], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes > 0) {
      res.json({ message: 'Equipement updated successfully' });
    } else {
      res.status(404).json({ message: 'Equipement not found' });
    }
  });
});

// Supprimer un equipement par son ID
router.delete('/:idEquipement', (req, res) =>{
const idEquipement =req.params.idEquipement;
db.rnu("deleted from equipement where idEquipemet=?" ,[idEquipement], function(err){
if (err)
{  res.status(500).json({error:err.message});  }
else if (this.change >0)
{ res.json({message: 'equipement Deleted successfully' });  }
else   {res.status(404).json({message: 'equipement not found'});  }

})
});
app.use('/api/equipement',router);
}

