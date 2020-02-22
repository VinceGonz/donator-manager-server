const db = require('../config/database')



const getAllExpenses = () => {
    const getAllExpensesQuery = `SELECT * FROM tbl_expenses`;

    return new Promise(async(resolve, reject) => {
        try{
            const getAllExpensesQuery_Result = await db.query(getAllExpensesQuery)
            resolve(getAllExpensesQuery_Result)
        }catch(error) {
            reject(error);
        }
    });
}


module.exports = {
    getAllExpenses
}