'use strict'

exports.ok = function (values, res){
    const data = {
        status: 200,
        values: values,
    };
    res.json(data);
    res.end();
}

exports.pagination = function (rows, totalData, start, limit, res){
    const data = {
        status: 200,
        values: rows,
        page: start,
        start: 'start',
        totalData: totalData,
        totalPage: Math.ceil(totalData/limit),
        limit: limit
    };
    res.json(data);
    res.end();
}