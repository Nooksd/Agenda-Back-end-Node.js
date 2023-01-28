const express = require('express');
const route = express.Router();
const { loginRequired } = require('./src/middlewares/middleware');
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');

route.get('/', homeController.index);

route.get('/login', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

route.get('/contact', loginRequired, contactController.index);
route.post('/contact/register', loginRequired, contactController.register);
route.get('/contact/:id', loginRequired, contactController.editContact);
route.post('/contact/edit/:id', loginRequired, contactController.edit);
route.get('/contact/delet/:id', loginRequired, contactController.delet);

module.exports = route;