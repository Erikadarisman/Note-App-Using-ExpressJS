'use strict'

const response = require('../response');
const connect = require('../connect');

exports.welcome = function(req,res){
    response.ok('welcome', res);
}

exports.notes = function(req,res){
    connect.query('SELECT * FROM note ', function (error, rows, fields){
        if (error) {
            console.log(error);
        }else{
            response.ok(rows,res);
        }
    });
};

exports.note = function(req,res){
    connect.query(`SELECT * FROM note WHERE id=${req.params.id}`, function (error, rows, fields){
        if (error) {
            console.log(error);
        }else{
            response.ok (rows, res);
        }
    });
};

exports.add = function(req,res){
    let title = req.body.title;
    let text = req.body.text;
    let id_categoryFK = req.body.id_categoryFK;
    connect.query(
        'INSERT INTO note SET title=?, text=?, id_categoryFK=?',
        [title, text, id_categoryFK],
        function (error, rows, fields){
            if (error) {
                throw error
            }else{
                return res.send({
                    error:false,
                    data: rows,
                    message: "data has been created",
                });
            }
        }
    );

};

exports.update = function(req,res){
    let id = req.params.id;
    let title = req.body.title;
    let text = req.body.text;
    let idcategory = req.body.id_categoryFK;
    connect.query(
        `update note set title="${title}", text="${text}", id_categoryFK="${idcategory}" where id=${id}`,
        
        function (error, rows, fields){
            if (error) {
                throw error
            }else{
                return res.send({
                    error:false,
                    data: rows,
                    message: "data has been Updated",
                });
            }
        }
    );
};

exports.delete = function(req,res){
    let id = req.params.id;
    connect.query(
        `delete from note where id=${id}`,
        
        function (error, rows, fields){
            if (error) {
                throw error
            }else{
                return res.send({
                    error:false,
                    data: rows,
                    message: "data has been Deleted",
                });
            }
        }
    );
};