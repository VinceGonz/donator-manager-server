const db = require('../config/database');



const getAllDonators = () => {
    const getAllDonatorsQuery = `SELECT * FROM tbl_donations`;

    return new Promise(async (resolve, reject) => {
        try{
            const getAllDonatorsQuery_Result = await db.query(getAllDonatorsQuery);
            resolve(getAllDonatorsQuery_Result)
        }catch(error){
            reject(error);
        }
    });
}

const deleteOneDonator = (donator_id) => {
    const deleteOneDonatorQuery = {
        text: `DELETE FROM tbl_donations WHERE donation_id = $1`,
        values: [donator_id]
    }

    return new Promise(async (resolve, reject) => {
        try {
            const deleteOneDonatorQuery_Result = await db.query(deleteOneDonatorQuery);
            resolve(deleteOneDonatorQuery_Result);

        }catch(error){
            console.log(error);
            reject(error);
        }
    });
}


const insertNewDonation = (donation) => {
    console.log(donation)
    const insertNewDonationQuery = {
        text: `INSERT INTO tbl_donations (donation_id, facebook_name, ign, donate_info, amount, processed_by, batch_no) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        values: Object.values(donation)
    }

    return new Promise(async (resolve, reject) => {
        try {
            const insertNewDonationQuery_Result = await db.query(insertNewDonationQuery);
            resolve(insertNewDonationQuery_Result)
        }catch(error){
            console.log('errors', error);
            reject(error);

        }
    });

    
}   



const updateDonator = donator => {
    console.log('DOOOOBIDAAP', donator);
    const updateDonatorQuery = {
        text: `UPDATE tbl_donations SET facebook_name = '${donator.facebook_name}', ign = '${donator.ign}', donate_info = '${donator.donate_info}', amount = ${donator.amount}, processed_by = '${donator.processed_by}', batch_no = ${donator.batch_no}, updated_at = now() WHERE donation_id = '${donator.donation_id}'`
    }

    return new Promise(async(resolve, reject) => {
        try{
            const updateDonatorQuery_Result = await db.query(updateDonatorQuery);
            resolve(updateDonatorQuery_Result);
        }catch(error){
            reject(error);
        }
    });
}





module.exports = {getAllDonators, insertNewDonation, deleteOneDonator, updateDonator}