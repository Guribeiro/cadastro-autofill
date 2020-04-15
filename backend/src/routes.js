const express = require('express');
const routes = express.Router();


const DevController = require('./controllers/DevController');
const CasoController = require('./controllers/CasoController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');



routes.post('/sessions', SessionController.create );

routes.get('/devs', DevController.list);
routes.post('/devs', DevController.create);

routes.get('/casos', CasoController.list);  
routes.post('/casos', CasoController.create);
routes.delete('/casos/:id', CasoController.delete);


routes.get('/profiles', ProfileController.list);

routes.get('/settings', ProfileController.listDev);
routes.delete('/settings/:id', ProfileController.deleteDev);

module.exports = routes;