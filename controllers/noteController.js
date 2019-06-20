'use strict'

const response = require('../response');
const connect = require('../connect');
const isEmpty = require('lodash.isempty');


exports.welcome = function(req, res){
    response.ok('welcome in note app with express js', res);
}

exports.showAll = function(req, res){
    var sql = `SELECT note.id, title, text, category.id as idCategory, name FROM category INNER JOIN note ON category.id = note.id_categoryFK`;
    var queryCount = `SELECT COUNT(title) AS TotalData FROM note`;

    if (!isEmpty(req.query.search)) {
        let search = req.query.search;
        sql += ` WHERE title like '%${search}%'`
    }

    if (!isEmpty(req.query.sort)) {
        let sort = req.query.sort;
        sql += ` ORDER BY id ${sort}`
    }
    
    var start, limit;
    (isEmpty(req.query.page) || req.query.page == '') ? start = 1 : start = parseInt(req.query.page);
    (isEmpty(req.query.limit) || req.query.limit == '') ? limit = 10 : limit = parseInt(req.query.limit);

    var startpage = (start - 1) * limit;
    sql += ` LIMIT ${limit} OFFSET ${startpage}`;




    
    connect.query(sql, function (error, rows, fields){
        if (error) {
            console.log(error);
        }else{
            if (rows=="") {
                res.json({
                    message:'Data not found',
                    error: true
                })
            }else{
                connect.query('SELECT * from note', function(error, row, fileds){
                    res.json({
                        status: 200,
                        values: rows,
                        page: start,
                        totalData: row.length,
                        totalPage: Math.ceil(row.length/limit),
                        limit: limit
                    })
                })
            }
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
            'INSERT INTO note SET title=?, text=?, id_categoryFK=?',
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
    let idCategory = req.body.idCategory;
    if (title == "" || text == ""||idCategory == "") {
        return res.send({
            error:true,
            message : "failed request body"
        });
    }else{
        connect.query(
            `update note set title="${title}", text="${text}", id_categoryFK="${idCategory}" where id=${id}`,
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
