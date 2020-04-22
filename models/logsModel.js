const db = require('../config/database')



const insertLog = (data) => {
    const insertLogQuery = {
        text: `INSERT INTO tbl_logs (log_id, action, donation_id, user_id,username, date) VALUES($1, $2, $3, $4, $5, DEFAULT)`,
        values: [data.log_id, data.action, data.donation_id, data.user_id, data.username]
    }

    return new Promise(async (resolve, reject) => {
        try{
            const insertLogQuery_result = await db.query(insertLogQuery);
            resolve(insertLogQuery_result);
        }catch(error){  
            console.log(error);
            reject(error);
        }
    });
}

module.exports = {insertLog}