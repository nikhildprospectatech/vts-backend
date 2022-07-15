const database = require('./connection/db_connection');
const { DBNAME, NOTIFICATIONS, USERDATA} = require('./constant/database');
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

        let doseNotExist = await client.db(DBNAME).collection(USERDATA).findOne(obj);

        if(!doseNotExist){
            return res.status(200).send({msg :"email dose not exist please register"})
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