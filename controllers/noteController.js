'use strict'

const response = require('../response');
const connect = require('../connect');
const isEmpty = require('lodash.isempty');


exports.welcome = function(req, res){
    response.ok('welcome in note app with express js', res);
}

exports.showAll = function(req, res){
    
    var sort = 'DESC'
    var sql = `SELECT note.id, title, text, note.created_at, note.updated_at, name as category FROM category INNER JOIN note ON category.id = note.idCategory`;
    var queryCount = `SELECT COUNT(title) AS TotalData FROM note`;

    if (!isEmpty(req.query.search)) {
        let search = req.query.search;
        sql += ` WHERE title like '%${search}%'`
        var totalSearch = sql;
    }

    if (!isEmpty(req.query.sort)) {
        let sort = req.query.sort;
        sql += ` ORDER BY created_at ${sort}`
    }else{
        let sort = req.query.sort;
        sql += ` ORDER BY created_at desc`
    }

    var start = 1;
    var limit = 10;
    if (!isEmpty(req.query.page)) {
        start = parseInt(req.query.page);
    }
    if (!isEmpty(req.query.limit)) {
        limit = parseInt(req.query.limit);
    }

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
                connect.query('SELECT * from note', function(error, row, fields){
                    connect.query(totalSearch, function(error, search, fields){
                        var totalData;
                        if (isEmpty(req.query.search)) {
                            totalData = row.length
                        }else{
                            totalData = search.length 
                        }
                        console.log(sql);
                        
                        response.pagination(rows, totalData, start, limit, res);
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

    if (isEmpty(title) && isEmpty(text) && isEmpty(idCategory)) {
        return res.send({
            error:true,
            message : "failed Input"
        });
    } else {
        connect.query(
            'INSERT INTO note SET title=?, text=?, idCategory=?',
            [title, text, idCategory],
            function (error, rows, fields) {
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
        )
    }
}

exports.update = function(req,res){
    let id = req.params.id;
    let title = req.body.title;
    let text = req.body.text;
    let idCategory = req.body.idCategory;

    let sql = `update note set updated_at=now(), `;

    if (!isEmpty(title)) {
        sql += `title="${title}"`;
    }
    if(!isEmpty(title) && !isEmpty(text) ) {
        sql += ', '
    }

    if (!isEmpty(text)) {
        sql += `text="${text}"`;
    }
    if(!isEmpty(text) && !isEmpty(idCategory)) {
        sql += ', '
    }

    if (!isEmpty(idCategory)) {
        sql += `idCategory="${idCategory}"`;
    }

    sql += `where id=${id}`


    connect.query(sql, function(error, rows, fields){
        if (error) {
            throw error
        }else{
            return res.send({
                error:false,
                data: rows,
                message: "data has been Updated",
            });
        }
    })
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
