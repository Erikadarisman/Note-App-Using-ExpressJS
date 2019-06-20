'use strict'

module.exports = function (app){
    const note = require('./controllers/noteController');
    app.get('/', note.welcome);
    app.get('/notes', note.showAll);
    app.get('/notes/:id', note.showById);
    app.post('/notes', note.add);
    app.patch('/notes/:id', note.update);
    app.delete('/notes/:id', note.delete);

    const category = require('./controllers/categoryController');
    app.get('/category', category.showAll);
    app.get('/category/:id', category.showById);
    app.post('/category', category.add);
    app.patch('/category/:id', category.update);
    app.delete('/category/:id', category.delete);
}