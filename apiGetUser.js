const database = require('./connection/db_connection');
const { DBNAME, USERDATA } = require('./constant/database');
exports.getUser = async ( req, res) => {
    console.log("API getUser Triggered ")
    let findBy = {};
    try{

        findBy['email'] = req.query.email
        let client = await database.getClient();

        let result = await client.db(DBNAME).collection(USERDATA).findOne(findBy)

        res.status(200).send(
            result
        )

    }catch(err){
        throw new Error(err.toString())
    }
}