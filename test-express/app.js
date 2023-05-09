const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
 require('./users')(app);
// require('./chambre')(app);
// require('./equipement')(app);
// ...

//app.use('/users', usersRoutes);
//app.use('/chambre', chambreRoutes);
//app.use('/equipement', equipementRoutes);
// ...
const http = require('http').createServer(app)
http.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

