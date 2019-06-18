'use strict'

const response = require('../response');
const connect = require('../connect');

exports.categories = function(req,res){
    connect.query('SELECT * FROM category ', function (error, rows, fields){
        if (error) {
            console.log(error);
        }else{
            response.ok(rows,res);
        }
    });
};


exports.category = function (req,res){
    connect.query(`SELECT * FROM category WHERE id=${req.params.id}`, function (error, rows, fields){
        if (error) {
            console.log(error);
        }else{
            response.ok(rows,res);
        }
    });
};

exports.add = function(req,res){
    let name = req.body.name;
    

    connect.query(
        'INSERT INTO category SET name=?',
        [name],
        function (error, rows, fields){
            if (error) {
                throw error
            }else{
                return res.send({
                    error:false,
                    data: rows,
                    message: "category has been created",
                });
            }
        }
    );
};

exports.update = function(req,res){
    let id = req.params.id;
    let name = req.body.name;
    connect.query(
        `update category set name="${name}" where id=${id}`,
        
        function (error, rows, fields){
            if (error) {
                throw error
            }else{
                return res.send({
                    error:false,
                    data: rows,
                    message: "category has been Updated",
                });
            }
        }
    );
};

exports.delete = function(req,res){
    let id = req.params.id;
    connect.query(
        `delete from category where id=${id}`,
        
        function (error, rows, fields){
            if (error) {
                throw error
            }else{
                return res.send({
                    error:false,
                    data: rows,
                    message: "category has been Deleted",
                });
            }
        }
    );
};