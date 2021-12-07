const bcryptjs = require('bcryptjs');
const { request, response } = require('express');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async( req = request, res = response ) => {

    const { email, password } = req.body;

    try {

        // verificar si el email existe
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'USER / PASSWORD incorrect - email'
            });
        }

        // verificar si el usuario está activo
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'USER / PASSWORD incorrect - status: false'
            });
        }

        // verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'USER / PASSWORD incorrect - password'
            });
        }

        // generar JWT ( json web token )
        const token = await generateJWT( user._id );

        res.json({
            msg: 'Login ok',
            user,
            token
        });

    } catch ( error ) {
        console.log( error );
        return res.status(500).json({
            msg: 'talk to the administrator'
        });
    }

}

module.exports = {
    login,
}
