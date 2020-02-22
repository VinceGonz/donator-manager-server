const db = require('../config/database');


const getAllUsers = () => {
    const getAllUsersQuery = `SELECT * FROM tbl_users`;

    return new Promise(async(resolve, reject) => {
        try{
            const getAllUsersQuery_Result = await db.query(getAllUsersQuery);
            resolve(getAllUsersQuery_Result);
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
}

const getOneUserByUsername = (username) => {
    const getOneUserByUsernameQuery = {
        text: `SELECT * FROM tbl_users WHERE username = $1`,
        values: [username]
    }

    return new Promise(async (resolve, reject) => {
        try{
            const getOneUserByUsernameQuery_Result = await db.query(getOneUserByUsernameQuery);
            resolve(getOneUserByUsernameQuery_Result);
        }catch(error){
            console.log(error);
            reject(error);
        }
    });
}


const createNewUser = (userData) => {
    const createNewUserQuery = {
        text: `INSERT INTO tbl_users (user_id, fname, lname, username, password) VALUES ($1, $2, $3, $4, $5)`,
        // ? Loop through the values of each property of an object and set it as values to insert query
        values: Object.values(userData)
    }

    return new Promise(async(resolve, reject) => {
        try{
            const createNewUserQuery_Result = await db.query(createNewUserQuery);
            resolve(createNewUserQuery_Result);
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
}


module.exports = {
    getAllUsers,
    createNewUser,
    getOneUserByUsername,
}