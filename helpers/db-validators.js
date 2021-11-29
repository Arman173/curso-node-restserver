const Role = require('../models/role');
const User = require('../models/user');


const isRoleValid = async( role = '' ) => {
    
    const roleExists = await Role.findOne({ role });
    if ( !roleExists ) {
        throw new Error(`role ${ role } is not registered in the database`);
    }
}

const emailExists = async( email = '' ) => {

    // Verificar si el correo existe
    const emailExist = await User.findOne({ email });
    if( emailExist ) {
        throw new Error(`Email: ${ email } already exist.`);
    }
}

const userExistsById = async( id = '' ) => {

    // Verificar si el correo existe
    const userExist = await User.findById( id );
    if( !userExist ) {
        throw new Error(`id: ${ id } don't exist`);
    }
}

module.exports = {
    isRoleValid,
    emailExists,
    userExistsById
}
