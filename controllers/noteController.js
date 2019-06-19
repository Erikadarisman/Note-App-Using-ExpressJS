'use strict'

const response = require('../response');
const connect = require('../connect');

exports.welcome = function(req, res){
    response.ok('welcome qwe', res);
}

exports.showAll = function(req, res){
    connect.query('SELECT * FROM note ', function (error, rows, fields){
        if (error) {
            console.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};

exports.showById = function(req, res){
    connect.query(`SELECT * FROM note WHERE id=${req.params.id}`, function (error, rows, fields){
        if (error) {
            console.log(error);
        }else{
            if (rows == "") {
                return res.send({
                    error:true,
                    message : "id not found"
                })
            }else{
                response.ok (rows, res);
            }
        }
        
    });
};

exports.add = function(req, res){
    let title = req.body.title;
    let text = req.body.text;
    let idCategory = req.body.idCategory;
    if (title == "" || text == ""||idCategory == "") {
        return res.send({
            error:true,
            message : "failed name"
        })
    }else{
        connect.query(
            'INSERT INTO note SET title=?, text=?, idCategory=?',
            [title, text, idCategory],
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
    }
}

exports.update = function(req, res){
    let id = req.params.id;
    let title = req.body.title;
    let text = req.body.text;
    let idcategory = req.body.id_categoryFK;
    if (title == "" || text == ""||idcategory == "") {
        return res.send({
            error:true,
            message : "failed name"
        });
    }else{
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
    }
};

exports.delete = function(req,res){
    let id = req.params.id;
    connect.query(
        `delete from note where id=${id}`,
        function (error, rows, fields){
            if (error) {
                throw error
            }else{
                if (rows.affectedRows=="") {
                    return res.send({
                        error: true,
                        message : `failed delete id ${id}`
                    });
                }else{
                    return res.send({
                        error: false,
                        data: rows,
                        message: "data has been Deleted",
                    });
                }
            }
        }
    );
};