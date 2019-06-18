'use strict'

module.exports = function (app){
    const note = require('./controllers/noteController');
    //GET
    app.get('/', note.welcome);
    app.get('/notes', note.notes);
    app.get('/note/:id', note.note); //single
    //post
    app.post('/note', note.add);
    //PATCH /edit
    app.patch('/note/:id', note.update); //update
    //delete
    app.delete('/note/:id',note.delete);

    const category = require('./controllers/categoryController');
    
    //GET
    app.get('/categories', category.categories);
    app.get('/category/:id', category.category);//single
    //POST
    app.post('/category', category.add);
    //PATCH
    app.patch('/category/:id', category.update);
    //delete
    app.delete('/category/:id', category.delete);

}