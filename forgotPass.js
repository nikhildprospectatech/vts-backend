const database = require('./connection/db_connection');
const { DBNAME, NOTIFICATIONS} = require('./constant/database');
const { sendEmailNotification } = require('./emailNotification');
exports.forgotPass = async (req, res) =>{
    console.log("forgot password triggered")

    try{

        const { forgotPass } = req.body;
        const client = await database.getClient();

        if(!forgotPass){
            return res.status(400).send("Email required")
        }
        let obj = {
            email : forgotPass
        }
        await sendEmailNotification(obj);

        const result = await client.db(DBNAME).collection(NOTIFICATIONS).insertOne({
            email : forgotPass
        })

        res.status(200).send(result)

    }catch(err) {
        throw new Error(err.toString())
    }
}