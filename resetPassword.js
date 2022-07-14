const database = require('./connection/db_connection');
const { DBNAME, USERDATA } = require('./constant/database')
const bcrypt = require('bcryptjs');

exports.resetPass = async (req, res) => {
    console.log("Reset password API triggered")
    findBy = {};
    let payload = {};

    try {
       const encryptedPassword = await bcrypt.hash(req.body.newPass, 10);

        findBy['email'] = req.body.email;
        payload['password'] = encryptedPassword;

        const client = await database.getClient();

        let result = client.db(DBNAME).collection(USERDATA).findOneAndUpdate(
            findBy,
            { $set : payload }
        )


        res.status(200).send({
            result,
            success : true
        }
        )


    }catch(err){
        throw new Error(err.toString())
    }
}