const { response, request } = require('express');

const userGet = ( req = request, res = response ) => {

    const { q, name = 'No name', id, apikey } = req.query;

    res.json({
        msg: 'get API - controller',
        q,
        name,
        id,
        apikey
    });
}

const userPost = ( req, res = response ) => {
    
    const { nombre, edad } = req.body;
    
    res.status(201).json({
        msg: 'post API - controller',
        nombre,
        edad
    });
}

const userPut = ( req = request, res = response ) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - controller',
        id
    });
}

const userPatch = ( req, res = response ) => {
    res.json({
        msg: 'patch API - controller'
    });
}

const userDelete = ( req, res = response ) => {
    res.json({
        msg: 'delete API - controller'
    });
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}
