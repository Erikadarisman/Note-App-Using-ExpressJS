'use strict'

module.exports = function (app){
    const note = require('./controllers/noteController');
    app.get('/', note.welcome);
    app.get('/notes', note.showAll);
    app.get('/notes/:id', note.showById);
    app.post('/notes', note.add);
    app.patch('/notes/:id', note.update);
    app.delete('/notes/:id', note.delete);

    const categories = require('./controllers/categoriesController');
    app.get('/categories', categories.showAll);
    app.get('/categories/:id', categories.showById);
    app.post('/categories', categories.add);
    app.patch('/categories/:id', categories.update);
    app.delete('/categories/:id', categories.delete);
}